
import React, { useState, useRef } from 'react';
import { UserRole, AccountStatus, CnhCategory, TransmissionType } from '../types.ts';
import { Mail, Lock, Chrome, MessageCircle, User, Briefcase, ShieldCheck, ArrowRight, ChevronLeft, Car, Calendar, MapPin, Upload, AlertCircle, Camera, RefreshCw, X } from 'lucide-react';

interface Props {
  onLogin: (user: any) => void;
}

interface InstructorFormData {
  name: string;
  email: string;
  phone: string;
  categories: CnhCategory[];
  baseAddress: string;
  vehicleModel: string;
  vehicleYear: string;
  transmission: TransmissionType;
  documentFile: File | null;
}

const AuthFlow: React.FC<Props> = ({ onLogin }) => {
  const [view, setView] = useState<'LOGIN' | 'SELECT_ROLE' | 'REGISTER_STUDENT' | 'REGISTER_INSTRUCTOR'>('LOGIN');
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Camera States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Instructor Form State
  const [instructorData, setInstructorData] = useState<InstructorFormData>({
    name: '',
    email: '',
    phone: '',
    categories: [],
    baseAddress: '',
    vehicleModel: '',
    vehicleYear: '',
    transmission: TransmissionType.MANUAL,
    documentFile: null
  });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      setCameraStream(stream);
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Não foi possível acessar a câmera. Verifique as permissões.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `selfie_${Date.now()}.jpg`, { type: 'image/jpeg' });
            setInstructorData({ ...instructorData, documentFile: file });
            stopCamera();
          }
        }, 'image/jpeg', 0.9);
      }
    }
  };

  const validateInstructorForm = () => {
    const newErrors: Record<string, string> = {};
    if (!instructorData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!instructorData.email.includes('@')) newErrors.email = 'E-mail inválido';
    if (instructorData.phone.length < 10) newErrors.phone = 'Telefone inválido';
    if (instructorData.categories.length === 0) newErrors.categories = 'Selecione ao menos uma categoria';
    if (!instructorData.baseAddress.trim()) newErrors.baseAddress = 'Endereço base é obrigatório';
    if (!instructorData.vehicleModel.trim()) newErrors.vehicleModel = 'Modelo do veículo é obrigatório';
    
    const year = parseInt(instructorData.vehicleYear);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1990 || year > currentYear + 1) {
      newErrors.vehicleYear = 'Ano do veículo inválido';
    }
    
    if (!instructorData.documentFile) newErrors.documentFile = 'Selfie com CNH é necessária para validação';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInstructorForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        id: 'inst-' + Math.random().toString(36).substr(2, 9),
        name: instructorData.name,
        email: instructorData.email,
        role: UserRole.INSTRUCTOR,
        status: AccountStatus.PENDING
      });
      setIsLoading(false);
    }, 1500);
  };

  const mockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        id: 'u1',
        name: 'Usuário Teste',
        email: 'teste@autodrive.com',
        role: view === 'LOGIN' ? UserRole.STUDENT : role,
        status: AccountStatus.ACTIVE
      });
      setIsLoading(false);
    }, 1000);
  };

  const toggleCategory = (cat: CnhCategory) => {
    setInstructorData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  if (view === 'LOGIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 animate-in fade-in zoom-in duration-300">
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h2>
            <p className="text-sm text-gray-500 mt-1">Acesse sua conta AutoDrive Smart</p>
          </div>

          <form onSubmit={mockLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="email" placeholder="seu@email.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-bold">Ou entrar com</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              <Chrome size={20} className="text-red-500" />
              <span className="text-sm font-semibold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              <MessageCircle size={20} className="text-green-500" />
              <span className="text-sm font-semibold">WhatsApp</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Não tem uma conta? <button onClick={() => setView('SELECT_ROLE')} className="text-blue-600 font-bold hover:underline">Cadastre-se</button>
          </p>
        </div>
      </div>
    );
  }

  if (view === 'SELECT_ROLE') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 animate-in fade-in duration-300">
        <div className="w-full max-w-2xl">
          <button onClick={() => setView('LOGIN')} className="flex items-center gap-2 text-gray-500 font-bold mb-6 hover:text-gray-900 transition-colors">
            <ChevronLeft size={20} /> Voltar para Login
          </button>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Como você deseja usar a plataforma?</h2>
          <p className="text-gray-500 mb-8">Escolha o perfil que melhor se adapta às suas necessidades.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div 
              onClick={() => { setRole(UserRole.STUDENT); setView('REGISTER_STUDENT'); }}
              className="bg-white p-8 rounded-3xl border-2 border-transparent hover:border-blue-600 cursor-pointer transition-all shadow-sm hover:shadow-xl group"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <User size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sou Aluno</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Quero encontrar os melhores instrutores particulares para minhas aulas de direção.</p>
              <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm">
                Começar agora <ArrowRight size={16} />
              </div>
            </div>

            <div 
              onClick={() => { setRole(UserRole.INSTRUCTOR); setView('REGISTER_INSTRUCTOR'); }}
              className="bg-white p-8 rounded-3xl border-2 border-transparent hover:border-indigo-600 cursor-pointer transition-all shadow-sm hover:shadow-xl group"
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sou Instrutor</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Sou autônomo e quero gerenciar minha agenda, alunos e faturamento em um só lugar.</p>
              <div className="mt-6 flex items-center gap-2 text-indigo-600 font-bold text-sm">
                Criar perfil profissional <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'REGISTER_INSTRUCTOR') {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center bg-gray-50 p-4 animate-in fade-in slide-in-from-right-10 duration-500">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl border border-gray-100 relative">
          
          {/* Camera Overlay */}
          {isCameraOpen && (
            <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
              <div className="relative w-full max-w-lg aspect-[3/4] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                
                {/* Overlay Guide */}
                <div className="absolute inset-0 border-[40px] border-black/40 flex flex-col items-center justify-center">
                   <div className="w-64 h-40 border-2 border-dashed border-white/60 rounded-xl mb-4 flex items-center justify-center">
                     <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Enquadre sua CNH</p>
                   </div>
                   <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/60 flex items-center justify-center">
                      <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Seu Rosto</p>
                   </div>
                </div>

                <button 
                  onClick={stopCamera}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-md"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-8 flex gap-6">
                <button 
                  onClick={capturePhoto}
                  className="bg-white text-black p-6 rounded-full shadow-2xl active:scale-90 transition-transform"
                >
                  <Camera size={32} />
                </button>
              </div>
              <p className="text-white/60 text-xs mt-4">A selfie deve estar nítida para validação</p>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          <button onClick={() => setView('SELECT_ROLE')} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-gray-600 transition-colors">
            <ChevronLeft size={18} /> Voltar para seleção
          </button>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Perfil Profissional</h2>
            <p className="text-gray-500 text-sm">Preencha seus dados para começar a atender alunos.</p>
          </div>

          <form onSubmit={handleInstructorSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Informações Pessoais</h4>
                <div className="space-y-1">
                  <input 
                    type="text" 
                    placeholder="Nome Completo" 
                    className={`w-full px-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl outline-none focus:ring-2 focus:ring-blue-500`}
                    value={instructorData.name}
                    onChange={e => setInstructorData({...instructorData, name: e.target.value})}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10}/> {errors.name}</p>}
                </div>
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl outline-none focus:ring-2 focus:ring-blue-500`}
                  value={instructorData.email}
                  onChange={e => setInstructorData({...instructorData, email: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="WhatsApp (ex: 11999999999)" 
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl outline-none focus:ring-2 focus:ring-blue-500`}
                  value={instructorData.phone}
                  onChange={e => setInstructorData({...instructorData, phone: e.target.value})}
                />
              </div>

              {/* Dados do Veículo */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Dados do Veículo</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="Modelo (ex: Polo)" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                    value={instructorData.vehicleModel}
                    onChange={e => setInstructorData({...instructorData, vehicleModel: e.target.value})}
                  />
                  <input 
                    type="number" 
                    placeholder="Ano" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                    value={instructorData.vehicleYear}
                    onChange={e => setInstructorData({...instructorData, vehicleYear: e.target.value})}
                  />
                </div>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none appearance-none"
                  value={instructorData.transmission}
                  onChange={e => setInstructorData({...instructorData, transmission: e.target.value as TransmissionType})}
                >
                  <option value={TransmissionType.MANUAL}>Câmbio Manual</option>
                  <option value={TransmissionType.AUTOMATIC}>Câmbio Automático</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Endereço Base / Bairro" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  value={instructorData.baseAddress}
                  onChange={e => setInstructorData({...instructorData, baseAddress: e.target.value})}
                />
              </div>
            </div>

            {/* Categorias */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Categorias CNH que ministra</h4>
              <div className="flex flex-wrap gap-2">
                {Object.values(CnhCategory).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${instructorData.categories.includes(cat) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'}`}
                  >
                    Cat. {cat}
                  </button>
                ))}
              </div>
              {errors.categories && <p className="text-[10px] text-red-500 font-bold">{errors.categories}</p>}
            </div>

            {/* Upload de Documento / Camera */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Validação de Identidade</h4>
              
              {!instructorData.documentFile ? (
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex flex-col items-center justify-center p-4 border-2 border-dashed ${errors.documentFile ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors`}>
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Enviar Arquivo</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*,.pdf"
                      onChange={e => setInstructorData({...instructorData, documentFile: e.target.files ? e.target.files[0] : null})}
                    />
                  </label>
                  
                  <button
                    type="button"
                    onClick={startCamera}
                    className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                  >
                    <Camera className="w-6 h-6 text-indigo-500 mb-2" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Tirar Foto</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-green-800">Documento Capturado</p>
                      <p className="text-[10px] text-green-600 uppercase">{instructorData.documentFile.name}</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setInstructorData({...instructorData, documentFile: null})}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <RefreshCw size={18} />
                  </button>
                </div>
              )}
              {errors.documentFile && <p className="text-[10px] text-red-500 font-bold">{errors.documentFile}</p>}
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl text-amber-700 text-xs leading-relaxed border border-amber-100 flex gap-3">
              <AlertCircle size={20} className="shrink-0" />
              <p>
                <strong>Atenção:</strong> Seu perfil será analisado por nossa equipe de segurança. Você receberá uma notificação via WhatsApp assim que for aprovado para receber agendamentos.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Enviando Dados...' : 'Finalizar Cadastro Profissional'}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Cadastro de Aluno (Simplificado)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 animate-in fade-in slide-in-from-left-10 duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg border border-gray-100">
        <button onClick={() => setView('SELECT_ROLE')} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-gray-600">
          <ChevronLeft size={18} /> Voltar para seleção
        </button>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Criar conta de Aluno</h2>
          <p className="text-gray-500 text-sm">Encontre seu instrutor ideal em segundos.</p>
        </div>
        <form onSubmit={mockLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nome Completo</label>
            <input type="text" placeholder="Como quer ser chamado?" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">E-mail</label>
            <input type="email" placeholder="seu@email.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">WhatsApp</label>
            <input type="tel" placeholder="(11) 99999-9999" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 mt-4 transition-all active:scale-95 flex items-center justify-center"
          >
            {isLoading ? 'Processando...' : 'Finalizar Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthFlow;
