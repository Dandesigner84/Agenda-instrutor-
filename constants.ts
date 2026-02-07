
import { Instructor, CnhCategory, TransmissionType, UserRole, AccountStatus } from './types';

export const MOCK_INSTRUCTORS: Instructor[] = [
  // Fix: Added missing required properties (email, role, status) for Roberto Silva (Line 5)
  {
    id: '1',
    name: 'Roberto Silva',
    email: 'roberto@autodrive.com',
    role: UserRole.INSTRUCTOR,
    status: AccountStatus.ACTIVE,
    photo: 'https://picsum.photos/seed/roberto/200',
    experienceYears: 15,
    categories: [CnhCategory.A, CnhCategory.B],
    vehicle: {
      model: 'Volkswagen Polo',
      year: 2023,
      type: TransmissionType.MANUAL
    },
    baseAddress: 'Centro, São Paulo - SP',
    baseCoords: { lat: -23.5505, lng: -46.6333 },
    rating: 4.9,
    reviewCount: 124,
    basePrice: 85,
    bio: 'Especialista em alunos com medo de dirigir. Paciência e didática comprovada.',
    availability: [
      { dayOfWeek: 1, startHour: 8, endHour: 18 },
      { dayOfWeek: 2, startHour: 8, endHour: 18 },
      { dayOfWeek: 3, startHour: 8, endHour: 18 },
      { dayOfWeek: 4, startHour: 8, endHour: 18 },
      { dayOfWeek: 5, startHour: 8, endHour: 18 }
    ]
  },
  // Fix: Added missing required properties (email, role, status) for Ana Oliveira (Line 30)
  {
    id: '2',
    name: 'Ana Oliveira',
    email: 'ana@autodrive.com',
    role: UserRole.INSTRUCTOR,
    status: AccountStatus.ACTIVE,
    photo: 'https://picsum.photos/seed/ana/200',
    experienceYears: 8,
    categories: [CnhCategory.B],
    vehicle: {
      model: 'Hyundai HB20',
      year: 2022,
      type: TransmissionType.AUTOMATIC
    },
    baseAddress: 'Vila Mariana, São Paulo - SP',
    baseCoords: { lat: -23.5891, lng: -46.6341 },
    rating: 4.7,
    reviewCount: 89,
    basePrice: 95,
    bio: 'Foco em direção defensiva e baliza perfeita. Carro automático super confortável.',
    availability: [
      { dayOfWeek: 1, startHour: 7, endHour: 16 },
      { dayOfWeek: 2, startHour: 7, endHour: 16 },
      { dayOfWeek: 4, startHour: 7, endHour: 16 },
      { dayOfWeek: 6, startHour: 8, endHour: 12 }
    ]
  },
  // Fix: Added missing required properties (email, role, status) for Marcos Santos (Line 54)
  {
    id: '3',
    name: 'Marcos Santos',
    email: 'marcos@autodrive.com',
    role: UserRole.INSTRUCTOR,
    status: AccountStatus.ACTIVE,
    photo: 'https://picsum.photos/seed/marcos/200',
    experienceYears: 20,
    categories: [CnhCategory.D, CnhCategory.E],
    vehicle: {
      model: 'Mercedes Sprinter',
      year: 2021,
      type: TransmissionType.MANUAL
    },
    baseAddress: 'Lapa, São Paulo - SP',
    baseCoords: { lat: -23.5222, lng: -46.7027 },
    rating: 5.0,
    reviewCount: 210,
    basePrice: 75,
    bio: 'Instrutor veterano em categorias profissionais. Treinamento para frotas e motoristas de carga.',
    availability: [
      { dayOfWeek: 1, startHour: 9, endHour: 20 },
      { dayOfWeek: 3, startHour: 9, endHour: 20 },
      { dayOfWeek: 5, startHour: 9, endHour: 20 }
    ]
  }
];
