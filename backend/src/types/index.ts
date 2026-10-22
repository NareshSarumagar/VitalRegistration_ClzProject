import type { Request } from 'express';
import type { Types } from 'mongoose';

export type UserRole = 'admin' | 'registrar';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(entered: string): Promise<boolean>;
}

export interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: IUser;
}