import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, User, Mail, Lock, ArrowRight, Check, Eye, EyeOff } from 'lucide-react';
import { registerUser, clearError } from './authSlice';
import { AppDispatch, RootState } from '../../app/store';
import AuthIllustration from '../../components/ui/AuthIllustration';

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, accessToken } = useSelector((s: RootState) => s.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [vErr, setVErr] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => { if (accessToken) navigate('/dashboard'); }, [accessToken]);
  useEffect(() => () => { dispatch(clearError()); }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return setVErr('All fields are required');
    if (form.password.length < 6) return setVErr('Password min 6 characters');
    if (form.password !== form.confirm) return setVErr('Passwords do not match');
    dispatch(registerUser({ name: form.name, email: form.email, password: form.password }));
  };

  const perks = ['AI note summarizer', 'Quiz generator', 'Smart study planner', 'Productivity analytics'];

  const fields = [
    { label: 'Full Name', name: 'name', type: 'text', icon: User, ph: 'Saumya Divyanjalee' },
    { label: 'Email Address', name: 'email', type: 'email', icon: Mail, ph: 'saumya.divyanjalee@example.com' },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: 'linear-gradient(145deg,#1e1b4b 0%,#312e81 45%,#4f46e5 100%)' }}>
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ background: '#a78bfa' }} />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-15" style={{ background: '#6366f1' }} />

      <div className="hidden lg:flex flex-col w-6/12 px-16 py-12 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/10">
            <GraduationCap size={22} color="white" />
          </div>
          <h1 className="font-bungee text-white text-lg">Zentrix</h1>
        </div>

        <h2 className="font-bungee text-4xl text-white leading-tight mb-3">
          Join Students<br/>
          <span style={{ color: '#c4b5fd' }}>Achieving More.</span>
        </h2>
        <p className="font-mono text-white/60 text-sm leading-relaxed max-w-sm mb-10">
          Premium tools to accelerate your academic journey.
        </p>

        <div className="flex-1 flex items-center justify-center -mt-4">
          <div className="max-w-md w-full">
            <AuthIllustration />
          </div>
        </div>

        <p className="font-mono text-white/30 text-xs">© 2026 Zentrix — Premium Edition</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10 relative z-10">
        <div className="w-full max-w-sm rounded-3xl p-9 backdrop-blur-xl border border-white/20 animate-slide-up"
          style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 24px 70px rgba(0,0,0,0.35)' }}>

          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <GraduationCap size={17} color="white" />
            </div>
            <h1 className="font-bungee text-zinc-900">Zentrix</h1>
          </div>

          <h2 className="font-bungee text-2xl text-zinc-900 mb-1">Create Account</h2>
          <p className="font-mono text-xs text-zinc-400 mb-6 tracking-wide">Start your premium study journey</p>

          <div className="hidden md:flex flex-wrap gap-2 mb-6">
            {perks.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary-50 border border-primary-100">
                <Check size={10} className="text-primary-600" strokeWidth={3} />
                <span className="font-mono text-[10px] text-primary-700">{p}</span>
              </div>
            ))}
          </div>

          {(error || vErr) && (
            <div className="flex items-center gap-2 p-3 rounded-xl mb-5 bg-red-50 border border-red-100 animate-fade-in">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <span className="font-mono text-xs text-red-600">{error || vErr}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {fields.map(f => (
              <div key={f.name}>
                <label className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  <f.icon size={12} className={focused === f.name ? 'text-primary-500' : 'text-zinc-400'} />
                  {f.label}
                </label>
                <input type={f.type} value={(form as any)[f.name]}
                  onFocus={() => setFocused(f.name)}
                  onBlur={() => setFocused(null)}
                  onChange={e => { setForm({ ...form, [f.name]: e.target.value }); setVErr(''); }}
                  placeholder={f.ph} className="luxury-input" />
              </div>
            ))}

            <div>
              <label className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                <Lock size={12} className={focused === 'password' ? 'text-primary-500' : 'text-zinc-400'} />
                Password
              </label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  onChange={e => { setForm({ ...form, password: e.target.value }); setVErr(''); }}
                  placeholder="Min 6 characters" className="luxury-input pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                <Lock size={12} className={focused === 'confirm' ? 'text-primary-500' : 'text-zinc-400'} />
                Confirm Password
              </label>
              <div className="relative">
                <input type={showConfirmPw ? 'text' : 'password'} value={form.confirm}
                  onFocus={() => setFocused('confirm')}
                  onBlur={() => setFocused(null)}
                  onChange={e => { setForm({ ...form, confirm: e.target.value }); setVErr(''); }}
                  placeholder="Repeat password" className="luxury-input pr-10" />
                <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors">
                  {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="luxury-btn w-full flex items-center justify-center gap-2 mt-2">
              {isLoading
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</>
                : <>Create Account <ArrowRight size={14} /></>}
            </button>
          </form>

          <p className="text-center text-zinc-400 font-mono text-xs mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-bold hover:text-primary-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}