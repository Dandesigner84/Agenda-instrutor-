
import React, { useState } from 'react';
import { MOCK_INSTRUCTORS } from '../../constants.ts';
import { ShieldCheck, Users, BarChart3, Settings, Check, X, AlertCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [instructors, setInstructors] = useState(MOCK_INSTRUCTORS.map(i => ({ ...i, status: 'PENDING' })));

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-2xl text-blue-600"><Users size={24} /></div>
          <div><p className="text-xs text-gray-400 font-bold uppercase">Total Usuários</p><p className="text-2xl font-bold">1,284</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-green-100 p-4 rounded-2xl text-green-600"><BarChart3 size={24} /></div>
          <div><p className="text-xs text-gray-400 font-bold uppercase">Aulas/Mês</p><p className="text-2xl font-bold">452</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-amber-100 p-4 rounded-2xl text-amber-600"><AlertCircle size={24} /></div>
          <div><p className="text-xs text-gray-400 font-bold uppercase">Pendentes</p><p className="text-2xl font-bold">{instructors.length}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold flex items-center gap-2"><ShieldCheck className="text-blue-600" /> Aprovação de Instrutores</h3>
          <button className="text-sm text-blue-600 font-bold flex items-center gap-1"><Settings size={16} /> Configurações de Taxa</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Instrutor</th>
                <th className="px-6 py-4">Exp.</th>
                <th className="px-6 py-4">Veículo</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {instructors.map(inst => (
                <tr key={inst.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={inst.photo} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                      <div><p className="font-bold text-gray-900">{inst.name}</p><p className="text-xs text-gray-500">{inst.baseAddress}</p></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{inst.experienceYears} anos</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{inst?.vehicle?.model}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">AGUARDANDO</span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"><Check size={18} /></button>
                    <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"><X size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
