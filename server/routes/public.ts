import express from 'express';
import { query } from '../db.js';
import { componentSchemaRegistry, getComponentCategories, getComponentsByCategory } from '../schemas/components.js';
import { validateSEO, generateDefaultSEO } from '../schemas/seo.js';

const router = express.Router();

router.get('/pages', async (req, res) => {
  try {
    const { workspace, status, tag, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    let sql = `
      SELECT 
        p.id, p.slug, p.title, p.locale, p.status, p.seo,
        p.published_at as "publishedAt",
        w.slug as "workspaceSlug"
      FROM pages p
      LEFT JOIN workspaces w ON p.workspace_id = w.id
      WHERE p.status = 'published'
    `;
    const params: any[] = [];
    
    if (workspace) {
      params.push(workspace);
      sql += ` AND w.slug = $${params.length}`;
    }
    
    sql += ' ORDER BY p.published_at DESC NULLS LAST';
    params.push(Number(limit));
    sql += ` LIMIT $${params.length}`;
    params.push(offset);
    sql += ` OFFSET $${params.length}`;
    
    const result = await query(sql, params);
    
    const countSql = `
      SELECT COUNT(*) FROM pages p
      LEFT JOIN workspaces w ON p.workspace_id = w.id
      WHERE p.status = 'published' ${workspace ? `AND w.slug = '${workspace}'` : ''}
    `;
    const countResult = await query(countSql);
    
    res.json({
      data: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(countResult.rows[0].count),
        totalPages: Math.ceil(Number(countResult.rows[0].count) / Number(limit)),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/pages/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { workspace, preview_token } = req.query;
    
    let sql: string;
    let params: any[];
    
    if (preview_token) {
      const tokenResult = await query(
        `SELECT pt.*, p.id as page_id 
         FROM preview_tokens pt
         JOIN pages p ON pt.page_id = p.id
         WHERE pt.token = $1 AND pt.expires_at > NOW()`,
        [preview_token]
      );
      
      if (tokenResult.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid or expired preview token' });
      }
      
      sql = `
        SELECT 
          p.id, p.slug, p.title, p.locale, p.status,
          p.content as components, p.seo,
          p.template_id as "templateId",
          p.published_at as "publishedAt",
          p.updated_at as "updatedAt",
          w.slug as "workspaceSlug"
        FROM pages p
        LEFT JOIN workspaces w ON p.workspace_id = w.id
        WHERE p.id = $1
      `;
      params = [tokenResult.rows[0].page_id];
    } else {
      sql = `
        SELECT 
          p.id, p.slug, p.title, p.locale, p.status,
          p.content as components, p.seo,
          p.template_id as "templateId",
          p.published_at as "publishedAt",
          p.updated_at as "updatedAt",
          w.slug as "workspaceSlug"
        FROM pages p
        LEFT JOIN workspaces w ON p.workspace_id = w.id
        WHERE p.slug = $1 AND p.status = 'published'
      `;
      params = [slug === 'home' ? '/' : slug];
      
      if (workspace) {
        params.push(workspace);
        sql += ` AND w.slug = $${params.length}`;
      }
    }
    
    const result = await query(sql, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    const page = result.rows[0];
    
    res.json({
      id: page.id,
      slug: page.slug,
      title: page.title,
      locale: page.locale,
      template: page.templateId ? `template_${page.templateId}` : 'default',
      components: page.components || [],
      seo: page.seo || {},
      status: page.status,
      publishedAt: page.publishedAt,
      updatedAt: page.updatedAt,
      workspaceSlug: page.workspaceSlug,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const { workspace, status, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    let sql = `
      SELECT 
        p.id, p.name, p.slug, p.tagline, p.description,
        p.status, p.website_url as "websiteUrl",
        p.is_coming_soon as "isComingSoon",
        p.meta, p.contacts,
        p.created_at as "createdAt",
        w.slug as "workspaceSlug"
      FROM projects p
      LEFT JOIN workspaces w ON p.workspace_id = w.id
      WHERE 1=1
    `;
    const params: any[] = [];
    
    if (workspace) {
      params.push(workspace);
      sql += ` AND w.slug = $${params.length}`;
    }
    
    if (status) {
      params.push(status);
      sql += ` AND p.status = $${params.length}`;
    }
    
    sql += ' ORDER BY p.created_at DESC';
    params.push(Number(limit));
    sql += ` LIMIT $${params.length}`;
    params.push(offset);
    sql += ` OFFSET $${params.length}`;
    
    const result = await query(sql, params);
    
    res.json({
      data: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/projects/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const result = await query(`
      SELECT 
        p.id, p.name, p.slug, p.tagline, p.description,
        p.status, p.website_url as "websiteUrl",
        p.is_coming_soon as "isComingSoon",
        p.meta, p.contacts,
        p.created_at as "createdAt",
        p.updated_at as "updatedAt",
        w.slug as "workspaceSlug",
        w.name as "workspaceName"
      FROM projects p
      LEFT JOIN workspaces w ON p.workspace_id = w.id
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

router.get('/articles', async (req, res) => {
  try {
    const { workspace, tag, locale, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    let sql = `
      SELECT 
        a.id, a.title, a.slug, a.excerpt, a.tags,
        a.status, a.locale,
        a.published_at as "publishedAt",
        u.display_name as "authorName",
        w.slug as "workspaceSlug"
      FROM articles a
      LEFT JOIN users u ON a.author_id = u.id
      LEFT JOIN workspaces w ON a.workspace_id = w.id
      WHERE a.status = 'published'
    `;
    const params: any[] = [];
    
    if (workspace) {
      params.push(workspace);
      sql += ` AND w.slug = $${params.length}`;
    }
    
    if (tag) {
      params.push(tag);
      sql += ` AND $${params.length} = ANY(a.tags)`;
    }
    
    if (locale) {
      params.push(locale);
      sql += ` AND a.locale = $${params.length}`;
    }
    
    sql += ' ORDER BY a.published_at DESC NULLS LAST';
    params.push(Number(limit));
    sql += ` LIMIT $${params.length}`;
    params.push(offset);
    sql += ` OFFSET $${params.length}`;
    
    const result = await query(sql, params);
    
    res.json({
      data: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const result = await query(`
      SELECT 
        a.id, a.title, a.slug, a.excerpt, a.content,
        a.tags, a.status, a.locale,
        a.published_at as "publishedAt",
        a.created_at as "createdAt",
        a.updated_at as "updatedAt",
        u.display_name as "authorName",
        w.slug as "workspaceSlug"
      FROM articles a
      LEFT JOIN users u ON a.author_id = u.id
      LEFT JOIN workspaces w ON a.workspace_id = w.id
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

router.get('/status/services', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, name, slug,
        current_status as status,
        description, 
        external_link as link,
        last_updated_at as "lastUpdated"
      FROM service_status
      ORDER BY name
    `);
    
    res.json({
      data: result.rows,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/status/api/services', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, name, slug,
        current_status as status,
        description as note, 
        external_link as link,
        last_updated_at as "lastUpdated"
      FROM service_status
      ORDER BY name
    `);
    
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/media/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(`
      SELECT 
        id, filename, original_name as "originalName",
        url, mime_type as "mimeType",
        size, width, height,
        variants, alt_text as "altText", tags
      FROM media
      WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/schemas/components', (req, res) => {
  res.json(componentSchemaRegistry);
});

router.get('/schemas/components/:type', (req, res) => {
  const { type } = req.params;
  const schema = componentSchemaRegistry[type];
  
  if (!schema) {
    return res.status(404).json({ error: 'Component schema not found' });
  }
  
  res.json(schema);
});

router.get('/schemas/categories', (req, res) => {
  const categories = getComponentCategories();
  const result = categories.map(category => ({
    name: category,
    components: getComponentsByCategory(category).map(c => ({
      type: c.type,
      label: c.label,
      description: c.description,
      icon: c.icon,
    })),
  }));
  
  res.json(result);
});

router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL || `https://${process.env.REPLIT_DEV_DOMAIN}`;
    
    const pagesResult = await query(`
      SELECT slug, updated_at 
      FROM pages 
      WHERE status = 'published'
      ORDER BY updated_at DESC
    `);
    
    const articlesResult = await query(`
      SELECT slug, updated_at 
      FROM articles 
      WHERE status = 'published'
      ORDER BY updated_at DESC
    `);
    
    const projectsResult = await query(`
      SELECT slug, updated_at 
      FROM projects
      ORDER BY updated_at DESC
    `);
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;
    
    for (const page of pagesResult.rows) {
      if (page.slug === '/') continue;
      sitemap += `
  <url>
    <loc>${baseUrl}/${page.slug}</loc>
    <lastmod>${new Date(page.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
    
    for (const article of articlesResult.rows) {
      sitemap += `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }
    
    for (const project of projectsResult.rows) {
      sitemap += `
  <url>
    <loc>${baseUrl}/projects/${project.slug}</loc>
    <lastmod>${new Date(project.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
    
    sitemap += `
</urlset>`;
    
    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.BASE_URL || `https://${process.env.REPLIT_DEV_DOMAIN}`;
  
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /preview

Sitemap: ${baseUrl}/api/sitemap.xml
`;
  
  res.set('Content-Type', 'text/plain');
  res.send(robots);
});

export default router;
