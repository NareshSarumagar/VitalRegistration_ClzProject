export type UserRole = "admin" | "registrar" | "citizen";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  nationalId?: string;
  isVerified?: boolean;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
}