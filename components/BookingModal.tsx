
import React, { useState, useEffect } from 'react';
import { Instructor, Coordinates } from '../types';
import { X, Navigation, AlertTriangle, Calendar, Clock, CreditCard } from 'lucide-react';
import { calculateDistance, calculateLessonPrice, estimateTravelTime } from '../utils/geoUtils';

interface Props {
  instructor: Instructor;
  onClose: () => void;
  onConfirm: (booking: any) => void;
}

const BookingModal: React.FC<Props> = ({ instructor, onClose, onConfirm }) => {
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  // Simulation of geocoding for a few demo addresses
  const [mockCoords, setMockCoords] = useState<Coordinates | null>(null);
  const [stats, setStats] = useState({ distance: 0, time: 0, finalPrice: instructor.basePrice, hasSurcharge: false });

  const simulateGeocoding = (val: string) => {
    // In a real app, this would use Google Maps Geocoding API
    // We mock different coords based on length for the demo
    const offset = val.length * 0.002;
    return {
      lat: instructor.baseCoords.lat + offset - 0.05,
      lng: instructor.baseCoords.lng + offset - 0.05,
    };
  };

  useEffect(() => {
    if (address.length > 5) {
      const coords = simulateGeocoding(address);
      setMockCoords(coords);
      
      const distance = calculateDistance(instructor.baseCoords, coords);
      const time = estimateTravelTime(distance);
      const { price, hasSurcharge } = calculateLessonPrice(instructor.basePrice, distance);
      
      setStats({ distance, time, finalPrice: price, hasSurcharge });
    } else {
      setMockCoords(null);
      setStats({ distance: 0, time: 0, finalPrice: instructor.basePrice, hasSurcharge: false });
    }
  }, [address, instructor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !selectedDate || !selectedTime) return;
    
    onConfirm({
      instructorName: instructor.name,
      address,
      date: selectedDate,
      time: selectedTime,
      price: stats.finalPrice,
      distance: stats.distance
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Agendar Aula</h2>
            <p className="text-sm text-gray-500">com {instructor.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Navigation size={16} className="text-blue-600" />
              Onde o instrutor deve te buscar?
            </label>
            <input 
              type="text"
              required
              placeholder="Digite seu endereço completo..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {address.length > 5 && (
              <div className="flex items-center gap-4 text-xs font-medium bg-blue-50 text-blue-700 p-3 rounded-xl">
                <span>Distância: {stats.distance.toFixed(1)} km</span>
                <span>Tempo de deslocamento est.: {stats.time} min</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={16} className="text-blue-600" />
                Data
              </label>
              <input 
                type="date"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock size={16} className="text-blue-600" />
                Horário
              </label>
              <select 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="08:00">08:00</option>
                <option value="10:00">10:00</option>
                <option value="14:00">14:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>

          {stats.hasSurcharge && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="text-amber-600 shrink-0" size={20} />
              <div className="text-sm text-amber-800">
                <p className="font-bold">Aviso de Distância</p>
                <p>Seu endereço está a mais de 10km da base do instrutor. Foi aplicado um acréscimo de <strong>R$ 10,00</strong> ao valor base.</p>
              </div>
            </div>
          )}

          <div className="bg-gray-900 rounded-2xl p-6 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 rounded-xl">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total da Aula</p>
                <p className="text-2xl font-bold">R$ {stats.finalPrice.toFixed(2)}</p>
              </div>
            </div>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
