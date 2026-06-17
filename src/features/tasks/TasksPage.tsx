import { useState, useEffect } from 'react';
import { Plus, CheckSquare, Trash2, Calendar, Tag, Filter } from 'lucide-react';
import api from '../../api/axiosInstance';
import { Task } from '../../types';

const filters = ['all','pending','in-progress','completed'];
const priorities = ['low','medium','high'];
const statuses = ['pending','in-progress','completed'];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({title:'',description:'',priority:'medium',deadline:'',subject:''});

  const fetch = () => {
    setLoading(true);
    api.get(filter==='all'?'/tasks':`/tasks?status=${filter}`)
      .then(r=>setTasks(r.data.data||[])).finally(()=>setLoading(false));
  };
  useEffect(()=>{fetch();},[filter]);

  const create = async(e:React.FormEvent)=>{ e.preventDefault(); await api.post('/tasks',form); setForm({title:'',description:'',priority:'medium',deadline:'',subject:''}); setShowForm(false); fetch(); };
  const updateStatus = async(id:string,status:string)=>{ await api.put(`/tasks/${id}`,{status}); fetch(); };
  const del = async(id:string)=>{ await api.delete(`/tasks/${id}`); fetch(); };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-bungee text-3xl text-zinc-900">Tasks</h1>
          <p className="font-mono text-xs text-zinc-400 mt-1 tracking-wide">{tasks.length} ITEMS</p>
        </div>
        <button onClick={()=>setShowForm(!showForm)} className="luxury-btn flex items-center gap-2">
          <Plus size={14}/> {showForm?'Cancel':'New Task'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter size={13} className="text-zinc-400"/>
        <div className="flex gap-1 p-1 bg-zinc-100 rounded-xl">
          {filters.map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-4 py-1.5 rounded-lg font-mono text-xs font-bold transition-all capitalize ${filter===f?'bg-white text-primary-700 shadow-sm':'text-zinc-500 hover:text-zinc-700'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="luxury-card p-6 animate-slide-up border-primary-100">
          <h2 className="font-bungee text-base text-zinc-900 mb-5">Create New Task</h2>
          <form onSubmit={create} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="luxury-label">Task Title *</label>
                <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="What needs to be done?" required className="luxury-input"/>
              </div>
              <div className="col-span-2">
                <label className="luxury-label">Description</label>
                <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Add details..." rows={2} className="luxury-input resize-none"/>
              </div>
              <div>
                <label className="luxury-label">Priority</label>
                <select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})} className="luxury-input">
                  {priorities.map(p=><option key={p} value={p}>{p.charAt(0).toUpperCase()+p.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="luxury-label">Deadline</label>
                <input type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})} className="luxury-input"/>
              </div>
              <div>
                <label className="luxury-label">Subject</label>
                <input value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="e.g. React, Math" className="luxury-input"/>
              </div>
              <div className="flex items-end">
                <button type="submit" className="luxury-btn w-full">Create Task</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Task list */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_,i)=><div key={i} className="luxury-card h-16 animate-pulse bg-zinc-50"/>)}
        </div>
      ) : tasks.length===0 ? (
        <div className="luxury-card p-16 text-center">
          <CheckSquare size={36} className="mx-auto mb-3 text-zinc-200"/>
          <h3 className="font-bungee text-zinc-300 mb-1">No Tasks Found</h3>
          <p className="font-mono text-xs text-zinc-300">Create your first task to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map(t=>(
            <div key={t._id} className="luxury-card px-5 py-4 flex items-center justify-between group hover:border-primary-200">
              <div className="flex items-center gap-4">
                <button onClick={()=>updateStatus(t._id,t.status==='completed'?'pending':'completed')}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${t.status==='completed'?'bg-emerald-500 border-emerald-500':'border-zinc-300 hover:border-primary-400'}`}>
                  {t.status==='completed'&&<span className="text-white text-[10px] font-bold">✓</span>}
                </button>
                <div>
                  <p className={`font-mono text-sm font-bold ${t.status==='completed'?'line-through text-zinc-300':'text-zinc-800'}`}>{t.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {t.subject&&<span className="flex items-center gap-1 font-mono text-[10px] text-primary-600"><Tag size={9}/>{t.subject}</span>}
                    {t.deadline&&<span className="flex items-center gap-1 font-mono text-[10px] text-zinc-400"><Calendar size={9}/>{new Date(t.deadline).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge badge-${t.priority}`}>{t.priority}</span>
                <select value={t.status} onChange={e=>updateStatus(t._id,e.target.value)}
                  className="font-mono text-xs border border-zinc-200 rounded-lg px-2 py-1.5 bg-white text-zinc-600 focus:outline-none focus:border-primary-300 cursor-pointer">
                  {statuses.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={()=>del(t._id)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-500 transition-all">
                  <Trash2 size={13}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
