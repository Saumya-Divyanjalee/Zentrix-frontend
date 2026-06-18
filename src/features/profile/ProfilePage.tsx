import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, LogOut, Shield, Camera, RefreshCw, KeyRound, UserCheck } from 'lucide-react';
import { RootState, AppDispatch } from '../../app/store';
import { logout } from '../auth/authSlice';
import api from '../../api/axiosInstance';

export default function ProfilePage() {
  const { user } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name||'');
  const [pw, setPw] = useState({new:'',confirm:''});
  const [nameMsg, setNameMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [pwErr, setPwErr] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const updateName = async(e:React.FormEvent) => {
    e.preventDefault(); setNameErr(''); setNameMsg('');
    try { 
      await api.put('/auth/profile',{name}); 
      setNameMsg('Profile identity synchronized successfully.'); 
    }
    catch { setNameErr('Failed to compile profile name update.'); }
  };

  const updatePw = async(e:React.FormEvent) => {
    e.preventDefault(); setPwErr(''); setPwMsg('');
    if(pw.new.length<6) return setPwErr('Password matrix requires minimum 6 tokens.');
    if(pw.new!==pw.confirm) return setPwErr('Security keys do not match.');
    try { 
      await api.put('/auth/profile',{password:pw.new}); 
      setPwMsg('Security access matrix updated.'); 
      setPw({new:'',confirm:''}); 
    }
    catch { setPwErr('Failed to rewrite security key loop.'); }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      await api.post('/auth/upload-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      window.location.reload(); 
    } catch (error) {
      console.error('Avatar cluster upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="dark-surface w-full min-h-screen p-2 sm:p-4 space-y-7 relative overflow-hidden max-w-2xl card-rise">
      {/* Profile Header Navigation */}
      <div className="border-b border-slate-800/80 pb-5">
        <h1 className="font-bungee text-2xl sm:text-3xl text-white tracking-wide">ACCOUNT IDENTITY CONSOLE</h1>
        <p className="font-mono text-sm text-slate-300">Manage your system clearance configuration parameters.</p>
      </div>

      {/* Avatar Node Info Module Card */}
      <div className="dark-card p-6 flex flex-col sm:flex-row items-center gap-6">
        <div 
          onClick={() => !uploading && fileInputRef.current?.click()}
          className="relative w-20 h-20 rounded-2xl cursor-pointer group flex-shrink-0 border-2 border-slate-800 bg-slate-950 overflow-hidden shadow-xl"
        >
          {user?.avatar ? (
            <img src={user.avatar} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-black text-white"
              style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
              {user?.name?.charAt(0).toUpperCase()||'U'}
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {uploading ? <RefreshCw size={20} className="text-white animate-spin" /> : <Camera size={20} className="text-white" />}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" disabled={uploading} />
        </div>
        
        <div className="text-center sm:text-left space-y-1">
          <h2 className="font-mono text-lg font-black text-white tracking-wide uppercase">{user?.name}</h2>
          <p className="font-mono text-sm font-bold text-slate-400 flex items-center justify-center sm:justify-start gap-2">
            <Mail size={13} className="text-slate-500"/> {user?.email}
          </p>
          <span className="font-mono text-[10px] font-black bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-lg mt-2 inline-block uppercase tracking-widest">
            Access Clearance: {user?.role||'Student'}
          </span>
        </div>
      </div>

      {/* Update Identity Name Panel */}
      <div className="dark-card p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <User size={16} className="text-indigo-400" strokeWidth={2.5}/>
          <div>
            <h2 className="font-mono text-base font-bold text-white uppercase tracking-wide">Update Identity Name</h2>
            <p className="font-mono text-[10px] text-slate-400 tracking-wider">REWRITE PUBLIC ACCESS STRING</p>
          </div>
        </div>
        
        {nameMsg&&<div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl mb-4 font-mono text-xs font-bold">{nameMsg}</div>}
        {nameErr&&<div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl mb-4 font-mono text-xs font-bold">{nameErr}</div>}
        
        <form onSubmit={updateName} className="flex flex-col sm:flex-row gap-3">
          <input 
            value={name} 
            onChange={e=>setName(e.target.value)} 
            placeholder="Modify configuration identity..." 
            className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 font-medium"
            required
          />
          <button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md shadow-indigo-600/10 shrink-0"
          >
            Commit Name
          </button>
        </form>
      </div>

      {/* Update Password Matrix Panel */}
      <div className="dark-card p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <KeyRound size={16} className="text-indigo-400" strokeWidth={2.5}/>
          <div>
            <h2 className="font-mono text-base font-bold text-white uppercase tracking-wide">Rewrite Key Matrix</h2>
            <p className="font-mono text-[10px] text-slate-400 tracking-wider">OVERWRITE CURRENT ACCESS PASSWORD</p>
          </div>
        </div>
        
        {pwMsg&&<div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl mb-4 font-mono text-xs font-bold">{pwMsg}</div>}
        {pwErr&&<div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl mb-4 font-mono text-xs font-bold">{pwErr}</div>}
        
        <form onSubmit={updatePw} className="space-y-4">
          <div className="space-y-2">
            <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">New Password Token</label>
            <input 
              type="password" 
              value={pw.new} 
              onChange={e=>setPw({...pw,new:e.target.value})} 
              placeholder="Minimum 6 security tokens" 
              className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">Confirm Password Verification</label>
            <input 
              type="password" 
              value={pw.confirm} 
              onChange={e=>setPw({...pw,confirm:e.target.value})} 
              placeholder="Verify security tokens explicitly" 
              className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-black text-sm uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-xl shadow-indigo-600/20 pt-1"
          >
            Execute Key Overwrite
          </button>
        </form>
      </div>

      {/* Security Terminal Node Dismissal Panel */}
      <div className="dark-card p-6 border-rose-500/20 bg-rose-500/[0.01]">
        <div className="flex items-center gap-2.5 mb-4">
          <Shield size={16} className="text-rose-400" strokeWidth={2.5}/>
          <div>
            <h2 className="font-mono text-base font-bold text-white uppercase tracking-wide">Security Termination</h2>
            <p className="font-mono text-[10px] text-slate-400 tracking-wider">CONSOLE ACCESS TERMINAL</p>
          </div>
        </div>
        <p className="font-mono text-xs font-bold text-slate-400 mb-5 leading-relaxed">Terminating this session will completely disconnect token credentials from this client node.</p>
        <button 
          onClick={() => { dispatch(logout()); navigate('/login'); }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-500/10 border-2 border-rose-500/20 text-rose-400 font-mono text-xs font-black uppercase tracking-wider hover:bg-rose-500/20 transition-all shadow-lg"
        >
          <LogOut size={14} strokeWidth={2.5}/> Terminate Console Session
        </button>
      </div>
    </div>
  );
}