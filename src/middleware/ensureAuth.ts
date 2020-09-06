import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenResponse {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token not found');
  }

  const [, token] = authHeader.split(' ');
  const secret = process.env.SECRET;

  try {
    const { sub: id } = verify(token, secret) as TokenResponse;
    req.user = { id };
    return next();
  } catch {
    throw new Error('JWT token incorrect format');
  }
}
