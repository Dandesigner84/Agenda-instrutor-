
import React, { useState, useMemo } from 'react';
import { Instructor, CnhCategory, TransmissionType, UserRole, AuthUser, AccountStatus } from './types.ts';
import { MOCK_INSTRUCTORS } from './constants.ts';
import InstructorCard from './components/InstructorCard.tsx';
import BookingModal from './components/BookingModal.tsx';
import AuthFlow from './components/AuthFlow.tsx';
import InstructorDashboard from './components/dashboards/InstructorDashboard.tsx';
import AdminDashboard from './components/dashboards/AdminDashboard.tsx';
import { Search, Filter, Car, Settings, CheckCircle, LogOut, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [instructors] = useState<Instructor[]>(MOCK_INSTRUCTORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CnhCategory | 'ALL'>('ALL');
  const [selectedTransmission, setSelectedTransmission] = useState<TransmissionType | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'price' | 'experience' | 'rating'>('rating');
  
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filtro de Marketplace para Alunos
  const filteredInstructors = useMemo(() => {
    return instructors
      .filter(inst => {
        const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             inst.baseAddress.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || inst.categories.includes(selectedCategory);
        const matchesTransmission = selectedTransmission === 'ALL' || inst.vehicle.type === selectedTransmission;
        return matchesSearch && matchesCategory && matchesTransmission;
      })
      .sort((a, b) => {
        if (sortBy === 'price') return a.basePrice - b.basePrice;
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        return b.rating - a.rating;
      });
  }, [instructors, searchQuery, selectedCategory, selectedTransmission, sortBy]);

  const handleConfirmBooking = (data: any) => {
    setSelectedInstructor(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <AuthFlow onLogin={setCurrentUser} />;
  }

  // Visualização de Administrador
  if (currentUser.role === UserRole.ADMIN) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <header className="bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg"><ShieldCheck size={24} /></div>
            <h1 className="text-xl font-bold">AutoDrive <span className="text-blue-600">Admin</span></h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-red-500 bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors">
            <LogOut size={18} /> Sair
          </button>
        </header>
        <main className="max-w-7xl mx-auto"><AdminDashboard /></main>
      </div>
    );
  }

  // Visualização de Instrutor
  if (currentUser.role === UserRole.INSTRUCTOR) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <header className="bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg"><Car size={24} /></div>
            <h1 className="text-xl font-bold">AutoDrive <span className="text-indigo-600">Pro</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-gray-900">{currentUser.name}</p>
              <p className="text-[10px] text-green-600 font-bold uppercase">Perfil Profissional Ativo</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><LogOut size={22} /></button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto">
          <InstructorDashboard user={MOCK_INSTRUCTORS[0]} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <Car size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">AutoDrive<span className="text-blue-600">Smart</span></h1>
          </div>
          
          <div className="hidden md:flex items-center bg-gray-100 rounded-2xl px-4 py-2 w-96">
            <Search className="text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar instrutor ou bairro..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
              <Settings size={22} />
            </button>
            <button onClick={handleLogout} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
              <LogOut size={22} />
            </button>
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold shadow-sm">
              {currentUser.name.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-72 shrink-0 space-y-8">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Filter size={16} /> Filtros Estratégicos
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Categoria CNH</label>
                <div className="flex flex-wrap gap-2">
                  {['ALL', ...Object.values(CnhCategory)].map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat as any)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>{cat === 'ALL' ? 'Todas' : cat}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Ordenação</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500" value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                  <option value="rating">🏆 Melhor Avaliados</option>
                  <option value="price">💰 Menor Preço</option>
                  <option value="experience">🎖️ Mais Experientes</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-grow space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{filteredInstructors.length} Instrutores Ativos</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {filteredInstructors.map(inst => (
              <InstructorCard key={inst.id} instructor={inst} onClick={setSelectedInstructor} />
            ))}
          </div>
        </div>
      </main>

      {showSuccess && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 duration-500">
          <CheckCircle size={24} />
          <div><p className="font-bold">Aula Solicitada!</p><p className="text-xs text-green-100">O instrutor enviará uma confirmação em breve.</p></div>
        </div>
      )}

      {selectedInstructor && <BookingModal instructor={selectedInstructor} onClose={() => setSelectedInstructor(null)} onConfirm={handleConfirmBooking} />}
    </div>
  );
};

export default App;
