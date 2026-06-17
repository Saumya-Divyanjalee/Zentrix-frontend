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
  const doLogout = () => { dispatch(logout()); navigate('/login'); };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-zinc-100 flex flex-col z-30" style={{boxShadow:'4px 0 24px rgba(99,102,241,0.04)'}}>
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
            <GraduationCap size={18} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-bungee text-sm text-zinc-900 leading-none">StudyFlow</h1>
            <p className="font-mono text-[10px] text-zinc-400 mt-0.5 tracking-wider">AI PLATFORM</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="font-mono text-[10px] font-bold text-zinc-400 px-3 mb-2 tracking-widest uppercase">Menu</p>
        <div className="space-y-0.5">
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} className={({isActive}) => `sidebar-link ${isActive?'active':''}`}>
              <n.icon size={15} strokeWidth={2} />
              {n.label}
            </NavLink>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-zinc-100">
          <p className="font-mono text-[10px] font-bold text-zinc-400 px-3 mb-2 tracking-widest uppercase">Account</p>
          <NavLink to="/profile" className={({isActive}) => `sidebar-link ${isActive?'active':''}`}>
            <User size={15} strokeWidth={2} /> Profile
          </NavLink>
        </div>
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-zinc-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl mb-1 bg-zinc-50">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
            {user?.name?.charAt(0).toUpperCase()||'U'}
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <p className="font-mono text-xs font-bold text-zinc-800 truncate">{user?.name||'User'}</p>
            <p className="font-mono text-[10px] text-zinc-400 truncate">{user?.email||''}</p>
          </div>
        </div>
        <button onClick={doLogout} className="w-full sidebar-link text-red-500 hover:bg-red-50 hover:text-red-600 mt-1">
          <LogOut size={15} strokeWidth={2} /> Sign out
        </button>
      </div>
    </aside>
  );
}