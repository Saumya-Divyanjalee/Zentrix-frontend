import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieIcon, Activity } from 'lucide-react';
import api from '../../api/axiosInstance';
import { DashboardStats } from '../../types';
import MomentumRing from '../../components/ui/MomentumRing';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats|null>(null);
  
  useEffect(() => { 
    api.get('/dashboard/stats')
      .then(r => setStats(r.data.data))
      .catch(() => {}); 
  }, []);

  const bar = [
    { name: 'Done', value: stats?.completedTasks ?? 0, fill: '#6366f1' },
    { name: 'Progress', value: stats?.inProgressTasks ?? 0, fill: '#8b5cf6' },
    { name: 'Pending', value: stats?.pendingTasks ?? 0, fill: '#f59e0b' },
  ];

  const pie = [
    { name: 'Completed', value: stats?.completedTasks ?? 0 },
    { name: 'Pending', value: stats?.pendingTasks ?? 0 },
    { name: 'In Progress', value: stats?.inProgressTasks ?? 0 },
  ];
  
  const COLORS = ['#6366f1', '#f59e0b', '#8b5cf6'];

  const CustomTooltip = ({ active, payload, label }: any) => active && payload?.length ? (
    <div className="bg-[#0d1321] border border-slate-800 rounded-xl p-3.5 shadow-2xl backdrop-blur-md">
      <p className="font-mono text-xs font-black text-white uppercase tracking-wider mb-1">{label || payload[0].name}</p>
      <p className="font-mono text-xs text-indigo-400 font-bold">{payload[0].value} Tasks Executed</p>
    </div>
  ) : null;

  const productivityScore = stats?.productivity ?? 0;

  return (
    <div className="dark-surface w-full min-h-screen p-2 sm:p-4 space-y-7 relative overflow-hidden card-rise">
      {/* Analytics Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <h1 className="font-bungee text-2xl sm:text-3xl text-white tracking-wide">PERFORMANCE ANALYTICS</h1>
          <p className="font-mono text-sm text-slate-300">Live system execution metrics and target distribution analytics.</p>
        </div>
      </div>

      {/* Core Operational Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Tasks Index', val: stats?.totalTasks ?? 0, color: 'text-white' },
          { label: 'Completed Segments', val: stats?.completedTasks ?? 0, color: 'text-emerald-400' },
          { label: 'Pending Operations', val: stats?.pendingTasks ?? 0, color: 'text-amber-400' },
          { label: 'Productivity Velocity', val: `${productivityScore}%`, color: 'text-indigo-400' },
        ].map(c => (
          <div key={c.label} className="dark-card p-6">
            <p className={`font-mono text-3xl font-black ${c.color}`}>{c.val}</p>
            <p className="font-mono text-xs font-bold text-slate-400 mt-2 tracking-wider uppercase">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Twin Split Recharts Panel Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Container */}
        <div className="dark-card p-6">
          <div className="flex items-center gap-2.5 mb-6">
            <BarChart3 size={18} className="text-indigo-400" />
            <div>
              <h2 className="font-mono text-base font-bold text-white">Task Execution Status</h2>
              <p className="font-mono text-[10px] text-slate-400 tracking-wider">QUANTITATIVE OVERVIEW</p>
            </div>
          </div>
          <div className="w-full bg-slate-950/40 p-4 rounded-xl border border-slate-900">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={bar} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'Roboto Mono', fill: '#94a3b8', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'Roboto Mono', fill: '#94a3b8', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {bar.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Container */}
        <div className="dark-card p-6">
          <div className="flex items-center gap-2.5 mb-6">
            <PieIcon size={18} className="text-indigo-400" />
            <div>
              <h2 className="font-mono text-base font-bold text-white">Resource Distribution</h2>
              <p className="font-mono text-[10px] text-slate-400 tracking-wider">PERCENTAGE BREAKDOWN</p>
            </div>
          </div>
          <div className="w-full bg-slate-950/40 p-4 rounded-xl border border-slate-900 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie 
                  data={pie} 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={85} 
                  innerRadius={45} 
                  dataKey="value" 
                  paddingAngle={4}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} 
                  labelLine={false}
                  style={{ fontSize: '11px', fontFamily: 'Roboto Mono', fill: '#cbd5e1', fontWeight: 'bold' }}
                >
                  {pie.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Signature Component: Progress Strip & Momentum Integration */}
      <div className="dark-card p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl ambient-blob" />
        
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <MomentumRing percentage={productivityScore} size={64} strokeWidth={5} />
          
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Activity size={14} className="spark-dot" /> Productivity Velocity Score
            </div>
            <p className="font-mono text-sm text-slate-300 font-bold leading-relaxed pt-1">
              {productivityScore >= 70 ? '✦ System running at peak capacity. Core objectives heavily neutralized.' :
               productivityScore >= 40 ? '✦ Stable operational output. Maintain consistency to unlock higher velocity.' :
               '✦ Initializing task sequence execution. Establish control loops early.'}
            </p>
          </div>
          
          <span className="font-bungee text-3xl text-white dark-glow-violet px-4 py-2 bg-white/5 rounded-xl border border-white/5">{productivityScore}%</span>
        </div>
        
        {/* Sleek Progress Track Indicator */}
        <div className="mt-5 bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
          <div 
            className="h-full rounded-full transition-all duration-1000 shadow-lg shadow-indigo-500/40" 
            style={{ width: `${productivityScore}%`, background: 'linear-gradient(90deg, #4f46e5, #8b5cf6)' }}
          />
        </div>
      </div>
    </div>
  );
}