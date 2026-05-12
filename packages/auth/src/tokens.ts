import crypto from 'crypto';

export const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;
export const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;

export function generateRefreshToken(): string {
  return crypto.randomUUID();
}

export function refreshTokenExpiry(now: Date = new Date()): Date {
  return new Date(now.getTime() + REFRESH_TOKEN_TTL_MS);
}

export function generateResetToken(): { rawToken: string; hashedToken: string } {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = hashResetToken(rawToken);
  return { rawToken, hashedToken };
}

export function hashResetToken(rawToken: string): string {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

export function resetTokenExpiry(now: Date = new Date()): Date {
  return new Date(now.getTime() + RESET_TOKEN_TTL_MS);
}
