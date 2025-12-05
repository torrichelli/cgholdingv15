import express from 'express';
import { query } from '../db.js';

const router = express.Router();

router.get('/settings/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { workspace } = req.query;
    
    let sql = 'SELECT value FROM settings WHERE key = $1';
    const params: any[] = [key];
    
    if (workspace) {
      sql += ' AND workspace_id = (SELECT id FROM workspaces WHERE slug = $2)';
      params.push(workspace);
    }
    
    const result = await query(sql, params);
    if (result.rows.length === 0) {
      return res.json({ value: null });
    }
    res.json({ value: result.rows[0].value });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/hero', async (req, res) => {
  try {
    const result = await query(
      "SELECT value FROM settings WHERE key = 'hero_content' LIMIT 1"
    );
    
    if (result.rows.length === 0) {
      return res.json({
        title: 'CreativeGroup',
        subtitle: 'Технологическая экосистема.',
        description: 'Мы создаем цифровые продукты для бизнеса и жизни.',
        primaryButton: { text: 'О Нас', link: 'about' },
        secondaryButton: { text: 'Все Проекты', link: 'technologies' },
      });
    }
    
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/about', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'about_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({});
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/technologies', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'technologies_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({});
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/investors', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'investors_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({});
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/career', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'career_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({});
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/contact', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'contact_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({});
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/ecosystem', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'ecosystem_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({
        title: 'Экосистема CreativeGroup',
        description: 'Система, где каждая компания усиливает другую.',
        companies: [],
      });
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/synergy', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'synergy_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({
        title: 'Как работают связи',
        subtitle: 'ИИ объясняет логику взаимодействия.',
        synergies: [],
      });
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/philosophy', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'philosophy_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({
        title: 'Почему экосистема важна',
        items: [
          { title: 'Единая философия', description: 'Каждый продукт создаётся с одинаковым подходом к дизайну и технологии.' },
          { title: 'Общая инфраструктура', description: 'Медиа, разработка, логистика, магазины, комьюнити — всё связано.' },
          { title: 'Рост и масштабирование', description: 'Каждая компания усиливает другие, создавая эффект сети.' },
        ],
      });
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/partners', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'partners_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({
        title: 'С кем мы работаем',
        partners: [],
      });
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/cta', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'cta_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({
        title: 'Хотите стать частью?',
        buttonText: 'Связаться с нами',
        buttonLink: 'contact',
        backgroundImage: '',
      });
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/page_sections', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'page_sections_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({});
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/divisions', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'divisions_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({
        divisions: [],
      });
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/footer', async (req, res) => {
  try {
    const result = await query("SELECT value FROM settings WHERE key = 'footer_content' LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({
        companyName: 'CreativeGroup',
        description: 'Группа технологических компаний.',
        copyright: '© 2025 CreativeGroup. Все права защищены.',
        social: { instagram: '', linkedin: '', facebook: '' },
        links: [],
      });
    }
    res.json(result.rows[0].value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/articles', async (req, res) => {
  try {
    const { limit = 10, workspace } = req.query;
    
    let sql = `
      SELECT a.*, u.display_name as author_name
      FROM articles a
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.status = 'published'
    `;
    const params: any[] = [];
    
    if (workspace) {
      params.push(workspace);
      sql += ` AND a.workspace_id = (SELECT id FROM workspaces WHERE slug = $${params.length})`;
    }
    
    sql += ' ORDER BY a.published_at DESC NULLS LAST, a.created_at DESC';
    params.push(limit);
    sql += ` LIMIT $${params.length}`;
    
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await query(`
      SELECT a.*, u.display_name as author_name
      FROM articles a
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.slug = $1 AND a.status = 'published'
    `, [slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const { workspace } = req.query;
    
    let sql = `
      SELECT p.*, w.slug as workspace_slug, w.name as workspace_name
      FROM projects p
      JOIN workspaces w ON p.workspace_id = w.id
      WHERE 1=1
    `;
    const params: any[] = [];
    
    if (workspace) {
      params.push(workspace);
      sql += ` AND w.slug = $${params.length}`;
    }
    
    sql += ' ORDER BY p.created_at';
    
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/projects/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await query(`
      SELECT p.*, w.slug as workspace_slug, w.name as workspace_name
      FROM projects p
      JOIN workspaces w ON p.workspace_id = w.id
      WHERE p.slug = $1
    `, [slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/vacancies', async (req, res) => {
  try {
    const { workspace, company } = req.query;
    
    let sql = `
      SELECT v.*, p.name as company_name
      FROM vacancies v
      LEFT JOIN projects p ON v.company_id = p.id
      WHERE v.status = 'published'
    `;
    const params: any[] = [];
    
    if (workspace) {
      params.push(workspace);
      sql += ` AND v.workspace_id = (SELECT id FROM workspaces WHERE slug = $${params.length})`;
    }
    
    if (company) {
      params.push(company);
      sql += ` AND v.company_id = $${params.length}`;
    }
    
    sql += ' ORDER BY v.created_at DESC';
    
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/pages/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { workspace } = req.query;
    
    let sql = `
      SELECT p.*, w.slug as workspace_slug
      FROM pages p
      JOIN workspaces w ON p.workspace_id = w.id
      WHERE p.slug = $1 AND p.status = 'published'
    `;
    const params: any[] = [slug];
    
    if (workspace) {
      params.push(workspace);
      sql += ` AND w.slug = $${params.length}`;
    }
    
    const result = await query(sql, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
