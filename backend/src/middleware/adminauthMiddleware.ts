import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/Admin';
import type { AuthRequest, JwtPayload } from '../types';

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer')) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

 try {
  const token = header.split(' ')[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;

  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  req.user = user;
  next();
} catch {
  res.status(401).json({
    message: 'Not authorized, token failed',
  });
}
};