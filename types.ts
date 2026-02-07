
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

export enum LessonStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

// Interface base para Auditoria e LGPD
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface AuthUser extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: AccountStatus;
  photo?: string;
  consentGiven: boolean;
  consentDate?: string;
}

export interface Vehicle extends BaseEntity {
  instructorId: string;
  model: string;
  year: number;
  type: TransmissionType;
  plateMasked: string; // Ex: ABC-***1
}

export interface Availability extends BaseEntity {
  instructorId: string;
  dayOfWeek: number; 
  startHour: number; 
  endHour: number;   
}

export interface Instructor extends AuthUser {
  experienceYears: number;
  categories: CnhCategory[];
  vehicleId?: string;
  vehicle?: Vehicle;
  baseAddress: string;
  baseCoords: Coordinates;
  rating: number;
  reviewCount: number;
  basePrice: number;
  bio: string;
  isApproved: boolean;
  availability?: Partial<Availability>[];
}

export interface Lesson extends BaseEntity {
  instructorId: string;
  studentId: string;
  startDateTime: string;
  endDateTime: string;
  pickupAddress: string;
  pickupCoords: Coordinates;
  
  // Snapshots de Precificação (Imutabilidade Financeira)
  distanceKm: number;
  travelTimeMinutes: number;
  basePriceSnapshot: number;
  distanceFee: number;
  totalPrice: number;
  
  status: LessonStatus;
}
