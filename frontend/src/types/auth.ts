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

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  placeOfBirth: string;
  motherName?: string;
  fatherName?: string;
  registrationDate: string;
  certificateNumber: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  type: 'Birth' | 'Death';
}

export interface DeathRecord extends Omit<Person, 'dateOfBirth' | 'placeOfBirth' | 'motherName' | 'fatherName'> {
  dateOfDeath: string;
  placeOfDeath: string;
  causeOfDeath: string;
  ageAtDeath: number;
}

export interface DashboardStats {
  totalBirths: number;
  totalDeaths: number;
  pendingRegistrations: number;
  approvedToday: number;
  monthlyData: MonthlyData[];
  recentRegistrations: Person[];
  genderDistribution: GenderData[];
}

export interface MonthlyData {
  month: string;
  births: number;
  deaths: number;
}

export interface GenderData {
  name: string;
  value: number;
  color: string;
}

export type RegistrationType = 'birth' | 'death';
export type ViewMode = 'dashboard' | 'registrations' | 'new-registration' | 'reports' | 'settings';