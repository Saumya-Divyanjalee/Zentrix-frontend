import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-bungee text-3xl text-zinc-900">Calendar</h1>
        <p className="font-mono text-xs text-zinc-400 mt-1 tracking-wide">DEADLINE VIEW</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 luxury-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bungee text-lg text-zinc-900">{MONTHS[m]} {y}</h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrent(new Date(y, m-1, 1))} className="p-2 rounded-xl hover:bg-zinc-50 border border-zinc-200 transition-colors">
                <ChevronLeft size={14} className="text-zinc-500"/>
              </button>
              <button onClick={() => setCurrent(new Date(y, m+1, 1))} className="p-2 rounded-xl hover:bg-zinc-50 border border-zinc-200 transition-colors">
                <ChevronRight size={14} className="text-zinc-500"/>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 mb-3">
            {DAYS.map(d => (
              <div key={d} className="text-center font-mono text-[10px] font-bold text-zinc-400 py-2 tracking-wider">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(firstDay)].map((_, i) => <div key={`e${i}`}/>)}
            {[...Array(daysInMonth)].map((_, i) => {
              const d = i + 1;
              const dt = dateStr(d);
              const dt_tasks = tasksForDay(d);
              const isSel = selected === dt;
              const isTd = isToday(d);
              return (
                <div key={d} onClick={() => setSelected(isSel ? null : dt)}
                  className={`min-h-14 p-1.5 rounded-xl cursor-pointer transition-all ${
                    isSel ? 'bg-primary-600' : isTd ? 'bg-primary-50 border border-primary-200' : 'hover:bg-zinc-50'
                  }`}>
                  <p className={`font-mono text-xs font-bold mb-1 ${isSel ? 'text-white' : isTd ? 'text-primary-600' : 'text-zinc-700'}`}>{d}</p>
                  {dt_tasks.slice(0, 2).map(t => (
                    <div key={t._id} className={`font-mono text-[9px] px-1 py-0.5 rounded mb-0.5 truncate ${
                      isSel ? 'bg-white/20 text-white' :
                      t.priority === 'high' ? 'bg-red-100 text-red-600' :
                      t.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>{t.title}</div>
                  ))}
                  {dt_tasks.length > 2 && (
                    <p className={`font-mono text-[9px] ${isSel ? 'text-white/70' : 'text-zinc-400'}`}>+{dt_tasks.length - 2}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="luxury-card p-5">
          <h3 className="font-bungee text-sm text-zinc-900 mb-1">
            {selected ? new Date(selected + 'T00:00:00').toLocaleDateString('en-US', {month:'long',day:'numeric'}) : 'Select a Date'}
          </h3>
          <p className="font-mono text-[10px] text-zinc-400 mb-4 tracking-wider">SCHEDULED TASKS</p>
          {!selected ? (
            <p className="font-mono text-xs text-zinc-300">Click any date to see tasks</p>
          ) : selectedTasks.length === 0 ? (
            <p className="font-mono text-xs text-zinc-300">No tasks due this day</p>
          ) : (
            <div className="space-y-2">
              {selectedTasks.map(t => (
                <div key={t._id} className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <p className="font-mono text-xs font-bold text-zinc-800">{t.title}</p>
                  {t.subject && <p className="font-mono text-[10px] text-primary-600 mt-0.5">{t.subject}</p>}
                  <div className="flex gap-1.5 mt-2">
                    <span className={`badge badge-${t.priority}`}>{t.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-5 pt-4 border-t border-zinc-100">
            <p className="font-mono text-[10px] font-bold text-zinc-400 mb-3 tracking-wider uppercase">This Month</p>
            {tasks.filter(t => {
              if (!t.deadline) return false;
              const d = new Date(t.deadline);
              return d.getMonth() === m && d.getFullYear() === y;
            }).slice(0, 6).map(t => (
              <div key={t._id} className="flex items-center gap-2 py-1.5">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.priority==='high'?'bg-red-400':t.priority==='medium'?'bg-amber-400':'bg-emerald-400'}`}/>
                <p className="font-mono text-[10px] text-zinc-600 truncate flex-1">{t.title}</p>
                <p className="font-mono text-[10px] text-zinc-300 flex-shrink-0">{new Date(t.deadline!).getDate()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
