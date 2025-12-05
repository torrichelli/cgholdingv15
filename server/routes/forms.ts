import express from 'express';
import { query } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { workspace } = req.query;
    let sql = 'SELECT * FROM forms';
    const params: any[] = [];
    
    if (workspace) {
      params.push(workspace);
      sql += ` WHERE workspace_id = (SELECT id FROM workspaces WHERE slug = $${params.length})`;
    }
    
    sql += ' ORDER BY name';
    
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM forms WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, slug, fields, settings, notifications, success_message, workspace_id } = req.body;
    
    const result = await query(`
      INSERT INTO forms (name, slug, fields, settings, notifications, success_message, workspace_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [name, slug, JSON.stringify(fields || []), JSON.stringify(settings || {}), JSON.stringify(notifications || {}), success_message, workspace_id]);
    
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, slug, fields, settings, notifications, success_message } = req.body;
    
    const result = await query(`
      UPDATE forms 
      SET name = COALESCE($1, name),
          slug = COALESCE($2, slug),
          fields = COALESCE($3, fields),
          settings = COALESCE($4, settings),
          notifications = COALESCE($5, notifications),
          success_message = COALESCE($6, success_message),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `, [name, slug, fields ? JSON.stringify(fields) : null, settings ? JSON.stringify(settings) : null, notifications ? JSON.stringify(notifications) : null, success_message, req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM forms WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/submit', async (req, res) => {
  try {
    const formResult = await query('SELECT * FROM forms WHERE id = $1', [req.params.id]);
    
    if (formResult.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }
    
    const form = formResult.rows[0];
    const { data, source_page } = req.body;
    
    const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '';
    const user_agent = req.headers['user-agent'] || '';
    
    const result = await query(`
      INSERT INTO form_submissions (form_id, source_page, data, ip, user_agent, workspace_id, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'new')
      RETURNING *
    `, [req.params.id, source_page, JSON.stringify(data), ip, user_agent, form.workspace_id]);
    
    res.json({
      success: true,
      message: form.success_message || 'Form submitted successfully',
      submission_id: result.rows[0].id,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/submissions', async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;
    
    let sql = `
      SELECT fs.*, u.display_name as assigned_to_name
      FROM form_submissions fs
      LEFT JOIN users u ON fs.assigned_to = u.id
      WHERE fs.form_id = $1
    `;
    const params: any[] = [req.params.id];
    
    if (status) {
      params.push(status);
      sql += ` AND fs.status = $${params.length}`;
    }
    
    params.push(limit);
    params.push(offset);
    sql += ` ORDER BY fs.created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;
    
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/submissions', async (req, res) => {
  try {
    const { workspace, status, form_id, limit = 50, offset = 0 } = req.query;
    
    let sql = `
      SELECT fs.*, f.name as form_name, u.display_name as assigned_to_name
      FROM form_submissions fs
      LEFT JOIN forms f ON fs.form_id = f.id
      LEFT JOIN users u ON fs.assigned_to = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    
    if (workspace) {
      params.push(workspace);
      sql += ` AND fs.workspace_id = (SELECT id FROM workspaces WHERE slug = $${params.length})`;
    }
    if (status) {
      params.push(status);
      sql += ` AND fs.status = $${params.length}`;
    }
    if (form_id) {
      params.push(form_id);
      sql += ` AND fs.form_id = $${params.length}`;
    }
    
    params.push(limit);
    params.push(offset);
    sql += ` ORDER BY fs.created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;
    
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/submissions/:id', async (req, res) => {
  try {
    const result = await query(`
      SELECT fs.*, f.name as form_name, u.display_name as assigned_to_name
      FROM form_submissions fs
      LEFT JOIN forms f ON fs.form_id = f.id
      LEFT JOIN users u ON fs.assigned_to = u.id
      WHERE fs.id = $1
    `, [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/submissions/:id', async (req, res) => {
  try {
    const { status, assigned_to, notes } = req.body;
    
    const result = await query(`
      UPDATE form_submissions 
      SET status = COALESCE($1, status),
          assigned_to = COALESCE($2, assigned_to),
          notes = COALESCE($3, notes),
          processed_at = CASE WHEN $1 = 'processed' THEN CURRENT_TIMESTAMP ELSE processed_at END
      WHERE id = $4
      RETURNING *
    `, [status, assigned_to, notes, req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/submissions/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM form_submissions WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/contact/send', async (req, res) => {
  try {
    const { name, email, phone, message, source_page, workspace } = req.body;
    
    let formResult = await query(`
      SELECT f.* FROM forms f
      LEFT JOIN workspaces w ON f.workspace_id = w.id
      WHERE f.slug = 'contact' AND w.slug = $1
    `, [workspace || 'group']);
    
    let formId: number;
    let workspaceId: number;
    
    if (formResult.rows.length === 0) {
      const wsResult = await query('SELECT id FROM workspaces WHERE slug = $1', [workspace || 'group']);
      workspaceId = wsResult.rows[0]?.id || 1;
      
      const newFormResult = await query(`
        INSERT INTO forms (name, slug, fields, workspace_id)
        VALUES ('Contact Form', 'contact', $1, $2)
        RETURNING *
      `, [JSON.stringify([
        { id: 'name', type: 'text', label: 'Name', required: true },
        { id: 'email', type: 'email', label: 'Email', required: true },
        { id: 'phone', type: 'tel', label: 'Phone', required: false },
        { id: 'message', type: 'textarea', label: 'Message', required: true },
      ]), workspaceId]);
      
      formId = newFormResult.rows[0].id;
    } else {
      formId = formResult.rows[0].id;
      workspaceId = formResult.rows[0].workspace_id;
    }
    
    const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '';
    const user_agent = req.headers['user-agent'] || '';
    
    const result = await query(`
      INSERT INTO form_submissions (form_id, source_page, data, ip, user_agent, workspace_id, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'new')
      RETURNING *
    `, [formId, source_page || '/', JSON.stringify({ name, email, phone, message }), ip, user_agent, workspaceId]);
    
    res.json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you soon.',
      submission_id: result.rows[0].id,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;