
import { Instructor, CnhCategory, TransmissionType, UserRole, AccountStatus } from './types';

export const MOCK_INSTRUCTORS: Instructor[] = [
  // Fix: Added missing required properties (phone, consentGiven, isApproved, createdAt, updatedAt) for Roberto Silva and his vehicle
  {
    id: '1',
    name: 'Roberto Silva',
    email: 'roberto@autodrive.com',
    role: UserRole.INSTRUCTOR,
    status: AccountStatus.ACTIVE,
    phone: '11999999991',
    consentGiven: true,
    createdAt: '2023-01-01T10:00:00Z',
    updatedAt: '2023-01-01T10:00:00Z',
    photo: 'https://picsum.photos/seed/roberto/200',
    experienceYears: 15,
    categories: [CnhCategory.A, CnhCategory.B],
    // Fix: Added missing required properties (instructorId, plateMasked, id, createdAt, updatedAt) for Vehicle (Line 15)
    vehicle: {
      id: 'v1',
      instructorId: '1',
      model: 'Volkswagen Polo',
      year: 2023,
      type: TransmissionType.MANUAL,
      plateMasked: 'ABC-***1',
      createdAt: '2023-01-01T10:00:00Z',
      updatedAt: '2023-01-01T10:00:00Z'
    },
    baseAddress: 'Centro, São Paulo - SP',
    baseCoords: { lat: -23.5505, lng: -46.6333 },
    rating: 4.9,
    reviewCount: 124,
    basePrice: 85,
    bio: 'Especialista em alunos com medo de dirigir. Paciência e didática comprovada.',
    isApproved: true,
    availability: [
      { dayOfWeek: 1, startHour: 8, endHour: 18 },
      { dayOfWeek: 2, startHour: 8, endHour: 18 },
      { dayOfWeek: 3, startHour: 8, endHour: 18 },
      { dayOfWeek: 4, startHour: 8, endHour: 18 },
      { dayOfWeek: 5, startHour: 8, endHour: 18 }
    ]
  },
  // Fix: Added missing required properties (phone, consentGiven, isApproved, createdAt, updatedAt) for Ana Oliveira and her vehicle (Line 30)
  {
    id: '2',
    name: 'Ana Oliveira',
    email: 'ana@autodrive.com',
    role: UserRole.INSTRUCTOR,
    status: AccountStatus.ACTIVE,
    phone: '11999999992',
    consentGiven: true,
    createdAt: '2023-01-01T10:00:00Z',
    updatedAt: '2023-01-01T10:00:00Z',
    photo: 'https://picsum.photos/seed/ana/200',
    experienceYears: 8,
    categories: [CnhCategory.B],
    // Fix: Added missing required properties (instructorId, plateMasked, id, createdAt, updatedAt) for Vehicle (Line 44)
    vehicle: {
      id: 'v2',
      instructorId: '2',
      model: 'Hyundai HB20',
      year: 2022,
      type: TransmissionType.AUTOMATIC,
      plateMasked: 'XYZ-***2',
      createdAt: '2023-01-01T10:00:00Z',
      updatedAt: '2023-01-01T10:00:00Z'
    },
    baseAddress: 'Vila Mariana, São Paulo - SP',
    baseCoords: { lat: -23.5891, lng: -46.6341 },
    rating: 4.7,
    reviewCount: 89,
    basePrice: 95,
    bio: 'Foco em direção defensiva e baliza perfeita. Carro automático super confortável.',
    isApproved: true,
    availability: [
      { dayOfWeek: 1, startHour: 7, endHour: 16 },
      { dayOfWeek: 2, startHour: 7, endHour: 16 },
      { dayOfWeek: 4, startHour: 7, endHour: 16 },
      { dayOfWeek: 6, startHour: 8, endHour: 12 }
    ]
  },
  // Fix: Added missing required properties (phone, consentGiven, isApproved, createdAt, updatedAt) for Marcos Santos and his vehicle (Line 54)
  {
    id: '3',
    name: 'Marcos Santos',
    email: 'marcos@autodrive.com',
    role: UserRole.INSTRUCTOR,
    status: AccountStatus.ACTIVE,
    phone: '11999999993',
    consentGiven: true,
    createdAt: '2023-01-01T10:00:00Z',
    updatedAt: '2023-01-01T10:00:00Z',
    photo: 'https://picsum.photos/seed/marcos/200',
    experienceYears: 20,
    categories: [CnhCategory.D, CnhCategory.E],
    // Fix: Added missing required properties (instructorId, plateMasked, id, createdAt, updatedAt) for Vehicle (Line 72)
    vehicle: {
      id: 'v3',
      instructorId: '3',
      model: 'Mercedes Sprinter',
      year: 2021,
      type: TransmissionType.MANUAL,
      plateMasked: 'PRO-***3',
      createdAt: '2023-01-01T10:00:00Z',
      updatedAt: '2023-01-01T10:00:00Z'
    },
    baseAddress: 'Lapa, São Paulo - SP',
    baseCoords: { lat: -23.5222, lng: -46.7027 },
    rating: 5.0,
    reviewCount: 210,
    basePrice: 75,
    bio: 'Instrutor veterano em categorias profissionais. Treinamento para frotas e motoristas de carga.',
    isApproved: true,
    availability: [
      { dayOfWeek: 1, startHour: 9, endHour: 20 },
      { dayOfWeek: 3, startHour: 9, endHour: 20 },
      { dayOfWeek: 5, startHour: 9, endHour: 20 }
    ]
  }
];
