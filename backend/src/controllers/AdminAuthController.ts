import type { Request, Response } from 'express';
import jwt, { type SignOptions } from 'jsonwebtoken';
import User from '../models/Admin';
import type { AuthRequest, UserPayload } from '../types';

const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured in .env');
  }

  const expiresIn: SignOptions['expiresIn'] =
    (process.env.JWT_EXPIRES as SignOptions['expiresIn']) || '7d';

  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};

const toUserPayload = (user: {
  _id: unknown;
  name: string;
  email: string;
  role: 'admin' | 'registrar';
}): UserPayload => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role,
});

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(String(user._id));

    return res.json({
      token,
      user: toUserPayload(user),
    });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user: toUserPayload(user) });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};