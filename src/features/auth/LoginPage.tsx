import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, Sparkles, CheckSquare, BarChart3, FileText, Eye, EyeOff } from 'lucide-react';
import { loginUser, clearError } from './authSlice';
import { AppDispatch, RootState } from '../../app/store';

const features = [
  { icon: CheckSquare, text: 'Smart task management with priorities' },
  { icon: FileText, text: 'AI-powered note summarization' },
  { icon: BarChart3, text: 'Productivity analytics & insights' },
  { icon: Sparkles, text: 'Gemini AI study planner & quiz generator' },
];

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, accessToken } = useSelector((s: RootState) => s.auth);
  const [form, setForm] = useState({ email:'', password:'' });
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => { if (accessToken) navigate('/dashboard'); }, [accessToken]);
  useEffect(() => () => { dispatch(clearError()); }, []);

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left Feature Panel - Unified Brand Theme */}
      <div className="hidden lg:flex flex-col justify-between w-5/12 p-12 relative overflow-hidden border-r border-slate-800/60" style={{background:'linear-gradient(145deg,#0b0e1a 0%,#121829 50%,#1a233d 100%)'}}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-indigo-500 blur-3xl ambient-blob"/>
          <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-purple-500 blur-3xl ambient-blob" style={{animationDelay:'3s'}}/>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <GraduationCap size={20} color="white" strokeWidth={2.5} />
            </div>
            <h1 className="font-bungee text-white text-xl tracking-wide">Zentrix</h1>
          </div>
          
          <div className="mb-12">
            <h2 className="font-bungee text-4xl text-white leading-tight mb-4 tracking-wide">
              Learn Smarter.<br/>
              <span className="text-indigo-400">Achieve More.</span>
            </h2>
            <p className="font-mono text-slate-300 text-sm leading-relaxed font-bold">
              The premium AI-powered platform for students who demand absolute execution excellence.
            </p>
          </div>
          
          <div className="space-y-4 pt-2">
            {features.map((f,i) => (
              <div key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-3.5 rounded-xl backdrop-blur-sm">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400">
                  <f.icon size={16} strokeWidth={2.2} />
                </div>
                <span className="font-mono text-slate-200 text-xs font-bold tracking-wide">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="w-full h-[1px] bg-slate-800/80 mb-4"/>
          <p className="font-mono text-slate-400 text-xs font-bold">© 2026 Zentrix — Premium Edition Core</p>
        </div>
      </div>

      {/* Right Interaction Form Panel - Max High Contrast */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-[#090d16]">
        <div className="w-full max-w-sm card-rise">
          {/* Mobile Only Header Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
              <GraduationCap size={18} color="white" strokeWidth={2.5}/>
            </div>
            <h1 className="font-bungee text-white text-lg tracking-wide">Zentrix</h1>
          </div>

          <h2 className="text-2xl font-bungee text-white tracking-wide mb-1">Welcome back</h2>
          <p className="font-mono text-sm font-bold text-slate-400 mb-8 tracking-wide">Sign in to your platform console</p>

          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl mb-6 bg-rose-500/10 border border-rose-500/20">
              <div className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0 animate-pulse"/>
              <span className="font-mono text-xs font-bold text-rose-300 leading-normal">{error}</span>
            </div>
          )}

          <form onSubmit={e => { e.preventDefault(); dispatch(loginUser(form)); }} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">
                <Mail size={13} strokeWidth={2.2} className={focused === 'email' ? 'text-indigo-400' : 'text-slate-500'} />
                Email Address
              </label>
              <input 
                type="email" 
                value={form.email}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                onChange={e => setForm({...form, email: e.target.value})}
                placeholder="saumya.divyanjalee@example.com"
                className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 font-medium" 
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">
                <Lock size={13} strokeWidth={2.2} className={focused === 'password' ? 'text-indigo-400' : 'text-slate-500'} />
                Password Matrix
              </label>
              <div className="relative">
                <input 
                  type={showPw ? 'text' : 'password'} 
                  value={form.password}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  onChange={e => setForm({...form, password: e.target.value})}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl pl-4 pr-11 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 font-medium" 
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1 rounded"
                >
                  {showPw ? <EyeOff size={16} strokeWidth={2.2} /> : <Eye size={16} strokeWidth={2.2} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-indigo-600 hover:bg-indigo-500 font-mono font-black text-sm text-white py-4 px-4 rounded-xl uppercase tracking-wider transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none mt-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Authenticating Core...
                </>
              ) : (
                <>
                  Access Console <ArrowRight size={16} strokeWidth={2.5}/>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-900 pt-5">
            <p className="font-mono text-xs font-bold text-slate-400">
              No active clearance?{' '}
              <Link to="/register" className="text-indigo-400 font-black hover:text-indigo-300 transition-colors ml-1">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}