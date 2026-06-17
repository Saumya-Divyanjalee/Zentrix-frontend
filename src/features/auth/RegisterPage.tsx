import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, User, Mail, Lock, ArrowRight, Check, Eye, EyeOff } from 'lucide-react';
import { registerUser, clearError } from './authSlice';
import { AppDispatch, RootState } from '../../app/store';

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, accessToken } = useSelector((s: RootState) => s.auth);
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' });
  const [vErr, setVErr] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => { if (accessToken) navigate('/dashboard'); }, [accessToken]);
  useEffect(() => () => { dispatch(clearError()); }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name||!form.email||!form.password) return setVErr('All fields are required');
    if (form.password.length < 6) return setVErr('Password min 6 characters');
    if (form.password !== form.confirm) return setVErr('Passwords do not match');
    dispatch(registerUser({name:form.name,email:form.email,password:form.password}));
  };

  const perks = ['AI note summarizer','Quiz generator','Smart study planner','Productivity analytics'];

  const fields = [
    { label:'Full Name', name:'name', type:'text', icon:User, ph:'Saumya Divyanjalee' },
    { label:'Email Address', name:'email', type:'email', icon:Mail, ph:'saumya.divyanjalee@example.com' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-4xl animate-slide-up">
        <div className="luxury-card overflow-hidden flex">
          <div className="hidden md:flex flex-col justify-center p-10 w-2/5 relative overflow-hidden" style={{background:'linear-gradient(145deg,#f0f4ff,#eef2ff)'}}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary-100 -translate-y-16 translate-x-16 opacity-60"/>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
                <GraduationCap size={22} color="white"/>
              </div>
              <h2 className="font-bungee text-xl text-zinc-900 mb-2">Join StudyFlow AI</h2>
              <p className="font-mono text-xs text-zinc-500 mb-8 leading-relaxed">Premium tools to accelerate your academic journey.</p>
              <div className="space-y-3">
                {perks.map((p,i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-primary-600" strokeWidth={3}/>
                    </div>
                    <span className="font-mono text-xs text-zinc-600">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 p-10">
            <h2 className="font-bungee text-2xl text-zinc-900 mb-1">Create Account</h2>
            <p className="font-mono text-xs text-zinc-400 mb-7 tracking-wide">Start your premium study journey</p>

            {(error||vErr) && (
              <div className="flex items-center gap-2 p-3 rounded-xl mb-5 bg-red-50 border border-red-100 animate-fade-in">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"/>
                <span className="font-mono text-xs text-red-600">{error||vErr}</span>
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
                    onChange={e => { setForm({...form, [f.name]: e.target.value}); setVErr(''); }}
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
                    onChange={e => { setForm({...form, password: e.target.value}); setVErr(''); }}
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
                    onChange={e => { setForm({...form, confirm: e.target.value}); setVErr(''); }}
                    placeholder="Repeat password" className="luxury-input pr-10" />
                  <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors">
                    {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="luxury-btn w-full flex items-center justify-center gap-2 mt-2">
                {isLoading
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Creating account...</>
                  : <>Create Account <ArrowRight size={14}/></>}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="font-mono text-xs text-zinc-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 font-bold hover:text-primary-700">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}