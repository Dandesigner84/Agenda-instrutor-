
import React from 'react';
import { Instructor, TransmissionType } from '../types.ts';
import { Star, MapPin, Briefcase, Car, ShieldCheck } from 'lucide-react';

interface Props {
  instructor: Instructor;
  onClick: (instructor: Instructor) => void;
  userDistance?: number;
}

const InstructorCard: React.FC<Props> = ({ instructor, onClick, userDistance }) => {
  return (
    <div 
      onClick={() => onClick(instructor)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col md:flex-row gap-5"
    >
      <div className="relative shrink-0">
        <img 
          src={instructor.photo} 
          alt={instructor.name} 
          className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover"
        />
        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg shadow-lg">
          <ShieldCheck size={18} />
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{instructor.name}</h3>
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <Star className="text-yellow-400 fill-yellow-400" size={16} />
              <span className="font-semibold text-gray-700">{instructor.rating}</span>
              <span>({instructor.reviewCount} aulas)</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">R$ {instructor.basePrice}</span>
            <p className="text-xs text-gray-400 font-medium italic">/ aula</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-3 mt-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Briefcase size={16} className="text-blue-500" />
            <span>{instructor.experienceYears} anos exp.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Car size={16} className="text-blue-500" />
            <span className="truncate">{instructor?.vehicle?.model} ({instructor?.vehicle?.type === TransmissionType.AUTOMATIC ? 'Aut.' : 'Man.'})</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 col-span-2">
            <MapPin size={16} className="text-blue-500" />
            <span className="truncate">{instructor.baseAddress}</span>
            {userDistance !== undefined && (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                a {userDistance.toFixed(1)} km
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {instructor.categories.map(cat => (
            <span key={cat} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">
              Cat. {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
