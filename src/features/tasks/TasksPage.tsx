import { useState, useEffect } from 'react';
import { Plus, CheckSquare, Trash2, Calendar, Tag, Filter, Pencil, X, Flame, Target, ListTodo } from 'lucide-react';
import api from '../../api/axiosInstance';
import { Task } from '../../types';

const filters = ['all','pending','in-progress','completed'];
const priorities = ['low','medium','high'];
const statuses = ['pending','in-progress','completed'];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string|null>(null);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({title:'',description:'',priority:'medium',deadline:'',subject:''});
  const [justCompleted, setJustCompleted] = useState<string|null>(null);

  const fetch = () => {
    setLoading(true);
    api.get(filter==='all'?'/tasks':`/tasks?status=${filter}`)
      .then(r=>setTasks(r.data.data||[])).finally(()=>setLoading(false));
  };
  useEffect(()=>{fetch();},[filter]);

  const resetForm = () => {
    setForm({title:'',description:'',priority:'medium',deadline:'',subject:''});
    setShowForm(false);
    setEditingId(null);
  };

  const openCreate = () => { resetForm(); setShowForm(true); };

  const openEdit = (t: Task) => {
    setEditingId(t._id);
    setForm({
      title: t.title,
      description: t.description || '',
      priority: t.priority,
      deadline: t.deadline ? t.deadline.split('T')[0] : '',
      subject: t.subject || '',
    });
    setShowForm(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/tasks/${editingId}`, form);
    } else {
      await api.post('/tasks', form);
    }
    resetForm();
    fetch();
  };

  const updateStatus = async(id:string,status:string)=>{
    if (status === 'completed') {
      setJustCompleted(id);
      setTimeout(() => setJustCompleted(null), 900);
    }
    await api.put(`/tasks/${id}`,{status});
    fetch();
  };
  const del = async(id:string)=>{ await api.delete(`/tasks/${id}`); fetch(); };

  const doneCount = tasks.filter(t => t.status === 'completed').length;
  const pct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="dark-surface w-full min-h-screen p-2 sm:p-4 space-y-7 relative overflow-hidden card-rise">
      {/* Title Bar and Progress Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-slate-800/80 pb-5">
        <div className="space-y-2 flex-1 max-w-xl">
          <h1 className="font-bungee text-2xl sm:text-3xl text-white tracking-wide">TASK MATRIX CONTROL</h1>
          <div className="flex items-center gap-4 bg-slate-950/40 p-3 rounded-xl border border-slate-900">
            <div className="flex-1 bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
              <div className="h-full rounded-full transition-all duration-700 shadow-lg shadow-indigo-500/40" style={{width:`${pct}%`, background:'linear-gradient(90deg,#4f46e5,#8b5cf6)'}}/>
            </div>
            <span className="font-mono text-xs font-black text-indigo-300 whitespace-nowrap">{doneCount} / {tasks.length} CONCLUDED ({pct}%)</span>
          </div>
        </div>
        <button 
          onClick={showForm ? resetForm : openCreate} 
          className="luxury-btn flex items-center justify-center gap-2 text-sm py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-600/20 self-start sm:self-auto shrink-0"
        >
          {showForm ? <><X size={16} strokeWidth={2.5}/> Cancel Action</> : <><Plus size={16} strokeWidth={2.5}/> Deploy New Task</>}
        </button>
      </div>

      {/* Modern High-Contrast Filter Dock */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 border-b border-slate-900/60">
        <Filter size={14} className="text-slate-500 flex-shrink-0" strokeWidth={2.5}/>
        <div className="flex gap-1.5 p-1 bg-slate-950 border border-slate-900 rounded-xl">
          {filters.map(f=>(
            <button 
              key={f} 
              onClick={()=>setFilter(f)}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-black transition-all capitalize whitespace-nowrap tracking-wide ${
                filter===f
                  ? 'bg-indigo-600 text-white shadow-md font-bold' 
                  : 'text-slate-400 hover:text-slate-200 bg-transparent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task Creation / Editing Matrix Form */}
      {showForm && (
        <div className="dark-card p-6 animate-slide-up border-2 border-indigo-500/30 bg-indigo-600/[0.02]">
          <h2 className="font-mono text-base font-black text-white uppercase tracking-wider mb-5 flex items-center gap-2">
            <ListTodo size={18} className="text-indigo-400" /> {editingId ? 'Modify Active Objective' : 'Initialize Target Sequence'}
          </h2>
          <form onSubmit={submit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">Task Header Title *</label>
                <input 
                  value={form.title} 
                  onChange={e=>setForm({...form,title:e.target.value})} 
                  placeholder="What objective needs execution?" 
                  required 
                  className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">Detailed Task Description</label>
                <textarea 
                  value={form.description} 
                  onChange={e=>setForm({...form,description:e.target.value})} 
                  placeholder="Log tactical details and context parameters..." 
                  rows={2} 
                  className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 resize-none leading-relaxed"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">Priority Index</label>
                <select 
                  value={form.priority} 
                  onChange={e=>setForm({...form,priority:e.target.value})} 
                  className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-200 outline-none transition-all cursor-pointer font-bold"
                >
                  {priorities.map(p=><option key={p} value={p} className="bg-slate-950 text-slate-200">{p.charAt(0).toUpperCase()+p.slice(1)}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">Target Deadline Date</label>
                <input 
                  type="date" 
                  value={form.deadline} 
                  onChange={e=>setForm({...form,deadline:e.target.value})} 
                  className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-200 outline-none transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">Subject Node Anchor</label>
                <input 
                  value={form.subject} 
                  onChange={e=>setForm({...form,subject:e.target.value})} 
                  placeholder="e.g. React hooks, Network Architecture" 
                  className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
              <div className="flex items-end pt-1">
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-black text-xs uppercase tracking-wider py-4 px-4 rounded-xl transition-all shadow-md shadow-indigo-600/10">
                  {editingId ? 'Commit Update Loop' : 'Deploy Target'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Operational Task List Streams */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_,i)=><div key={i} className="dark-card h-20 animate-pulse bg-slate-900/40"/>)}
        </div>
      ) : tasks.length === 0 ? (
        <div className="dark-card p-16 text-center border-2 border-dashed border-slate-800 bg-slate-950/20">
          <CheckSquare size={38} className="mx-auto mb-3 text-slate-700 empty-state-icon"/>
          <h3 className="font-mono text-base font-black text-slate-400 uppercase tracking-wider mb-1">Zero Matrix Objectives</h3>
          <p className="font-mono text-xs text-slate-500 font-bold">Deploy your initial task array node — control metrics originate here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((t,i)=>(
            <div 
              key={t._id} 
              className={`dark-card px-5 py-4.5 flex items-center justify-between group hover:border-indigo-500/40 bg-white/[0.01] transition-all card-rise ${
                justCompleted===t._id ? 'dark-glow-amber scale-[0.99] opacity-60' : ''
              }`} 
              style={{animationDelay:`${i*40}ms`}}
            >
              <div className="flex items-center gap-4.5 min-w-0">
                {/* Custom Technical Checkbox */}
                <button 
                  onClick={()=>updateStatus(t._id,t.status==='completed'?'pending':'completed')}
                  className={`w-6 w-6 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    t.status==='completed'
                      ? 'bg-emerald-500 border-emerald-500 scale-105 shadow-md shadow-emerald-500/20' 
                      : 'border-slate-700 hover:border-indigo-400 bg-slate-950'
                  }`}
                >
                  {t.status==='completed'&&<span className="text-white text-[11px] font-black">✓</span>}
                </button>
                
                <div className="min-w-0 space-y-1">
                  <p className={`font-mono text-sm font-bold transition-all truncate tracking-wide ${
                    t.status==='completed' ? 'line-through text-slate-500 font-medium' : 'text-slate-100'
                  }`}>{t.title}</p>
                  <div className="flex items-center gap-4">
                    {t.subject&& (
                      <span className="flex items-center gap-1 font-mono text-[11px] font-black uppercase text-indigo-400 tracking-wider">
                        <Tag size={10} strokeWidth={2.5}/> {t.subject}
                      </span>
                    )}
                    {t.deadline&& (
                      <span className="flex items-center gap-1 font-mono text-[11px] font-bold text-slate-400 tracking-wider">
                        <Calendar size={10} strokeWidth={2.2}/> {new Date(t.deadline).toLocaleDateString('en-US',{month:'short',day:'numeric'})}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Controls Dock */}
              <div className="flex items-center gap-3.5 flex-shrink-0">
                <span className={`badge badge-${t.priority} font-mono text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-white/5`}>{t.priority}</span>
                
                <select 
                  value={t.status} 
                  onChange={e=>updateStatus(t._id,e.target.value)}
                  className="font-mono text-xs font-bold border-2 border-slate-800 rounded-xl px-2.5 py-1.5 bg-slate-950 text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer hidden sm:block uppercase tracking-wider"
                >
                  {statuses.map(s=><option key={s} value={s} className="bg-slate-950">{s}</option>)}
                </select>
                
                <button onClick={()=>openEdit(t)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-xl hover:bg-white/5 text-indigo-400 hover:text-indigo-300 transition-all">
                  <Pencil size={14} strokeWidth={2.5}/>
                </button>
                <button onClick={()=>del(t._id)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-xl hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 transition-all">
                  <Trash2 size={14} strokeWidth={2.5}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Terminal All-Clear Complete Notification Block */}
      {tasks.length > 0 && pct === 100 && (
        <div className="dark-card p-6 text-center bg-indigo-600/[0.03] border-2 border-indigo-500/20 shadow-xl shadow-indigo-600/5">
          <Flame size={26} className="text-amber-400 mx-auto mb-2.5 animate-pulse"/>
          <p className="font-mono text-sm font-black text-indigo-300 uppercase tracking-widest">Task array index 100% neutralized. Loop closed successfully. ✦</p>
        </div>
      )}
    </div>
  );
}