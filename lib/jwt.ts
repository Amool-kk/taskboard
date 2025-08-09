import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "my-super-secret-key";

export function signJwt(payload: object, expiresIn = "1h") {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
