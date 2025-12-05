import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255),
        password_hash VARCHAR(255),
        phone VARCHAR(50),
        role VARCHAR(50) DEFAULT 'user',
        display_name VARCHAR(255),
        permissions TEXT[] DEFAULT '{}',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS passkeys (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        credential_id TEXT UNIQUE NOT NULL,
        public_key TEXT NOT NULL,
        counter INTEGER DEFAULT 0,
        transports TEXT[],
        device_type VARCHAR(50),
        backed_up BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS passkey_challenges (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        challenge TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS workspaces (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        settings JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        locale VARCHAR(10) DEFAULT 'ru',
        status VARCHAR(50) DEFAULT 'draft',
        content JSONB DEFAULT '[]',
        seo JSONB DEFAULT '{}',
        template_id INTEGER,
        author_id INTEGER REFERENCES users(id),
        workspace_id INTEGER REFERENCES workspaces(id),
        published_at TIMESTAMP,
        scheduled_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(slug, workspace_id, locale)
      );

      CREATE TABLE IF NOT EXISTS page_versions (
        id SERIAL PRIMARY KEY,
        page_id INTEGER REFERENCES pages(id) ON DELETE CASCADE,
        snapshot JSONB NOT NULL,
        version_number INTEGER NOT NULL,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        tagline VARCHAR(500),
        description JSONB,
        status VARCHAR(50) DEFAULT 'concept',
        website_url VARCHAR(500),
        logo_id INTEGER,
        hero_media_id INTEGER,
        meta JSONB DEFAULT '{}',
        contacts JSONB DEFAULT '{}',
        workspace_id INTEGER REFERENCES workspaces(id),
        is_coming_soon BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        excerpt TEXT,
        content JSONB,
        author_id INTEGER REFERENCES users(id),
        tags TEXT[] DEFAULT '{}',
        hero_media_id INTEGER,
        status VARCHAR(50) DEFAULT 'draft',
        locale VARCHAR(10) DEFAULT 'ru',
        workspace_id INTEGER REFERENCES workspaces(id),
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(slug, workspace_id, locale)
      );

      CREATE TABLE IF NOT EXISTS vacancies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        company_id INTEGER REFERENCES projects(id),
        location VARCHAR(255),
        type VARCHAR(50) DEFAULT 'full',
        description JSONB,
        requirements JSONB,
        benefits JSONB,
        salary_range VARCHAR(255),
        status VARCHAR(50) DEFAULT 'draft',
        apply_link VARCHAR(500),
        workspace_id INTEGER REFERENCES workspaces(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(slug, workspace_id)
      );

      CREATE TABLE IF NOT EXISTS service_status (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        current_status VARCHAR(50) DEFAULT 'online',
        description TEXT,
        external_link VARCHAR(500),
        workspace_id INTEGER REFERENCES workspaces(id),
        last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255),
        url VARCHAR(500) NOT NULL,
        mime_type VARCHAR(100),
        size INTEGER,
        width INTEGER,
        height INTEGER,
        variants JSONB DEFAULT '{}',
        alt_text VARCHAR(500),
        tags TEXT[] DEFAULT '{}',
        folder VARCHAR(255) DEFAULT 'uploads',
        uploaded_by INTEGER REFERENCES users(id),
        workspace_id INTEGER REFERENCES workspaces(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS forms (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        fields JSONB DEFAULT '[]',
        settings JSONB DEFAULT '{}',
        notifications JSONB DEFAULT '{}',
        success_message TEXT,
        workspace_id INTEGER REFERENCES workspaces(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(slug, workspace_id)
      );

      CREATE TABLE IF NOT EXISTS form_submissions (
        id SERIAL PRIMARY KEY,
        form_id INTEGER REFERENCES forms(id) ON DELETE CASCADE,
        source_page VARCHAR(500),
        data JSONB NOT NULL,
        ip VARCHAR(50),
        user_agent TEXT,
        status VARCHAR(50) DEFAULT 'new',
        assigned_to INTEGER REFERENCES users(id),
        notes TEXT,
        workspace_id INTEGER REFERENCES workspaces(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        processed_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS menus (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        items JSONB DEFAULT '[]',
        workspace_id INTEGER REFERENCES workspaces(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(slug, workspace_id)
      );

      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) NOT NULL,
        value JSONB,
        workspace_id INTEGER REFERENCES workspaces(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(key, workspace_id)
      );

      CREATE TABLE IF NOT EXISTS symbols (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        content JSONB NOT NULL,
        version INTEGER DEFAULT 1,
        workspace_id INTEGER REFERENCES workspaces(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS templates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        content JSONB NOT NULL,
        thumbnail VARCHAR(500),
        category VARCHAR(100),
        workspace_id INTEGER REFERENCES workspaces(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS webhooks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url VARCHAR(500) NOT NULL,
        triggers TEXT[] DEFAULT '{}',
        secret VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        workspace_id INTEGER REFERENCES workspaces(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS api_tokens (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        token_hash VARCHAR(255) UNIQUE NOT NULL,
        scopes TEXT[] DEFAULT '{}',
        user_id INTEGER REFERENCES users(id),
        workspace_id INTEGER REFERENCES workspaces(id),
        last_used_at TIMESTAMP,
        expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(100),
        entity_id INTEGER,
        old_values JSONB,
        new_values JSONB,
        ip VARCHAR(50),
        workspace_id INTEGER REFERENCES workspaces(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS preview_tokens (
        id SERIAL PRIMARY KEY,
        page_id INTEGER REFERENCES pages(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        created_by INTEGER REFERENCES users(id),
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS seo_history (
        id SERIAL PRIMARY KEY,
        entity_type VARCHAR(50) NOT NULL,
        entity_id INTEGER NOT NULL,
        old_seo JSONB,
        new_seo JSONB,
        changed_by INTEGER REFERENCES users(id),
        changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_preview_tokens_token ON preview_tokens(token);
      CREATE INDEX IF NOT EXISTS idx_preview_tokens_expires ON preview_tokens(expires_at);
      CREATE INDEX IF NOT EXISTS idx_pages_slug_status ON pages(slug, status);
      CREATE INDEX IF NOT EXISTS idx_articles_slug_status ON articles(slug, status);

      INSERT INTO workspaces (name, slug, description) 
      VALUES 
        ('CreativeGroup', 'group', 'Main CreativeGroup workspace'),
        ('CreativeStudio', 'studio', 'Design and creative agency'),
        ('CreativeTech', 'tech', 'Technology solutions'),
        ('CreativeMedia', 'media', 'Media and content'),
        ('CreativeGaming', 'gaming', 'Gaming division'),
        ('YourSite', 'yoursite', 'Website builder'),
        ('LogiFlex', 'logiflex', 'Logistics platform'),
        ('JobHunt', 'jobhunt', 'Job hunting platform')
      ON CONFLICT (slug) DO NOTHING;

      INSERT INTO service_status (name, slug, current_status, description)
      VALUES
        ('CreativeID', 'creativeid', 'online', 'Single sign-on system'),
        ('CreativeCloud', 'creativecloud', 'online', 'Cloud services'),
        ('API Services', 'api', 'online', 'API infrastructure'),
        ('Database Cluster', 'database', 'online', 'Database services')
      ON CONFLICT (slug) DO NOTHING;
    `);
    console.log('Database initialized successfully');
  } finally {
    client.release();
  }
}

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}

export async function getClient() {
  return pool.connect();
}

export default pool;
