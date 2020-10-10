import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

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
    throw new AppError('JWT token not found', 401);
  }

  const [, token] = authHeader.split(' ');
  const secret = process.env.SECRET;

  try {
    const { sub: id } = verify(token, secret) as TokenResponse;
    req.user = { id };
    return next();
  } catch {
    throw new AppError('JWT token incorrect format', 401);
  }
}
