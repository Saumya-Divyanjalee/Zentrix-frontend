import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, CheckSquare, BarChart3, FileText, Sparkles, Eye, EyeOff } from 'lucide-react';
import { loginUser, clearError } from './authSlice';
import { AppDispatch, RootState } from '../../app/store';
import AuthIllustration from '../../components/ui/AuthIllustration';

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
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => { if (accessToken) navigate('/dashboard'); }, [accessToken]);
  useEffect(() => () => { dispatch(clearError()); }, []);

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: 'linear-gradient(145deg,#1e1b4b 0%,#312e81 45%,#4f46e5 100%)' }}>
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ background: '#a78bfa' }} />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-15" style={{ background: '#6366f1' }} />

      <div className="hidden lg:flex flex-col w-7/12 px-16 py-12 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/10">
            <GraduationCap size={22} color="white" />
          </div>
          <h1 className="font-bungee text-white text-lg">Zentrix</h1>
        </div>

        <h2 className="font-bungee text-4xl text-white leading-tight mb-3">
          Learn Smarter.<br/>
          <span style={{ color: '#c4b5fd' }}>Achieve More.</span>
        </h2>
        <p className="font-mono text-white/60 text-sm leading-relaxed max-w-sm mb-8">
          The premium AI-powered platform for students who demand excellence.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <f.icon size={13} color="white" />
              </div>
              <span className="font-mono text-white/70 text-[11px] leading-tight">{f.text}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center -mt-4">
          <div className="max-w-md w-full">
            <AuthIllustration />
          </div>
        </div>

        <p className="font-mono text-white/30 text-xs">© 2026 Zentrix — Premium Edition</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-sm rounded-3xl p-9 backdrop-blur-xl border border-white/20 animate-slide-up"
          style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 24px 70px rgba(0,0,0,0.35)' }}>

          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <GraduationCap size={17} color="white" />
            </div>
            <h1 className="font-bungee text-zinc-900">Zentrix</h1>
          </div>

          <h2 className="font-bungee text-2xl text-zinc-900 mb-1">Welcome back</h2>
          <p className="font-mono text-xs text-zinc-400 mb-7 tracking-wide">Sign in to your premium account</p>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl mb-5 bg-red-50 border border-red-100 animate-fade-in">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <span className="font-mono text-xs text-red-600">{error}</span>
            </div>
          )}

          <form onSubmit={e => { e.preventDefault(); dispatch(loginUser(form)); }} className="space-y-4">
            <div>
              <label className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                <Mail size={12} className={focused === 'email' ? 'text-primary-500' : 'text-zinc-400'} />
                Email Address
              </label>
              <input type="email" value={form.email}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                onChange={e => setForm({ ...form, email: e.target.value })}
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
                  onChange={e => setForm({ ...form, password: e.target.value })}
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
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
              ) : (<>Sign In <ArrowRight size={14} /></>)}
            </button>
          </form>

          <p className="text-center text-zinc-400 font-mono text-xs mt-6">
            No account?{' '}
            <Link to="/register" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}