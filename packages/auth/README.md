# @ansai/auth

Authentication primitives for the Ansai ecosystem. Pure utilities only — no fastify or framework coupling.

Exports:
- `hashPassword(plaintext, cost?)` / `verifyPassword(plaintext, hash)` — bcrypt wrappers with the canonical Ansai cost (12).
- `generateRefreshToken()` / `refreshTokenExpiry()` — refresh-token issuance helpers.
- `generateResetToken()` / `hashResetToken(raw)` / `resetTokenExpiry()` — password-reset token helpers (raw token issued to user, sha256 hash stored in DB).

JWT signing and verification remain in the consumer product because the JWT payload shape (role, schoolId, scopes) is product-specific and the plugin instance owns the secret.
