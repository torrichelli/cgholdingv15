import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from './db.js';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
const TOKEN_EXPIRY = '7d';

export interface User {
  id: number;
  username: string;
  role: string;
  display_name: string | null;
  phone: string | null;
  created_at: Date;
  last_login_at: Date | null;
}

export async function createUser(username: string, password: string, role: string = 'user', displayName?: string): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 12);
  
  const result = await query(
    `INSERT INTO users (username, password_hash, role, display_name) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, username, role, display_name, phone, created_at, last_login_at`,
    [username.toLowerCase(), passwordHash, role, displayName || username]
  );
  
  return result.rows[0];
}

export async function findUserByUsername(username: string): Promise<User & { password_hash: string } | null> {
  const result = await query(
    'SELECT * FROM users WHERE username = $1',
    [username.toLowerCase()]
  );
  return result.rows[0] || null;
}

export async function findUserById(id: number): Promise<User | null> {
  const result = await query(
    'SELECT id, username, role, display_name, phone, created_at, last_login_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: User): string {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

export function verifyToken(token: string): { id: number; username: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; username: string; role: string };
  } catch {
    return null;
  }
}

export async function createSession(userId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  await query(
    'INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)',
    [userId, token, expiresAt]
  );
  
  return token;
}

export async function validateSession(token: string): Promise<User | null> {
  const result = await query(
    `SELECT u.id, u.username, u.role, u.display_name, u.phone, u.created_at, u.last_login_at
     FROM sessions s
     JOIN users u ON s.user_id = u.id
     WHERE s.token = $1 AND s.expires_at > NOW()`,
    [token]
  );
  return result.rows[0] || null;
}

export async function deleteSession(token: string): Promise<void> {
  await query('DELETE FROM sessions WHERE token = $1', [token]);
}

export async function updateLastLogin(userId: number): Promise<void> {
  await query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [userId]);
}

export async function getUserCount(): Promise<number> {
  const result = await query('SELECT COUNT(*) as count FROM users');
  return parseInt(result.rows[0].count, 10);
}

export async function getAdminCount(): Promise<number> {
  const result = await query("SELECT COUNT(*) as count FROM users WHERE role = 'admin'");
  return parseInt(result.rows[0].count, 10);
}

export async function getAllUsers(): Promise<User[]> {
  const result = await query(
    'SELECT id, username, role, display_name, phone, created_at, last_login_at FROM users ORDER BY created_at DESC'
  );
  return result.rows;
}

export async function updateUserRole(userId: number, role: string): Promise<User | null> {
  const result = await query(
    'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, username, role, display_name, phone, created_at, last_login_at',
    [role, userId]
  );
  return result.rows[0] || null;
}

export async function deleteUser(userId: number): Promise<boolean> {
  const result = await query('DELETE FROM users WHERE id = $1', [userId]);
  return (result.rowCount ?? 0) > 0;
}
