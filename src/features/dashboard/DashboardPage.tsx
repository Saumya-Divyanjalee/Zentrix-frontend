import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CheckSquare, Clock, TrendingUp, FileText, Plus, ArrowRight, Zap } from 'lucide-react';
import { RootState } from '../../app/store';
import api from '../../api/axiosInstance';
import { DashboardStats, Task } from '../../types';

const StatCard = ({icon:Icon,label,value,sub,color,bg}:any) => (
  <div className="luxury-card p-6 animate-slide-up">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg}`}>
        <Icon size={18} className={color} strokeWidth={2}/>
      </div>
      <span className="font-mono text-xs text-zinc-300 bg-zinc-50 px-2 py-1 rounded-lg">LIVE</span>
    </div>
    <p className="font-bungee text-3xl text-zinc-900 mb-1">{value}</p>
    <p className="font-mono text-xs text-zinc-500 tracking-wide uppercase">{label}</p>
    {sub && <p className="font-mono text-xs text-primary-500 mt-1 font-bold">{sub}</p>}
  </div>
);

export default function DashboardPage() {
  const { user } = useSelector((s: RootState) => s.auth);
  const [stats, setStats] = useState<DashboardStats|null>(null);
  const [loading, setLoading] = useState(true);
  const hour = new Date().getHours();
  const greeting = hour<12?'Good Morning':hour<17?'Good Afternoon':'Good Evening';

  useEffect(() => {
    api.get('/dashboard/stats').then(r => setStats(r.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-6">
      <div className="loading-bar w-full mb-8"/>
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_,i) => <div key={i} className="luxury-card h-32 animate-pulse bg-zinc-50"/>)}
      </div>
    </div>
  );

  const priorityColor = (p:string) => p==='high'?'bg-red-500':p==='medium'?'bg-amber-500':'bg-emerald-500';

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-xs text-zinc-400 tracking-widest uppercase mb-1">{greeting}</p>
          <h1 className="font-bungee text-3xl text-zinc-900">{user?.name?.split(' ')[0]} 👋</h1>
          <p className="font-mono text-xs text-zinc-400 mt-1">Here's your study overview</p>
        </div>
        <div className="flex gap-2">
          <Link to="/tasks" className="luxury-btn flex items-center gap-2 text-sm py-2.5 px-4">
            <Plus size={14}/> New Task
          </Link>
          <Link to="/ai" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary-200 bg-primary-50 text-primary-700 font-mono text-xs font-bold hover:bg-primary-100 transition-colors">
            <Zap size={14}/> AI Assistant
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CheckSquare} label="Total Tasks" value={stats?.totalTasks??0} color="text-primary-600" bg="bg-primary-50"/>
        <StatCard icon={TrendingUp} label="Completed" value={stats?.completedTasks??0} sub={`${stats?.productivity??0}% rate`} color="text-emerald-600" bg="bg-emerald-50"/>
        <StatCard icon={Clock} label="Pending" value={stats?.pendingTasks??0} color="text-amber-600" bg="bg-amber-50"/>
        <StatCard icon={FileText} label="Notes" value={stats?.totalNotes??0} color="text-violet-600" bg="bg-violet-50"/>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent tasks */}
        <div className="col-span-2 luxury-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bungee text-base text-zinc-900">Upcoming Tasks</h2>
              <p className="font-mono text-[10px] text-zinc-400 mt-0.5 tracking-wider">PENDING ITEMS</p>
            </div>
            <Link to="/tasks" className="flex items-center gap-1 font-mono text-xs text-primary-600 font-bold hover:text-primary-700 transition-colors">
              View all <ArrowRight size={12}/>
            </Link>
          </div>
          {!stats?.recentTasks?.length ? (
            <div className="text-center py-10 text-zinc-300">
              <CheckSquare size={32} className="mx-auto mb-2 opacity-30"/>
              <p className="font-mono text-xs">All caught up! 🎉</p>
            </div>
          ) : (
            <div className="space-y-2">
              {stats.recentTasks.slice(0,5).map((t:Task) => (
                <div key={t._id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-primary-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityColor(t.priority)}`}/>
                    <div>
                      <p className="font-mono text-xs font-bold text-zinc-800">{t.title}</p>
                      {t.subject && <p className="font-mono text-[10px] text-zinc-400">{t.subject}</p>}
                    </div>
                  </div>
                  <span className={`badge badge-${t.priority}`}>{t.priority}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Productivity */}
        <div className="luxury-card p-6">
          <h2 className="font-bungee text-base text-zinc-900 mb-1">Productivity</h2>
          <p className="font-mono text-[10px] text-zinc-400 mb-5 tracking-wider">OVERALL SCORE</p>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#f4f4f5" strokeWidth="10"/>
                <circle cx="60" cy="60" r="50" fill="none" strokeWidth="10"
                  stroke="url(#pg)" strokeLinecap="round"
                  strokeDasharray={`${(stats?.productivity??0)*3.14} 314`}/>
                <defs>
                  <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bungee text-2xl text-zinc-900">{stats?.productivity??0}%</span>
                <span className="font-mono text-[10px] text-zinc-400 tracking-wider">SCORE</span>
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              {label:'Completed',val:stats?.completedTasks??0,color:'bg-emerald-400'},
              {label:'In Progress',val:stats?.inProgressTasks??0,color:'bg-violet-400'},
              {label:'Pending',val:stats?.pendingTasks??0,color:'bg-amber-400'},
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${s.color}`}/>
                  <span className="font-mono text-xs text-zinc-500">{s.label}</span>
                </div>
                <span className="font-mono text-xs font-bold text-zinc-800">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="luxury-card p-6">
        <h2 className="font-bungee text-base text-zinc-900 mb-1">Quick Actions</h2>
        <p className="font-mono text-[10px] text-zinc-400 mb-5 tracking-wider">FAST ACCESS</p>
        <div className="grid grid-cols-4 gap-3">
          {[
            {to:'/tasks',icon:CheckSquare,label:'Add Task',color:'text-primary-600',bg:'bg-primary-50'},
            {to:'/notes',icon:FileText,label:'New Note',color:'text-violet-600',bg:'bg-violet-50'},
            {to:'/ai',icon:Zap,label:'AI Tools',color:'text-amber-600',bg:'bg-amber-50'},
            {to:'/analytics',icon:TrendingUp,label:'Analytics',color:'text-emerald-600',bg:'bg-emerald-50'},
          ].map(a => (
            <Link key={a.to} to={a.to} className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-zinc-50 hover:bg-white hover:shadow-luxury transition-all duration-200 border border-transparent hover:border-zinc-200">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${a.bg} group-hover:scale-110 transition-transform`}>
                <a.icon size={18} className={a.color} strokeWidth={2}/>
              </div>
              <span className="font-mono text-[11px] font-bold text-zinc-600 group-hover:text-zinc-900 transition-colors text-center">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
