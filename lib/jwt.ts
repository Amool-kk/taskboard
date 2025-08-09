import jwt, { SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "my-super-secret-key";

console.log(SECRET, "-----===---")

export function signJwt(payload: object, expiresIn: string = "1h") {
  return jwt.sign(payload, SECRET, {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
