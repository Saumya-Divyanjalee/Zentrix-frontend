import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CheckSquare, Clock, TrendingUp, FileText, Plus, ArrowRight, Zap, Flame } from 'lucide-react';
import { RootState } from '../../app/store';
import api from '../../api/axiosInstance';
import { DashboardStats, Task } from '../../types';
import MomentumRing from '../../components/ui/MomentumRing';

const StatCard = ({icon:Icon,label,value,sub,glow,delay}:any) => (
  <div className={`dark-card p-6 card-rise ${glow ? 'dark-glow-amber' : ''}`} style={{animationDelay:`${delay}ms`}}>
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'rgba(255,255,255,0.08)'}}>
        <Icon size={18} className="text-indigo-300" strokeWidth={2.5}/>
      </div>
      <span className="w-2 h-2 rounded-full bg-emerald-400 spark-dot"/>
    </div>
    <p className="milestone-number text-3xl font-bold text-white mb-1">{value}</p>
    <p className="font-mono text-xs font-bold text-slate-400 tracking-wider uppercase">{label}</p>
    {sub && <p className="font-mono text-xs text-amber-400 mt-1 font-bold">{sub}</p>}
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
    <div className="dark-surface w-full min-h-screen p-6 sm:p-8">
      <div className="loading-bar w-full mb-8"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_,i) => <div key={i} className="dark-card h-32 animate-pulse"/>)}
      </div>
    </div>
  );

  const priorityColor = (p:string) => p==='high'?'bg-red-400':p==='medium'?'bg-amber-400':'bg-emerald-400';

  return (
    <div className="dark-surface w-full min-h-screen p-2 sm:p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl ambient-blob" style={{background:'#6366f1'}}/>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl ambient-blob" style={{background:'#fbbf24', animationDelay:'4s'}}/>

      <div className="w-full space-y-7 relative z-10">
        {/* Top Hero Banner - Maximum Contrast Scaling */}
        <div className="dark-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 card-rise">
          <MomentumRing percentage={calculatedCompletionRate} size={72} strokeWidth={6} />
          <div className="flex-1 text-center sm:text-left space-y-1">
            <p className="font-mono text-xs font-bold text-indigo-300 tracking-widest uppercase">{greeting}, {user?.name?.split(' ')[0]} ✦</p>
            <h1 className="milestone-number text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{motivationalLine(pct)}</h1>
            <p className="font-mono text-sm font-medium text-slate-300">{stats?.completedTasks ?? 0} of {stats?.totalTasks ?? 0} tasks complete</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/tasks" className="luxury-btn flex items-center gap-2 text-sm py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-600/20">
              <Plus size={16} strokeWidth={2.5}/> New Task
            </Link>
            <Link to="/ai" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-300 font-mono text-xs font-bold hover:bg-amber-400/20 transition-all shadow-lg shadow-amber-400/5">
              <Zap size={16} fill="currentColor"/> AI Room
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard icon={CheckSquare} label="Total Tasks Index" value={stats?.totalTasks??0} delay={0}/>
          <StatCard icon={TrendingUp} label="Completed Segments" value={stats?.completedTasks??0} sub={`${pct}% rate`} glow delay={60}/>
          <StatCard icon={Clock} label="Pending Operations" value={stats?.pendingTasks??0} delay={120}/>
          <StatCard icon={FileText} label="Logged Notes" value={stats?.totalNotes??0} delay={180}/>
        </div>

        {/* Main Split Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Up Next List Terminal */}
          <div className="col-span-1 lg:col-span-2 dark-card p-6 card-rise" style={{animationDelay:'240ms'}}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bold text-lg text-white font-mono uppercase tracking-wide">Up Next Operations</h2>
                <p className="font-mono text-[10px] text-slate-400 tracking-wider">PENDING WORKFLOW QUEUE</p>
              </div>
              <Link to="/tasks" className="flex items-center gap-1 font-mono text-sm text-indigo-300 font-bold hover:text-indigo-200 transition-colors">
                View all <ArrowRight size={14} strokeWidth={2.5}/>
              </Link>
            </div>
            {!stats?.recentTasks?.length ? (
              <div className="text-center py-12 text-slate-500">
                <CheckSquare size={36} className="mx-auto mb-3 opacity-30 empty-state-icon"/>
                <p className="font-mono text-sm font-bold uppercase tracking-wider">All caught up. Excellent execution. ✦</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentTasks.slice(0,5).map((t:Task) => (
                  <div key={t._id} className="flex items-center justify-between p-4 rounded-xl transition-all hover:bg-white/5 border border-white/5" style={{background:'rgba(255,255,255,0.02)'}}>
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${priorityColor(t.priority)}`}/>
                      <div className="min-w-0">
                        <p className="font-mono text-sm font-bold text-slate-100 truncate">{t.title}</p>
                        {t.subject && <p className="font-mono text-xs text-slate-400 mt-1 font-semibold">{t.subject}</p>}
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/5 tracking-wider">{t.priority}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Breakdown Widget Module */}
          <div className="dark-card p-6 card-rise" style={{animationDelay:'300ms'}}>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={16} className="text-amber-400 animate-pulse"/>
              <h2 className="font-bold text-lg text-white font-mono uppercase tracking-wide">Metrics Breakdown</h2>
            </div>
            <p className="font-mono text-[10px] text-slate-400 mb-6 tracking-wider">REAL-TIME STATUS INDEX</p>
            <div className="space-y-4">
              {[
                {label:'Completed Tasks',val:stats?.completedTasks??0,color:'bg-emerald-400'},
                {label:'In Progress Status',val:stats?.inProgressTasks??0,color:'bg-indigo-400'},
                {label:'Pending Operations',val:stats?.pendingTasks??0,color:'bg-amber-400'},
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${s.color}`}/>
                    <span className="font-mono text-sm text-slate-300 font-semibold">{s.label}</span>
                  </div>
                  <span className="font-mono text-sm font-black text-white bg-white/5 border border-white/5 px-2.5 py-0.5 rounded">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Fast Access Terminal */}
        <div className="dark-card p-6 card-rise" style={{animationDelay:'360ms'}}>
          <h2 className="font-bold text-base text-white font-mono mb-1 uppercase tracking-wide">System Quick Actions</h2>
          <p className="font-mono text-[10px] text-slate-400 mb-5 tracking-wider">FAST ROUTING MANAGEMENT CORE</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {to:'/tasks',icon:CheckSquare,label:'Add Task'},
              {to:'/notes',icon:FileText,label:'New Note'},
              {to:'/ai',icon:Zap,label:'AI Tools'},
              {to:'/analytics',icon:TrendingUp,label:'Analytics'},
            ].map(a => (
              <Link key={a.to} to={a.to} className="group flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-200 border border-white/5 hover:border-indigo-500/40" style={{background:'rgba(255,255,255,0.02)'}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300" style={{background:'rgba(99,102,241,0.15)'}}>
                  <a.icon size={20} className="text-indigo-300" strokeWidth={2.2}/>
                </div>
                <span className="font-mono text-xs font-black text-slate-300 group-hover:text-white transition-colors text-center tracking-wide">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}