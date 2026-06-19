import { useState, useEffect } from 'react';
import { History, FileText, HelpCircle, Calendar, Sparkles } from 'lucide-react';
import api from '../api/axiosInstance';

interface HistoryItem {
  _id: string;
  type: 'summarize' | 'quiz' | 'plan';
  input: string;
  output: string;
  createdAt: string;
}

const typeConfig = {
  summarize: { icon: FileText, emoji: '📝', bg: 'bg-primary-50', color: 'text-primary-600', border: 'border-primary-100' },
  quiz:      { icon: HelpCircle, emoji: '🧠', bg: 'bg-amber-50', color: 'text-amber-600', border: 'border-amber-100' },
  plan:      { icon: Calendar, emoji: '🗓️', bg: 'bg-pink-50', color: 'text-pink-600', border: 'border-pink-100' },
};

export default function AIHistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/ai/history')
      .then(r => setHistory(r.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-6">
      <div className="loading-bar w-full mb-8"/>
      <div className="space-y-4">
        {[...Array(3)].map((_,i) => <div key={i} className="luxury-card h-36 animate-pulse bg-zinc-50" />)}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-3">
          <Sparkles size={11} className="text-primary-500"/>
          <span className="font-mono text-[10px] font-bold text-primary-700 tracking-wider">AI ARCHIVE</span>
        </div>
        <h1 className="font-bungee text-3xl text-zinc-900">AI History 🗂️</h1>
        <p className="font-mono text-xs text-zinc-400 mt-1">{history.length} past generations — your AI journey so far</p>
      </div>

      {history.length === 0 ? (
        <div className="luxury-card p-16 text-center">
          <History size={36} className="mx-auto mb-3 text-zinc-200 empty-state-icon" />
          <h3 className="font-bungee text-zinc-300 mb-1">No History Yet</h3>
          <p className="font-mono text-xs text-zinc-300">Every summary, quiz, and plan you generate will show up here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((h, i) => {
            const cfg = typeConfig[h.type];
            const Icon = cfg.icon;
            return (
              <div key={h._id}
                className="luxury-card p-5 sm:p-6 card-rise"
                style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${cfg.bg} border ${cfg.border}`}>
                    <span>{cfg.emoji}</span>
                  </div>
                  <span className={`font-mono text-xs font-bold uppercase tracking-wider ${cfg.color}`}>{h.type}</span>
                  <span className="font-mono text-[11px] text-zinc-400 bg-zinc-50 border border-zinc-100 px-2.5 py-0.5 rounded-lg ml-auto">
                    {new Date(h.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="mb-3.5">
                  <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Your Input</span>
                  <p className="font-mono text-xs text-zinc-500 line-clamp-2 leading-relaxed">{h.input}</p>
                </div>

                <div className="rounded-xl p-4" style={{background:'linear-gradient(160deg,#fafaff,#fff)', border:'1px solid #ede9fe'}}>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-violet-600 uppercase tracking-widest mb-2">
                    <Sparkles size={11}/> AI Result
                  </div>
                  <p className="font-mono text-xs text-zinc-700 whitespace-pre-wrap line-clamp-4 leading-relaxed">{h.output}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}