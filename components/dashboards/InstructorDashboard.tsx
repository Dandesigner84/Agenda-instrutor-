
import React from 'react';
import { Instructor } from '../../types.ts';
import { Calendar, DollarSign, Clock, MapPin, User, Star, TrendingUp, Check, X } from 'lucide-react';

interface Props {
  user: Instructor;
}

const InstructorDashboard: React.FC<Props> = ({ user }) => {
  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><DollarSign size={64} /></div>
          <p className="text-xs text-gray-400 font-bold uppercase">Ganhos do Mês</p>
          <p className="text-2xl font-bold mt-1">R$ 4.250,00</p>
          <div className="flex items-center gap-1 mt-2 text-green-500 text-xs font-bold">
            <TrendingUp size={14} /> +12% vs mês ant.
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 font-bold uppercase">Aulas Reservadas</p>
          <p className="text-2xl font-bold mt-1">18</p>
          <p className="text-xs text-gray-500 mt-2">Próximos 7 dias</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 font-bold uppercase">Avaliação Média</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold">4.9</p>
            <Star className="text-yellow-400 fill-yellow-400" size={20} />
          </div>
          <p className="text-xs text-gray-500 mt-2">Baseado em 124 avaliações</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <p className="text-xs text-gray-400 font-bold uppercase">Status de Atendimento</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-bold text-green-600">Disponível Online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2"><Calendar className="text-blue-600" /> Minha Agenda de Hoje</h3>
              <button className="text-sm font-bold text-blue-600 px-4 py-2 bg-blue-50 rounded-xl hover:bg-blue-100">Bloquear Horário</button>
            </div>
            
            <div className="space-y-4">
              {[
                { time: '08:00', student: 'Pedro Henrique', address: 'Rua das Flores, 123', price: 'R$ 85,00', status: 'CONFIRMED' },
                { time: '10:00', student: 'Julia Mendes', address: 'Av. Paulista, 1000', price: 'R$ 95,00', status: 'CONFIRMED', surcharge: true },
                { time: '14:30', student: 'Carlos Silva', address: 'Rua Augusta, 450', price: 'R$ 85,00', status: 'PENDING' },
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border ${item.status === 'PENDING' ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100 bg-gray-50/50'} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                  <div className="flex gap-4">
                    <div className="bg-white w-16 h-16 rounded-xl border border-gray-200 flex flex-col items-center justify-center shadow-sm shrink-0">
                      <Clock size={16} className="text-blue-600" />
                      <span className="font-bold text-gray-900">{item.time}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.student}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin size={12} /> {item.address}</p>
                      {item.surcharge && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full mt-2 inline-block">ACRÉSCIMO DISTÂNCIA</span>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{item.price}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.status === 'PENDING' ? 'Pendente' : 'Confirmada'}</p>
                    </div>
                    {item.status === 'PENDING' ? (
                      <div className="flex gap-2">
                        <button className="bg-blue-600 text-white p-2 rounded-lg"><Check size={18} /></button>
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg"><X size={18} /></button>
                      </div>
                    ) : (
                      <button className="text-blue-600 text-xs font-bold hover:underline">Ver Detalhes</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="relative inline-block mb-4">
              <img src={user.photo} className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-xl" />
              <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-2 border-white"><User size={16} /></button>
            </div>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-sm text-gray-500">Instrutor Cat. {user.categories.join('/')}</p>
            <div className="mt-6 flex flex-col gap-2">
              <button className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">Editar Perfil Profissional</button>
              <button className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">Configurações de Veículo</button>
              <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors">Relatório Financeiro Completo</button>
            </div>
          </div>

          <div className="bg-indigo-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold mb-2">Treinamento Premium</h4>
              <p className="text-xs text-indigo-200 leading-relaxed mb-4">Aprenda novas técnicas de didática e aumente suas avaliações em 30%.</p>
              <button className="bg-indigo-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-500">Acessar Curso</button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10"><TrendingUp size={120} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
