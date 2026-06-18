import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Clock, BookOpen } from 'lucide-react';
import api from '../../api/axiosInstance';
import { Task } from '../../types';

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [current, setCurrent] = useState(new Date());
  const [selected, setSelected] = useState<string|null>(null);

  useEffect(() => {
    api.get('/tasks').then(r => setTasks(r.data.data || [])).catch(() => {});
  }, []);

  const y = current.getFullYear(), m = current.getMonth();
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const today = new Date();
  const isToday = (d: number) => d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
  const dateStr = (d: number) => `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const tasksForDay = (d: number) => tasks.filter(t => t.deadline?.startsWith(dateStr(d)));
  const selectedTasks = selected ? tasks.filter(t => t.deadline?.startsWith(selected)) : [];

  const monthTasks = tasks.filter(t => {
    if (!t.deadline) return false;
    const d = new Date(t.deadline);
    return d.getMonth() === m && d.getFullYear() === y;
  });

  const priorityColor = (p:string) => p==='high'?'bg-red-400':p==='medium'?'bg-amber-400':'bg-emerald-400';

  return (
    <div className="dark-surface w-full min-h-screen p-2 sm:p-4 space-y-7 relative overflow-hidden card-rise">
      {/* Calendar Title Bar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <h1 className="font-bungee text-2xl sm:text-3xl text-white tracking-wide">SYSTEM CALENDAR</h1>
          <p className="font-mono text-sm text-slate-300">Operational validation and upcoming target deadline scheduler loops.</p>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-indigo-600/10 border border-indigo-500/30 shadow-lg shadow-indigo-600/5">
          <CalendarDays size={14} className="text-indigo-400" strokeWidth={2.5}/>
          <span className="font-mono text-xs font-black text-indigo-300 uppercase tracking-wider">{monthTasks.length} Active Targets This Month</span>
        </div>
      </div>

      {/* Main Split Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Core Grid Component */}
        <div className="col-span-1 lg:col-span-2 dark-card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
            <h2 className="font-mono text-lg font-black text-white uppercase tracking-wider">{MONTHS[m]} {y}</h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrent(new Date(y, m-1, 1))} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-all">
                <ChevronLeft size={16} strokeWidth={2.5}/>
              </button>
              <button onClick={() => setCurrent(new Date(y, m+1, 1))} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-all">
                <ChevronRight size={16} strokeWidth={2.5}/>
              </button>
            </div>
          </div>
          
          {/* Days of Week Row */}
          <div className="grid grid-cols-7 gap-1 text-center mb-3">
            {DAYS.map(d => (
              <div key={d} className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest py-1.5">{d}</div>
            ))}
          </div>
          
          {/* Calendar Days Blocks Layer */}
          <div className="grid grid-cols-7 gap-1.5 animate-fade-in" key={`${y}-${m}`}>
            {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} className="min-h-[4.5rem] opacity-0" />)}
            {[...Array(daysInMonth)].map((_, i) => {
              const d = i + 1;
              const dt = dateStr(d);
              const dt_tasks = tasksForDay(d);
              const isSel = selected === dt;
              const isTd = isToday(d);
              const hasDeadline = dt_tasks.length > 0;
              return (
                <div 
                  key={d} 
                  onClick={() => setSelected(isSel ? null : dt)}
                  className={`min-h-[4.5rem] p-2 rounded-xl cursor-pointer transition-all border relative flex flex-col justify-between ${
                    isSel 
                      ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/20' 
                      : isTd 
                        ? 'border-2 border-indigo-400 bg-indigo-500/5' 
                        : hasDeadline 
                          ? 'border-amber-500/30 bg-amber-500/[0.03] hover:border-amber-400' 
                          : 'border-slate-900 bg-slate-950/20 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`font-mono text-xs font-black ${isSel ? 'text-white' : isTd ? 'text-indigo-400' : 'text-slate-200'}`}>{d}</p>
                    {isTd && !isSel && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 spark-dot shadow-lg shadow-indigo-400/50" />}
                  </div>

                  <div className="space-y-1 mt-1.5 overflow-hidden">
                    {dt_tasks.slice(0, 2).map(t => (
                      <div 
                        key={t._id} 
                        className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded truncate border ${
                          isSel 
                            ? 'bg-white/10 border-white/10 text-white' 
                            : t.priority === 'high' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                              t.priority === 'medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                              'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        {t.title}
                      </div>
                    ))}
                    {dt_tasks.length > 2 && (
                      <p className={`font-mono text-[9px] font-black tracking-wide pl-1 ${isSel ? 'text-white/70' : 'text-indigo-400'}`}>+{dt_tasks.length - 2} More</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Agenda Distribution Side Panel */}
        <div className="space-y-5">
          {/* Daily Schedule Module */}
          <div className="dark-card p-6">
            <h3 className="font-mono text-sm font-black text-white uppercase tracking-wider mb-1">
              {selected ? new Date(selected + 'T00:00:00').toLocaleDateString('en-US', {month:'long',day:'numeric'}) : 'Console Agenda'}
            </h3>
            <p className="font-mono text-[10px] text-slate-400 mb-5 tracking-wider">SCHEDULED OPERATIONS</p>
            
            {!selected ? (
              <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
                <Clock size={24} className="text-slate-700 mx-auto mb-2" />
                <p className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">Select matrix date slot</p>
              </div>
            ) : selectedTasks.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
                <p className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">Zero items due — loop clear</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[16rem] overflow-y-auto pr-1">
                {selectedTasks.map(t => (
                  <div key={t._id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <p className="font-mono text-xs font-bold text-slate-100">{t.title}</p>
                    {t.subject && (
                      <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-mono mt-1 font-bold">
                        <BookOpen size={10} /> {t.subject}
                      </div>
                    )}
                    <span className={`inline-block font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded mt-2 border ${
                      t.priority === 'high' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                      t.priority === 'medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                      'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    }`}>{t.priority} priority</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Monthly Index Queue Summary Overview */}
          <div className="dark-card p-6">
            <p className="font-mono text-xs font-black text-indigo-300 mb-1 uppercase tracking-wider">Month Target Queue</p>
            <p className="font-mono text-[10px] text-slate-400 mb-4 tracking-wider">CRITICAL ACTIONS INDEX</p>
            
            {monthTasks.length === 0 ? (
              <p className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider py-4">No logged operations</p>
            ) : (
              <div className="space-y-2 max-h-[14rem] overflow-y-auto pr-1">
                {monthTasks.slice(0, 6).map(t => (
                  <div key={t._id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white/[0.01] border border-white/5 transition-colors hover:bg-white/5">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityColor(t.priority)}`}/>
                    <p className="font-mono text-xs text-slate-200 truncate flex-1 font-medium">{t.title}</p>
                    <p className="font-mono text-xs font-black text-slate-500 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded shrink-0">Day {new Date(t.deadline!).getDate()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}