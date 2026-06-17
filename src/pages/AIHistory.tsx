import { useState, useEffect } from 'react';
import { History, FileText, HelpCircle, Calendar } from 'lucide-react';
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
    api.get('/ai/history').then(r => setHistory(r.data.data || [])).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="font-mono text-xs text-zinc-400">Loading history...</p>;

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-bungee text-3xl text-zinc-900">AI History</h1>
        <p className="font-mono text-xs text-zinc-400 mt-1">{history.length} PAST GENERATIONS</p>
      </div>
      {history.length === 0 ? (
        <div className="luxury-card p-12 text-center">
          <History size={32} className="mx-auto mb-2 text-zinc-200" />
          <p className="font-mono text-xs text-zinc-300">No AI history yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map(h => {
            const Icon = typeIcons[h.type];
            return (
              <div key={h._id} className="luxury-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className="text-primary-500" />
                  <span className="font-mono text-xs font-bold text-zinc-700 uppercase">{h.type}</span>
                  <span className="font-mono text-[10px] text-zinc-300 ml-auto">
                    {new Date(h.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="font-mono text-xs text-zinc-500 mb-2 line-clamp-2">{h.input}</p>
                <div className="bg-primary-50 rounded-xl p-3">
                  <p className="font-mono text-xs text-primary-700 whitespace-pre-wrap line-clamp-4">{h.output}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}