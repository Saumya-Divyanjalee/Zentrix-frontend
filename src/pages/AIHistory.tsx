import { useState, useEffect } from 'react';
import { History, FileText, HelpCircle, Calendar, Sparkles, Cpu } from 'lucide-react';
import api from '../api/axiosInstance';

interface HistoryItem {
  _id: string;
  type: 'summarize' | 'quiz' | 'plan';
  input: string;
  output: string;
  createdAt: string;
}

const typeIcons = { summarize: FileText, quiz: HelpCircle, plan: Calendar };

export default function AIHistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/ai/history')
      .then(r => setHistory(r.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="dark-surface w-full min-h-screen p-6 sm:p-8 flex flex-col justify-start">
      <div className="flex items-center gap-2 font-mono text-sm font-black text-indigo-300 uppercase tracking-widest animate-pulse">
        <Cpu size={16} className="animate-spin" /> Fetching AI History Index...
      </div>
      <div className="loading-bar w-full mt-4 mb-8"/>
      <div className="space-y-4">
        {[...Array(3)].map((_,i) => <div key={i} className="dark-card h-36 animate-pulse" />)}
      </div>
    </div>
  );

  return (
    <div className="dark-surface w-full min-h-screen p-2 sm:p-4 space-y-7 relative overflow-hidden card-rise">
      {/* Background Ambient Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl ambient-blob" style={{background:'#6366f1'}}/>

      {/* AI History Top Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <h1 className="font-bungee text-2xl sm:text-3xl text-white tracking-wide">NEURAL GENERATION HISTORY</h1>
          <p className="font-mono text-sm text-slate-300">Logged archive repository containing {history.length} past analytical executions.</p>
        </div>
      </div>

      {/* History Log Stream Container */}
      {history.length === 0 ? (
        <div className="dark-card p-16 text-center border-2 border-dashed border-slate-800 bg-slate-950/20">
          <History size={38} className="mx-auto mb-3 text-slate-700 empty-state-icon" />
          <h3 className="font-mono text-base font-black text-slate-400 uppercase tracking-wider mb-1">Zero History Nodes</h3>
          <p className="font-mono text-xs text-slate-500 font-bold">No previous data generations committed to this tracking loop yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((h, i) => {
            const Icon = typeIcons[h.type];
            return (
              <div 
                key={h._id} 
                className="dark-card p-5 sm:p-6 bg-white/[0.01] border border-white/5 hover:border-indigo-500/30 transition-all"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Meta Header Information Row */}
                <div className="flex items-center gap-2.5 border-b border-slate-900 pb-3 mb-4">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                    h.type === 'summarize' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                    h.type === 'quiz' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                    'bg-pink-500/10 border-pink-500/20 text-pink-400'
                  }`}>
                    <Icon size={13} strokeWidth={2.5} />
                  </div>
                  <span className="font-mono text-xs font-black tracking-widest uppercase text-slate-200">{h.type} engine</span>
                  
                  <span className="font-mono text-[11px] font-black tracking-wider text-slate-500 bg-slate-950 border border-slate-900 px-2.5 py-0.5 rounded-lg ml-auto">
                    {new Date(h.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                
                {/* User Raw Input Stream Section */}
                <div className="space-y-1 mb-3.5 pl-1">
                  <span className="font-mono text-[10px] font-black text-indigo-400 uppercase tracking-widest block">COMMITTED RAW INPUT</span>
                  <p className="font-mono text-xs font-semibold text-slate-400 line-clamp-2 leading-relaxed">{h.input}</p>
                </div>
                
                {/* AI Structured Output Stream Section */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 relative overflow-hidden">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">
                    <Sparkles size={11} fill="currentColor" /> Neural Output Stack
                  </div>
                  <p className="font-mono text-sm font-medium text-slate-200 whitespace-pre-wrap line-clamp-4 leading-relaxed">{h.output}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}