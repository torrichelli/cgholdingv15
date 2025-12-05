import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
  VerifiedRegistrationResponse,
  VerifiedAuthenticationResponse,
} from '@simplewebauthn/server';
import type {
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
  AuthenticatorTransportFuture,
} from '@simplewebauthn/server';
import { query } from './db.js';
import { findUserById, User } from './auth.js';

const rpName = 'CreativeCMS';
const rpID = process.env.RP_ID || 'localhost';
const origin = process.env.ORIGIN || `https://${process.env.REPLIT_DEV_DOMAIN}`;

export interface Passkey {
  id: number;
  user_id: number;
  credential_id: string;
  public_key: string;
  counter: number;
  transports: string[];
  device_type: string;
  backed_up: boolean;
  created_at: Date;
}

export async function getPasskeysByUserId(userId: number): Promise<Passkey[]> {
  const result = await query('SELECT * FROM passkeys WHERE user_id = $1', [userId]);
  return result.rows;
}

export async function getPasskeyByCredentialId(credentialId: string): Promise<Passkey | null> {
  const result = await query('SELECT * FROM passkeys WHERE credential_id = $1', [credentialId]);
  return result.rows[0] || null;
}

export async function saveChallenge(userId: number | null, challenge: string, type: 'registration' | 'authentication') {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await query(
    'INSERT INTO passkey_challenges (user_id, challenge, type, expires_at) VALUES ($1, $2, $3, $4)',
    [userId, challenge, type, expiresAt]
  );
}

export async function getChallenge(userId: number | null, type: 'registration' | 'authentication'): Promise<string | null> {
  const result = await query(
    'SELECT challenge FROM passkey_challenges WHERE user_id = $1 AND type = $2 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1',
    [userId, type]
  );
  if (result.rows[0]) {
    await query('DELETE FROM passkey_challenges WHERE user_id = $1 AND type = $2', [userId, type]);
    return result.rows[0].challenge;
  }
  return null;
}

export async function generateRegistrationOptionsForUser(user: User) {
  const userPasskeys = await getPasskeysByUserId(user.id);
  
  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID: new TextEncoder().encode(user.id.toString()),
    userName: user.username,
    userDisplayName: user.display_name || user.username,
    attestationType: 'none',
    excludeCredentials: userPasskeys.map(passkey => ({
      id: passkey.credential_id,
      transports: passkey.transports as AuthenticatorTransportFuture[],
    })),
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
    },
  });
  
  await saveChallenge(user.id, options.challenge, 'registration');
  
  return options;
}

export async function verifyAndSaveRegistration(
  user: User,
  response: RegistrationResponseJSON
): Promise<VerifiedRegistrationResponse> {
  const expectedChallenge = await getChallenge(user.id, 'registration');
  
  if (!expectedChallenge) {
    throw new Error('Challenge not found or expired');
  }
  
  const verification = await verifyRegistrationResponse({
    response,
    expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
  });
  
  if (verification.verified && verification.registrationInfo) {
    const { credential, credentialDeviceType, credentialBackedUp } = verification.registrationInfo;
    
    await query(
      `INSERT INTO passkeys (user_id, credential_id, public_key, counter, transports, device_type, backed_up)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        user.id,
        credential.id,
        Buffer.from(credential.publicKey).toString('base64'),
        credential.counter,
        response.response.transports || [],
        credentialDeviceType,
        credentialBackedUp,
      ]
    );
  }
  
  return verification;
}

export async function generateAuthenticationOptionsForUser(username?: string) {
  let allowCredentials: { id: string; transports?: AuthenticatorTransportFuture[] }[] = [];
  let userId: number | null = null;
  
  if (username) {
    const userResult = await query('SELECT id FROM users WHERE username = $1', [username.toLowerCase()]);
    if (userResult.rows[0]) {
      userId = userResult.rows[0].id;
      const passkeys = await getPasskeysByUserId(userId);
      allowCredentials = passkeys.map(p => ({
        id: p.credential_id,
        transports: p.transports as AuthenticatorTransportFuture[],
      }));
    }
  }
  
  const options = await generateAuthenticationOptions({
    rpID,
    allowCredentials: allowCredentials.length > 0 ? allowCredentials : undefined,
    userVerification: 'preferred',
  });
  
  await saveChallenge(userId, options.challenge, 'authentication');
  
  return { options, userId };
}

export async function verifyAuthentication(
  response: AuthenticationResponseJSON,
  userId: number | null
): Promise<{ verified: boolean; user: User | null }> {
  const passkey = await getPasskeyByCredentialId(response.id);
  
  if (!passkey) {
    throw new Error('Passkey not found');
  }
  
  const expectedChallenge = await getChallenge(userId || passkey.user_id, 'authentication');
  
  if (!expectedChallenge) {
    throw new Error('Challenge not found or expired');
  }
  
  const verification = await verifyAuthenticationResponse({
    response,
    expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
    credential: {
      id: passkey.credential_id,
      publicKey: Buffer.from(passkey.public_key, 'base64'),
      counter: passkey.counter,
      transports: passkey.transports as AuthenticatorTransportFuture[],
    },
  });
  
  if (verification.verified) {
    await query('UPDATE passkeys SET counter = $1 WHERE id = $2', [
      verification.authenticationInfo.newCounter,
      passkey.id,
    ]);
    
    const user = await findUserById(passkey.user_id);
    return { verified: true, user };
  }
  
  return { verified: false, user: null };
}

export async function deletePasskey(passkeyId: number, userId: number): Promise<boolean> {
  const result = await query('DELETE FROM passkeys WHERE id = $1 AND user_id = $2', [passkeyId, userId]);
  return (result.rowCount ?? 0) > 0;
}
