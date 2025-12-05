import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { initDatabase } from './db.js';
import {
  createUser,
  findUserByUsername,
  findUserById,
  verifyPassword,
  generateToken,
  verifyToken,
  createSession,
  validateSession,
  deleteSession,
  updateLastLogin,
  getUserCount,
  getAdminCount,
  getAllUsers,
  updateUserRole,
  deleteUser,
  User,
} from './auth.js';
import {
  generateRegistrationOptionsForUser,
  verifyAndSaveRegistration,
  generateAuthenticationOptionsForUser,
  verifyAuthentication,
  getPasskeysByUserId,
  deletePasskey,
} from './passkey.js';
import mediaRoutes from './routes/media.js';
import formsRoutes from './routes/forms.js';
import contentRoutes from './routes/content.js';
import publicRoutes from './routes/public.js';
import { query } from './db.js';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.cookies.session || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const user = await validateSession(token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
  
  (req as any).user = user;
  next();
}

function adminMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const user = (req as any).user as User;
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

app.get('/api/auth/status', async (req, res) => {
  const token = req.cookies.session || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    const userCount = await getUserCount();
    return res.json({ authenticated: false, needsSetup: userCount === 0 });
  }
  
  const user = await validateSession(token);
  if (!user) {
    const userCount = await getUserCount();
    return res.json({ authenticated: false, needsSetup: userCount === 0 });
  }
  
  res.json({
    authenticated: true,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      displayName: user.display_name,
    },
    needsSetup: false,
  });
});

app.post('/api/auth/setup', async (req, res) => {
  try {
    const adminCount = await getAdminCount();
    if (adminCount > 0) {
      return res.status(400).json({ error: 'Setup already completed' });
    }
    
    const { username, password, displayName } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    const user = await createUser(username, password, 'admin', displayName);
    const sessionToken = await createSession(user.id);
    await updateLastLogin(user.id);
    
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('session', sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        displayName: user.display_name,
      },
    });
  } catch (error: any) {
    console.error('Setup error:', error);
    res.status(500).json({ error: error.message || 'Setup failed' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, displayName } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    const user = await createUser(username, password, 'user', displayName);
    const sessionToken = await createSession(user.id);
    await updateLastLogin(user.id);
    
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('session', sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        displayName: user.display_name,
      },
    });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({ error: error.message || 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    const user = await findUserByUsername(username);
    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await verifyPassword(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const sessionToken = await createSession(user.id);
    await updateLastLogin(user.id);
    
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('session', sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        displayName: user.display_name,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

app.post('/api/auth/logout', async (req, res) => {
  const token = req.cookies.session;
  if (token) {
    await deleteSession(token);
  }
  res.clearCookie('session');
  res.json({ success: true });
});

app.get('/api/passkey/register-options', authMiddleware, async (req, res) => {
  try {
    const user = (req as any).user as User;
    const options = await generateRegistrationOptionsForUser(user);
    res.json(options);
  } catch (error: any) {
    console.error('Passkey registration options error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate options' });
  }
});

app.post('/api/passkey/register', authMiddleware, async (req, res) => {
  try {
    const user = (req as any).user as User;
    const verification = await verifyAndSaveRegistration(user, req.body);
    
    if (verification.verified) {
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Verification failed' });
    }
  } catch (error: any) {
    console.error('Passkey registration error:', error);
    res.status(500).json({ error: error.message || 'Registration failed' });
  }
});

app.post('/api/passkey/login-options', async (req, res) => {
  try {
    const { username } = req.body;
    const { options, userId } = await generateAuthenticationOptionsForUser(username);
    res.json(options);
  } catch (error: any) {
    console.error('Passkey login options error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate options' });
  }
});

app.post('/api/passkey/login', async (req, res) => {
  try {
    const { response, username } = req.body;
    
    let userId: number | null = null;
    if (username) {
      const userResult = await findUserByUsername(username);
      userId = userResult?.id || null;
    }
    
    const { verified, user } = await verifyAuthentication(response, userId);
    
    if (verified && user) {
      const sessionToken = await createSession(user.id);
      await updateLastLogin(user.id);
      
      const isProduction = process.env.NODE_ENV === 'production';
      res.cookie('session', sessionToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          displayName: user.display_name,
        },
      });
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error: any) {
    console.error('Passkey login error:', error);
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

app.get('/api/passkey/list', authMiddleware, async (req, res) => {
  try {
    const user = (req as any).user as User;
    const passkeys = await getPasskeysByUserId(user.id);
    res.json(passkeys.map(p => ({
      id: p.id,
      deviceType: p.device_type,
      backedUp: p.backed_up,
      createdAt: p.created_at,
    })));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/passkey/:id', authMiddleware, async (req, res) => {
  try {
    const user = (req as any).user as User;
    const passkeyId = parseInt(req.params.id, 10);
    const deleted = await deletePasskey(passkeyId, user.id);
    res.json({ success: deleted });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { username, password, role, displayName } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    const user = await createUser(username, password, role || 'user', displayName);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:id/role', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { role } = req.body;
    
    const currentUser = (req as any).user as User;
    if (currentUser.id === userId) {
      return res.status(400).json({ error: 'Cannot change your own role' });
    }
    
    const user = await updateUserRole(userId, role);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    
    const currentUser = (req as any).user as User;
    if (currentUser.id === userId) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }
    
    const deleted = await deleteUser(userId);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/media', mediaRoutes);
app.use('/api/forms', formsRoutes);
app.use('/api/content', contentRoutes);
app.use('/api', publicRoutes);

app.post('/api/contact/send', async (req, res) => {
  try {
    const { name, email, phone, message, sourcePage, project } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    let workspaceId = 1;
    if (project) {
      const wsResult = await query(
        'SELECT id FROM workspaces WHERE slug = $1',
        [project]
      );
      if (wsResult.rows.length > 0) {
        workspaceId = wsResult.rows[0].id;
      }
    }
    
    let formResult = await query(
      'SELECT id FROM forms WHERE slug = $1 AND workspace_id = $2',
      ['contact', workspaceId]
    );
    
    let formId: number;
    if (formResult.rows.length === 0) {
      const newFormResult = await query(`
        INSERT INTO forms (name, slug, fields, workspace_id)
        VALUES ('Contact Form', 'contact', $1, $2)
        RETURNING id
      `, [JSON.stringify([
        { id: 'name', type: 'text', label: 'Name', required: true },
        { id: 'email', type: 'email', label: 'Email', required: true },
        { id: 'phone', type: 'tel', label: 'Phone', required: false },
        { id: 'message', type: 'textarea', label: 'Message', required: true },
      ]), workspaceId]);
      formId = newFormResult.rows[0].id;
    } else {
      formId = formResult.rows[0].id;
    }
    
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
               req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';
    
    const result = await query(`
      INSERT INTO form_submissions (form_id, source_page, data, ip, user_agent, workspace_id, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'new')
      RETURNING id
    `, [formId, sourcePage || 'home', JSON.stringify({ name, email, phone, message }), ip, userAgent, workspaceId]);
    
    res.json({
      status: 'ok',
      id: result.rows[0].id,
      message: 'Thank you for contacting us. We will get back to you soon.',
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

app.get('/status/api/services', async (req, res) => {
  try {
    const { query: dbQuery } = await import('./db.js');
    const result = await dbQuery('SELECT id, name, slug, current_status, description, external_link, last_updated_at FROM service_status ORDER BY name');
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  try {
    await initDatabase();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Auth server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
