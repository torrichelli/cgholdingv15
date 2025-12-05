import express from 'express';
import { query } from '../db.js';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

router.get('/', async (req, res) => {
  try {
    const { workspace, folder, mime_type, search, limit = 50, offset = 0 } = req.query;
    let sql = `
      SELECT m.*, u.display_name as uploaded_by_name
      FROM media m
      LEFT JOIN users u ON m.uploaded_by = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    
    if (workspace) {
      params.push(workspace);
      sql += ` AND m.workspace_id = (SELECT id FROM workspaces WHERE slug = $${params.length})`;
    }
    if (folder) {
      params.push(folder);
      sql += ` AND m.folder = $${params.length}`;
    }
    if (mime_type) {
      params.push(`${mime_type}%`);
      sql += ` AND m.mime_type LIKE $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      sql += ` AND (m.filename ILIKE $${params.length} OR m.alt_text ILIKE $${params.length})`;
    }
    
    params.push(limit);
    params.push(offset);
    sql += ` ORDER BY m.created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;
    
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await query(`
      SELECT m.*, u.display_name as uploaded_by_name
      FROM media m
      LEFT JOIN users u ON m.uploaded_by = u.id
      WHERE m.id = $1
    `, [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/upload', async (req, res) => {
  try {
    const contentType = req.headers['content-type'] || '';
    
    if (contentType.includes('application/json')) {
      const { filename, data, mime_type, alt_text, folder, workspace_id, uploaded_by } = req.body;
      
      if (!filename || !data) {
        return res.status(400).json({ error: 'Filename and data are required' });
      }
      
      const base64Data = data.replace(/^data:[^;]+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      
      const uniqueFilename = `${uuidv4()}-${filename}`;
      const filePath = path.join(UPLOAD_DIR, uniqueFilename);
      
      fs.writeFileSync(filePath, buffer);
      
      const url = `/uploads/${uniqueFilename}`;
      const size = buffer.length;
      
      let width = null;
      let height = null;
      
      const result = await query(`
        INSERT INTO media (filename, original_name, url, mime_type, size, width, height, alt_text, folder, uploaded_by, workspace_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `, [uniqueFilename, filename, url, mime_type, size, width, height, alt_text || '', folder || 'uploads', uploaded_by, workspace_id]);
      
      res.json(result.rows[0]);
    } else {
      let rawData = Buffer.alloc(0);
      
      req.on('data', (chunk: Buffer) => {
        rawData = Buffer.concat([rawData, chunk]);
      });
      
      req.on('end', async () => {
        try {
          const filename = req.headers['x-filename'] as string || `upload-${uuidv4()}`;
          const mime_type = req.headers['content-type'] || 'application/octet-stream';
          const workspace_id = req.headers['x-workspace-id'] as string;
          const uploaded_by = req.headers['x-uploaded-by'] as string;
          const folder = req.headers['x-folder'] as string || 'uploads';
          
          const uniqueFilename = `${uuidv4()}-${filename}`;
          const filePath = path.join(UPLOAD_DIR, uniqueFilename);
          
          fs.writeFileSync(filePath, rawData);
          
          const url = `/uploads/${uniqueFilename}`;
          const size = rawData.length;
          
          const result = await query(`
            INSERT INTO media (filename, original_name, url, mime_type, size, folder, uploaded_by, workspace_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
          `, [uniqueFilename, filename, url, mime_type, size, folder, uploaded_by ? parseInt(uploaded_by) : null, workspace_id ? parseInt(workspace_id) : null]);
          
          res.json(result.rows[0]);
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { alt_text, tags, folder } = req.body;
    
    const result = await query(`
      UPDATE media 
      SET alt_text = COALESCE($1, alt_text),
          tags = COALESCE($2, tags),
          folder = COALESCE($3, folder)
      WHERE id = $4
      RETURNING *
    `, [alt_text, tags, folder, req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const mediaResult = await query('SELECT * FROM media WHERE id = $1', [req.params.id]);
    if (mediaResult.rows.length === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    const media = mediaResult.rows[0];
    const filePath = path.join(UPLOAD_DIR, media.filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    await query('DELETE FROM media WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/folders/list', async (req, res) => {
  try {
    const { workspace } = req.query;
    let sql = 'SELECT DISTINCT folder FROM media WHERE folder IS NOT NULL';
    const params: any[] = [];
    
    if (workspace) {
      params.push(workspace);
      sql += ` AND workspace_id = (SELECT id FROM workspaces WHERE slug = $${params.length})`;
    }
    
    sql += ' ORDER BY folder';
    
    const result = await query(sql, params);
    res.json(result.rows.map(r => r.folder));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;