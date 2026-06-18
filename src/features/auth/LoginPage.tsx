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
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-col justify-between w-5/12 p-12 relative overflow-hidden" style={{background:'linear-gradient(145deg,#1e1b4b 0%,#312e81 40%,#4f46e5 100%)'}}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl"/>
          <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-violet-300 blur-3xl"/>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <GraduationCap size={20} color="white" />
            </div>
            <h1 className="font-bungee text-white text-lg">Zentrix</h1>
          </div>
          <div className="mb-10">
            <h2 className="font-bungee text-4xl text-white leading-tight mb-4">
              Learn Smarter.<br/>
              <span className="text-violet-300">Achieve More.</span>
            </h2>
            <p className="font-mono text-white/60 text-sm leading-relaxed">
              The premium AI-powered platform for students who demand excellence.
            </p>
          </div>
          <div className="space-y-4">
            {features.map((f,i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <f.icon size={14} color="white" />
                </div>
                <span className="font-mono text-white/70 text-xs">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <div className="divider mb-4 opacity-20"/>
          <p className="font-mono text-white/40 text-xs">© 2026 Zentrix — Premium Edition</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-sm animate-slide-up">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
              <GraduationCap size={16} color="white"/>
            </div>
            <h1 className="font-bungee text-zinc-900">Zentrix</h1>
          </div>

          <h2 className="text-2xl font-bungee text-zinc-900 mb-1">Welcome back</h2>
          <p className="font-mono text-xs text-zinc-400 mb-8 tracking-wide">Sign in to your premium account</p>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl mb-5 bg-red-50 border border-red-100 animate-fade-in">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"/>
              <span className="font-mono text-xs text-red-600">{error}</span>
            </div>
          )}

          <form onSubmit={e => { e.preventDefault(); dispatch(loginUser(form)); }} className="space-y-5">
            <div>
              <label className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                <Mail size={12} className={focused === 'email' ? 'text-primary-500' : 'text-zinc-400'} />
                Email Address
              </label>
              <input type="email" value={form.email}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                onChange={e => setForm({...form, email: e.target.value})}
                placeholder="saumya.divyanjalee@example.com"
                className="luxury-input" />
            </div>

            <div>
              <label className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                <Lock size={12} className={focused === 'password' ? 'text-primary-500' : 'text-zinc-400'} />
                Password
              </label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  onChange={e => setForm({...form, password: e.target.value})}
                  placeholder="••••••••"
                  className="luxury-input pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="luxury-btn w-full flex items-center justify-center gap-2 mt-2">
              {isLoading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Signing in...</>
              ) : (<>Sign In <ArrowRight size={14}/></>)}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-mono text-xs text-zinc-400">
              No account?{' '}
              <Link to="/register" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}