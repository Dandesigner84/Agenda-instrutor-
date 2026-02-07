
export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export enum AccountStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED'
}

export enum CnhCategory {
  A = 'A',
  B = 'B',
  AB = 'AB',
  D = 'D',
  E = 'E'
}

export enum TransmissionType {
  MANUAL = 'Manual',
  AUTOMATIC = 'Automático'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Vehicle {
  model: string;
  year: number;
  type: TransmissionType;
}

export interface Availability {
  dayOfWeek: number; 
  startHour: number; 
  endHour: number;   
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  photo?: string;
}

export interface Instructor extends AuthUser {
  experienceYears: number;
  categories: CnhCategory[];
  vehicle: Vehicle;
  baseAddress: string;
  baseCoords: Coordinates;
  rating: number;
  reviewCount: number;
  basePrice: number;
  bio: string;
  availability: Availability[];
}

export interface Lesson {
  id: string;
  instructorId: string;
  studentId: string;
  studentName: string;
  pickupAddress: string;
  date: string;
  startTime: string;
  finalPrice: number;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}
