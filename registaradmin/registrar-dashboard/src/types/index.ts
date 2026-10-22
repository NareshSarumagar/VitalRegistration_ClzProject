export interface Birth {
  _id: string;
  childFirstName: string;
  childLastName: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  motherFullName: string;
  motherNationalId: string;
  fatherFullName: string;
  fatherNationalId: string;
  province: string;
  district: string;
  municipality: string;
  ward: string;
  contactPhone: string;
  contactEmail: string;
  remarks: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Death {
  _id: string;
  deceasedFirstName: string;
  deceasedLastName: string;
  gender: string;
  dateOfBirth: string;
  dateOfDeath: string;
  timeOfDeath: string;
  placeOfDeath: string;
  ageAtDeath: string;
  causeOfDeath: string;
  nationality: string;
  occupation: string;
  informantFullName: string;
  informantRelation: string;
  informantNationalId: string;
  informantPhone: string;
  province: string;
  district: string;
  municipality: string;
  ward: string;
  hospitalName: string;
  doctorName: string;
  remarks: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Marriage {
  _id: string;

  // Groom Information
  groomFirstName: string;
  groomLastName: string;
  groomDateOfBirth: string;
  groomNationalId: string;
  groomNationality: string;
  groomOccupation: string;
  groomPhone: string;

  // Bride Information
  brideFirstName: string;
  brideLastName: string;
  brideDateOfBirth: string;
  brideNationalId: string;
  brideNationality: string;
  brideOccupation: string;
  bridePhone: string;

  // Marriage Details
  dateOfMarriage: string;
  placeOfMarriage: string;
  marriageType: string;
  witness1Name: string;
  witness1NationalId: string;
  witness2Name: string;
  witness2NationalId: string;

  // Address
  province: string;
  district: string;
  municipality: string;
  ward: string;

  // Contact & Additional
  contactPhone: string;
  contactEmail: string;
  remarks: string;

  createdAt?: string;
  updatedAt?: string;
}

export type RecordType = 'birth' | 'death' | 'marriage';


export type UserRole = 'admin' | 'registrar';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface MeResponse {
  user: User;
}