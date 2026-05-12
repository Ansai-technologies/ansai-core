import bcrypt from 'bcrypt';

export const DEFAULT_BCRYPT_COST = 12;

export function hashPassword(plaintext: string, cost: number = DEFAULT_BCRYPT_COST): Promise<string> {
  return bcrypt.hash(plaintext, cost);
}

export function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}
