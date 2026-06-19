import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Sparkles } from 'lucide-react';
import api from '../../api/axiosInstance';
import { DashboardStats } from '../../types';
import MomentumRing from '../../components/ui/MomentumRing';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats|null>(null);
  useEffect(()=>{ api.get('/dashboard/stats').then(r=>setStats(r.data.data)).catch(()=>{}); },[]);

  const pct = stats?.productivity ?? 0;

  const bar = [
    {name:'Done',value:stats?.completedTasks??0,fill:'#6366f1'},
    {name:'Progress',value:stats?.inProgressTasks??0,fill:'#8b5cf6'},
    {name:'Pending',value:stats?.pendingTasks??0,fill:'#a1a1aa'},
  ];
  const pie = [
    {name:'Completed',value:stats?.completedTasks??0},
    {name:'Pending',value:stats?.pendingTasks??0},
    {name:'In Progress',value:stats?.inProgressTasks??0},
  ];
  const COLORS = ['#6366f1','#f59e0b','#8b5cf6'];

  const CustomTooltip = ({active,payload,label}:any) => active&&payload?.length ? (
    <div className="bg-white border border-zinc-200 rounded-xl p-3 shadow-luxury">
      <p className="font-bungee text-xs text-zinc-900 mb-1">{label||payload[0].name}</p>
      <p className="font-mono text-xs text-primary-600 font-bold">{payload[0].value} tasks</p>
    </div>
  ) : null;

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-bungee text-3xl text-zinc-900">Analytics</h1>
        <p className="font-mono text-xs text-zinc-400 mt-1 tracking-wide">PRODUCTIVITY INSIGHTS</p>
      </div>

      <div className="luxury-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 card-rise">
        <MomentumRing percentage={pct} size={88} strokeWidth={7} />
        <div className="flex-1 text-center sm:text-left">
          <p className="font-mono text-[11px] text-primary-500 tracking-widest uppercase mb-1">Overall Score</p>
          <h2 className="font-bungee text-xl text-zinc-900 mb-1">
            {pct>=70?'Excellent momentum.':pct>=40?'Steady progress.':'Time to build momentum.'}
          </h2>
          <p className="font-mono text-xs text-zinc-400">{stats?.completedTasks??0} completed out of {stats?.totalTasks??0} total tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {label:'Total Tasks',val:stats?.totalTasks??0,color:'text-primary-600',bg:'bg-primary-50',delay:0},
          {label:'Completed',val:stats?.completedTasks??0,color:'text-emerald-600',bg:'bg-emerald-50',delay:60},
          {label:'Pending',val:stats?.pendingTasks??0,color:'text-amber-600',bg:'bg-amber-50',delay:120},
          {label:'Notes Written',val:stats?.totalNotes??0,color:'text-violet-600',bg:'bg-violet-50',delay:180},
        ].map(c=>(
          <div key={c.label} className="luxury-card p-5 card-rise" style={{animationDelay:`${c.delay}ms`}}>
            <p className={`font-bungee text-3xl ${c.color}`}>{c.val}</p>
            <p className="font-mono text-[10px] text-zinc-400 mt-1 tracking-wider uppercase">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="luxury-card p-6">
          <h2 className="font-bungee text-base text-zinc-900 mb-1">Task Status</h2>
          <p className="font-mono text-[10px] text-zinc-400 mb-5 tracking-wider">OVERVIEW</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={bar} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false}/>
              <XAxis dataKey="name" tick={{fontSize:11,fontFamily:'Roboto Mono',fill:'#a1a1aa'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fontFamily:'Roboto Mono',fill:'#a1a1aa'}} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="value" radius={[6,6,0,0]}>
                {bar.map((e,i)=><Cell key={i} fill={e.fill}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="luxury-card p-6">
          <h2 className="font-bungee text-base text-zinc-900 mb-1">Distribution</h2>
          <p className="font-mono text-[10px] text-zinc-400 mb-5 tracking-wider">TASK BREAKDOWN</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pie} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="value" paddingAngle={3}
                label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}
                style={{fontSize:'10px',fontFamily:'Roboto Mono'}}>
                {pie.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}
              </Pie>
              <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="luxury-card p-6" style={{background:'linear-gradient(160deg,#fafaff,#fff)'}}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-violet-500"/>
          <h2 className="font-bungee text-base text-zinc-900">The Takeaway</h2>
        </div>
        <p className="font-mono text-xs text-zinc-500 leading-relaxed max-w-2xl">
          {pct>=70 ? "You're completing most of what you start. That consistency compounds — keep showing up." :
           pct>=40 ? "You're making real progress. A few more finished tasks and you'll see this number jump." :
           "Every tracked task is a step toward visibility into your own habits. Start small, finish one, watch this number move."}
        </p>
      </div>
    </div>
  );
}