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
    if (!form.name || !form.email || !form.password) return setVErr('All fields are required');
    if (form.password.length < 6) return setVErr('Password min 6 characters');
    if (form.password !== form.confirm) return setVErr('Passwords do not match');
    dispatch(registerUser({name:form.name, email:form.email, password:form.password}));
  };

  const perks = ['AI note summarizer', 'Quiz generator', 'Smart study planner', 'Productivity analytics'];

  const fields = [
    { label:'Full Name', name:'name', type:'text', icon:User, ph:'Saumya Divyanjalee' },
    { label:'Email Address', name:'email', type:'email', icon:Mail, ph:'saumya.divyanjalee@example.com' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090d16] px-4 py-12">
      <div className="w-full max-w-4xl card-rise">
        <div className="dark-card overflow-hidden flex flex-col md:flex-row border border-slate-800/80 shadow-2xl">
          {/* Left Feature Panel */}
          <div className="hidden md:flex flex-col justify-center p-10 w-2/5 relative overflow-hidden border-r border-slate-800/60" style={{background:'linear-gradient(145deg,#0b0e1a 0%,#121829 50%,#1a233d 100%)'}}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-500 blur-3xl animate-pulse"/>
            </div>
            
            <div className="relative z-10 space-y-2">
              <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/20">
                <GraduationCap size={22} color="white" strokeWidth={2.5}/>
              </div>
              <h2 className="font-bungee text-xl text-white tracking-wide mb-2">Join Zentrix</h2>
              <p className="font-mono text-xs font-bold text-slate-300 mb-8 leading-relaxed">Premium tools to accelerate your academic journey.</p>
              
              <div className="space-y-3.5 pt-2">
                {perks.map((p,i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                    <div className="w-5 h-5 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-400">
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-200 tracking-wide">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Interaction Form Panel */}
          <div className="flex-1 p-8 sm:p-10 bg-[#0d1321]">
            <h2 className="font-bungee text-2xl text-white tracking-wide mb-1">Create Account</h2>
            <p className="font-mono text-sm font-bold text-slate-400 mb-8 tracking-wide">Start your premium study journey</p>

            {(error || vErr) && (
              <div className="flex items-center gap-3 p-4 rounded-xl mb-6 bg-rose-500/10 border border-rose-500/20">
                <div className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0 animate-pulse"/>
                <span className="font-mono text-xs font-bold text-rose-300 leading-normal">{error || vErr}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              {fields.map(f => (
                <div key={f.name} className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">
                    <f.icon size={13} strokeWidth={2.2} className={focused === f.name ? 'text-indigo-400' : 'text-slate-500'} />
                    {f.label}
                  </label>
                  <input 
                    type={f.type} 
                    value={(form as any)[f.name]}
                    onFocus={() => setFocused(f.name)}
                    onBlur={() => setFocused(null)}
                    onChange={e => { setForm({...form, [f.name]: e.target.value}); setVErr(''); }}
                    placeholder={f.ph} 
                    className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 font-medium"
                    required
                  />
                </div>
              ))}

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
                    onChange={e => { setForm({...form, password: e.target.value}); setVErr(''); }}
                    placeholder="Min 6 characters" 
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

              <div className="space-y-2">
                <label className="flex items-center gap-2 font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">
                  <Lock size={13} strokeWidth={2.2} className={focused === 'confirm' ? 'text-indigo-400' : 'text-slate-500'} />
                  Confirm Password
                </label>
                <div className="relative">
                  <input 
                    type={showConfirmPw ? 'text' : 'password'} 
                    value={form.confirm}
                    onFocus={() => setFocused('confirm')}
                    onBlur={() => setFocused(null)}
                    onChange={e => { setForm({...form, confirm: e.target.value}); setVErr(''); }}
                    placeholder="Repeat password matrix" 
                    className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl pl-4 pr-11 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 font-medium"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1 rounded"
                  >
                    {showConfirmPw ? <EyeOff size={16} strokeWidth={2.2} /> : <Eye size={16} strokeWidth={2.2} />}
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
                    Creating Account Core...
                  </>
                ) : (
                  <>
                    Create Premium Account <ArrowRight size={16} strokeWidth={2.5}/>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center border-t border-slate-900 pt-5">
              <p className="font-mono text-xs font-bold text-slate-400">
                Already have active clearance?{' '}
                <Link to="/login" className="text-indigo-400 font-black hover:text-indigo-300 transition-colors ml-1">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}