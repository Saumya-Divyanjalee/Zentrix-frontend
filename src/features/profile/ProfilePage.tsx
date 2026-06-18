import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, LogOut, Shield, Camera } from 'lucide-react';
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
    try { await api.put('/auth/profile',{name}); setNameMsg('Name updated successfully!'); }
    catch { setNameErr('Failed to update name'); }
  };

  const updatePw = async(e:React.FormEvent) => {
    e.preventDefault(); setPwErr(''); setPwMsg('');
    if(pw.new.length<6) return setPwErr('Password min 6 characters');
    if(pw.new!==pw.confirm) return setPwErr('Passwords do not match');
    try { await api.put('/auth/profile',{password:pw.new}); setPwMsg('Password updated!'); setPw({new:'',confirm:''}); }
    catch { setPwErr('Failed to update password'); }
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
      window.location.reload(); // simplest way to refresh avatar across app
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-xl">
      <div>
        <h1 className="font-bungee text-3xl text-zinc-900">Profile</h1>
        <p className="font-mono text-xs text-zinc-400 mt-1 tracking-wide">ACCOUNT SETTINGS</p>
      </div>

      {/* Avatar card */}
      <div className="luxury-card p-6 flex items-center gap-5">
        <div onClick={() => fileInputRef.current?.click()}
          className="relative w-16 h-16 rounded-2xl cursor-pointer group flex-shrink-0">
          {user?.avatar ? (
            <img src={user.avatar} className="w-16 h-16 rounded-2xl object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
              style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
              {user?.name?.charAt(0).toUpperCase()||'U'}
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera size={18} color="white" />
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
        </div>
        <div>
          <h2 className="font-bungee text-lg text-zinc-900">{user?.name}</h2>
          <p className="font-mono text-xs text-zinc-400 flex items-center gap-1.5 mt-1"><Mail size={11}/>{user?.email}</p>
          <span className="font-mono text-[10px] bg-primary-50 text-primary-700 border border-primary-200 px-2.5 py-1 rounded-full mt-2 inline-block font-bold uppercase tracking-wider">{user?.role||'student'}</span>
        </div>
      </div>

      {/* Update name */}
      <div className="luxury-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <User size={15} className="text-zinc-400"/>
          <h2 className="font-bungee text-base text-zinc-900">Update Name</h2>
        </div>
        {nameMsg&&<div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2.5 rounded-xl mb-4 font-mono text-xs">{nameMsg}</div>}
        {nameErr&&<div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2.5 rounded-xl mb-4 font-mono text-xs">{nameErr}</div>}
        <form onSubmit={updateName} className="flex gap-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" className="luxury-input flex-1"/>
          <button type="submit" className="luxury-btn px-5">Save</button>
        </form>
      </div>

      {/* Update password */}
      <div className="luxury-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Lock size={15} className="text-zinc-400"/>
          <h2 className="font-bungee text-base text-zinc-900">Change Password</h2>
        </div>
        {pwMsg&&<div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2.5 rounded-xl mb-4 font-mono text-xs">{pwMsg}</div>}
        {pwErr&&<div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2.5 rounded-xl mb-4 font-mono text-xs">{pwErr}</div>}
        <form onSubmit={updatePw} className="space-y-3">
          <div>
            <label className="luxury-label">New Password</label>
            <input type="password" value={pw.new} onChange={e=>setPw({...pw,new:e.target.value})} placeholder="Min 6 characters" className="luxury-input"/>
          </div>
          <div>
            <label className="luxury-label">Confirm Password</label>
            <input type="password" value={pw.confirm} onChange={e=>setPw({...pw,confirm:e.target.value})} placeholder="Repeat password" className="luxury-input"/>
          </div>
          <button type="submit" className="luxury-btn w-full">Update Password</button>
        </form>
      </div>

      {/* Security / Logout */}
      <div className="luxury-card p-6 border-red-100">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={15} className="text-red-400"/>
          <h2 className="font-bungee text-base text-zinc-900">Security</h2>
        </div>
        <p className="font-mono text-xs text-zinc-400 mb-4">Sign out from your account on this device.</p>
        <button onClick={()=>{dispatch(logout());navigate('/login');}}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-600 font-mono text-xs font-bold hover:bg-red-100 transition-colors">
          <LogOut size={13}/> Sign Out
        </button>
      </div>
    </div>
  );
}