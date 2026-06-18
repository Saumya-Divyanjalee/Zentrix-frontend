import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CheckSquare, Clock, TrendingUp, FileText, Plus, ArrowRight, Zap, Flame } from 'lucide-react';
import { RootState } from '../../app/store';
import api from '../../api/axiosInstance';
import { DashboardStats, Task } from '../../types';
import MomentumRing from '../../components/ui/MomentumRing';

const StatCard = ({icon:Icon,label,value,sub,glow,delay}:any) => (
  <div className={`dark-card p-5 card-rise ${glow ? 'dark-glow-amber' : ''}`} style={{animationDelay:`${delay}ms`}}>
    <div className="flex items-center justify-between mb-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'rgba(255,255,255,0.06)'}}>
        <Icon size={16} className="text-violet-300" strokeWidth={2}/>
      </div>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 spark-dot"/>
    </div>
    <p className="milestone-number text-2xl text-white mb-0.5">{value}</p>
    <p className="font-mono text-[10px] text-white/40 tracking-wider uppercase">{label}</p>
    {sub && <p className="font-mono text-[10px] text-amber-300 mt-1 font-bold">{sub}</p>}
  </div>
);

const motivationalLine = (pct: number) => {
  if (pct >= 80) return "You're on fire — keep this momentum going.";
  if (pct >= 50) return "Solid progress. A few more and you'll be unstoppable.";
  if (pct >= 20) return "Every task you finish builds the habit. Keep moving.";
  return "Pick one task. Just one. Momentum starts there.";
};

export default function DashboardPage() {
  const { user } = useSelector((s: RootState) => s.auth);
  const [stats, setStats] = useState<DashboardStats|null>(null);
  const [loading, setLoading] = useState(true);
  const hour = new Date().getHours();
  const greeting = hour<12?'Good morning':hour<17?'Good afternoon':'Good evening';

  useEffect(() => {
    api.get('/dashboard/stats').then(r => setStats(r.data.data)).finally(() => setLoading(false));
  }, []);

  const pct = stats?.productivity ?? 0;

  // Calculate real-time completion rate safely for the MomentumRing component
  const calculatedCompletionRate = stats?.totalTasks && stats.totalTasks > 0 
    ? (stats.completedTasks / stats.totalTasks) * 100 
    : 0;

  if (loading) return (
    <div className="dark-surface -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8 min-h-[80vh]">
      <div className="loading-bar w-full mb-8"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_,i) => <div key={i} className="dark-card h-28 animate-pulse"/>)}
      </div>
    </div>
  );

  const priorityColor = (p:string) => p==='high'?'bg-red-400':p==='medium'?'bg-amber-400':'bg-emerald-400';

  return (
    <div className="dark-surface -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8 min-h-[80vh] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl ambient-blob" style={{background:'#6366f1'}}/>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl ambient-blob" style={{background:'#fbbf24', animationDelay:'4s'}}/>

      <div className="relative z-10 space-y-7">
        {/* Top Hero Banner */}
        <div className="dark-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 card-rise">
          <MomentumRing percentage={calculatedCompletionRate} size={64} strokeWidth={5} />
          <div className="flex-1 text-center sm:text-left">
            <p className="font-mono text-[11px] text-violet-300 tracking-widest uppercase mb-1">{greeting}, {user?.name?.split(' ')[0]} ✦</p>
            <h1 className="milestone-number text-2xl sm:text-3xl text-white mb-2">{motivationalLine(pct)}</h1>
            <p className="font-mono text-xs text-white/40">{stats?.completedTasks ?? 0} of {stats?.totalTasks ?? 0} tasks complete</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link to="/tasks" className="luxury-btn flex items-center gap-2 text-sm py-2.5 px-4">
              <Plus size={14}/> New Task
            </Link>
            <Link to="/ai" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs font-bold hover:bg-amber-400/20 transition-colors">
              <Zap size={14}/> AI
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={CheckSquare} label="Total Tasks" value={stats?.totalTasks??0} delay={0}/>
          <StatCard icon={TrendingUp} label="Completed" value={stats?.completedTasks??0} sub={`${pct}% rate`} glow delay={60}/>
          <StatCard icon={Clock} label="Pending" value={stats?.pendingTasks??0} delay={120}/>
          <StatCard icon={FileText} label="Notes" value={stats?.totalNotes??0} delay={180}/>
        </div>

        {/* Main Content Layout Block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Up Next List */}
          <div className="col-span-1 lg:col-span-2 dark-card p-6 card-rise" style={{animationDelay:'240ms'}}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-bungee text-base text-white">Up Next</h2>
                <p className="font-mono text-[10px] text-white/30 mt-0.5 tracking-wider">PENDING ITEMS</p>
              </div>
              <Link to="/tasks" className="flex items-center gap-1 font-mono text-xs text-violet-300 font-bold hover:text-violet-200 transition-colors">
                View all <ArrowRight size={12}/>
              </Link>
            </div>
            {!stats?.recentTasks?.length ? (
              <div className="text-center py-10 text-white/30">
                <CheckSquare size={32} className="mx-auto mb-2 opacity-40 empty-state-icon"/>
                <p className="font-mono text-xs">All caught up. Nice work. 🎉</p>
              </div>
            ) : (
              <div className="space-y-2">
                {stats.recentTasks.slice(0,5).map((t:Task) => (
                  <div key={t._id} className="flex items-center justify-between p-3 rounded-xl transition-colors group" style={{background:'rgba(255,255,255,0.03)'}}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityColor(t.priority)}`}/>
                      <div>
                        <p className="font-mono text-xs font-bold text-white">{t.title}</p>
                        {t.subject && <p className="font-mono text-[10px] text-white/30">{t.subject}</p>}
                      </div>
                    </div>
                    <span className={`badge badge-${t.priority}`}>{t.priority}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Breakdown Widget */}
          <div className="dark-card p-6 card-rise" style={{animationDelay:'300ms'}}>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={14} className="text-amber-400"/>
              <h2 className="font-bungee text-base text-white">Breakdown</h2>
            </div>
            <p className="font-mono text-[10px] text-white/30 mb-5 tracking-wider">WHERE THINGS STAND</p>
            <div className="space-y-3">
              {[
                {label:'Completed',val:stats?.completedTasks??0,color:'bg-emerald-400'},
                {label:'In Progress',val:stats?.inProgressTasks??0,color:'bg-violet-400'},
                {label:'Pending',val:stats?.pendingTasks??0,color:'bg-amber-400'},
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${s.color}`}/>
                    <span className="font-mono text-xs text-white/60">{s.label}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-white">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Footer Module */}
        <div className="dark-card p-6 card-rise" style={{animationDelay:'360ms'}}>
          <h2 className="font-bungee text-base text-white mb-1">Quick Actions</h2>
          <p className="font-mono text-[10px] text-white/30 mb-5 tracking-wider">FAST ACCESS</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {to:'/tasks',icon:CheckSquare,label:'Add Task'},
              {to:'/notes',icon:FileText,label:'New Note'},
              {to:'/ai',icon:Zap,label:'AI Tools'},
              {to:'/analytics',icon:TrendingUp,label:'Analytics'},
            ].map(a => (
              <Link key={a.to} to={a.to} className="group flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 border border-white/5 hover:border-violet-400/30" style={{background:'rgba(255,255,255,0.03)'}}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{background:'rgba(165,180,252,0.1)'}}>
                  <a.icon size={18} className="text-violet-300" strokeWidth={2}/>
                </div>
                <span className="font-mono text-[11px] font-bold text-white/60 group-hover:text-white transition-colors text-center">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}