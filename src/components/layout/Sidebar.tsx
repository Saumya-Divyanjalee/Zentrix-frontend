import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard, CheckSquare, FileText, Calendar, BarChart3,
  Sparkles, History, User, LogOut, GraduationCap
} from 'lucide-react';
import { logout } from '../../features/auth/authSlice';
import { AppDispatch, RootState } from '../../app/store';

const nav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/notes', icon: FileText, label: 'Notes' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/ai', icon: Sparkles, label: 'AI Assistant' },
  { to: '/ai-history', icon: History, label: 'AI History' },
];

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((s: RootState) => s.auth);
  
  const doLogout = () => { 
    dispatch(logout()); 
    navigate('/login'); 
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#0d1321] border-r border-slate-800/80 flex flex-col z-30 shadow-2xl">
      {/* Brand Header Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
            <GraduationCap size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-bungee text-base text-white tracking-wide leading-none">Zentrix</h1>            
            <p className="font-mono text-[10px] text-slate-400 mt-1 font-bold tracking-widest">AI PLATFORM</p>
          </div>
        </div>
      </div>

      {/* Navigation Space Links */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto space-y-4">
        <div>
          <p className="font-mono text-[10px] font-black text-indigo-300 px-3 mb-2.5 tracking-widest uppercase">Menu System</p>
          <div className="space-y-1">
            {nav.map(n => (
              <NavLink 
                key={n.to} 
                to={n.to} 
                className={({isActive}) => `
                  flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15 font-bold' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }
                `}
              >
                <n.icon size={17} strokeWidth={2.2} />
                {n.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/60">
          <p className="font-mono text-[10px] font-black text-indigo-300 px-3 mb-2.5 tracking-widest uppercase">Account Core</p>
          <NavLink 
            to="/profile" 
            className={({isActive}) => `
              flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
              ${isActive 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15 font-bold' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }
            `}
          >
            <User size={17} strokeWidth={2.2} /> Profile Info
          </NavLink>
        </div>
      </nav>

      {/* High Contrast User Footer Module */}
      <div className="px-3 py-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2 border border-slate-800/60" style={{background:'rgba(255,255,255,0.02)'}}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 shadow-md" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
            {user?.name?.charAt(0).toUpperCase()||'U'}
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <p className="font-mono text-xs font-bold text-slate-100 truncate">{user?.name||'User ID'}</p>
            <p className="font-mono text-[10px] text-slate-400 truncate mt-0.5">{user?.email||''}</p>
          </div>
        </div>
        
        <button 
          onClick={doLogout} 
          className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-150"
        >
          <LogOut size={17} strokeWidth={2.2} /> Sign Out System
        </button>
      </div>
    </aside>
  );
}