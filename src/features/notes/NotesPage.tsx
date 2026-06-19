import { useState, useEffect } from 'react';
import { Plus, FileText, Trash2, BookOpen, Tag, Pencil, X, Sparkles } from 'lucide-react';
import api from '../../api/axiosInstance';
import { Note } from '../../types';

const subjectColor = (subject?: string) => {
  if (!subject) return '#a1a1aa';
  const colors = ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981','#06b6d4'];
  const idx = subject.split('').reduce((a,c)=>a+c.charCodeAt(0),0) % colors.length;
  return colors[idx];
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Note|null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string|null>(null);
  const [form, setForm] = useState({title:'',content:'',subject:''});

  const fetch = () => { api.get('/notes').then(r=>setNotes(r.data.data||[])).finally(()=>setLoading(false)); };
  useEffect(()=>{fetch();},[]);

  const resetForm = () => { setForm({title:'',content:'',subject:''}); setShowForm(false); setEditingId(null); };

  const openCreate = () => {
    setEditingId(null);
    setForm({title:'',content:'',subject:''});
    setShowForm(true);
  };

  const openEdit = (n: Note) => {
    setEditingId(n._id);
    setForm({ title: n.title, content: n.content, subject: n.subject || '' });
    setShowForm(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const r = await api.put(`/notes/${editingId}`, form);
      if (selected?._id === editingId) setSelected(r.data.data);
    } else {
      await api.post('/notes', form);
    }
    resetForm();
    fetch();
  };

  const del = async (id: string) => {
    await api.delete(`/notes/${id}`);
    if (selected?._id === id) setSelected(null);
    fetch();
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-bungee text-3xl text-zinc-900">Notes</h1>
          <p className="font-mono text-xs text-zinc-400 mt-1 tracking-wide">{notes.length} NOTES</p>
        </div>
        <button onClick={showForm ? resetForm : openCreate} className="luxury-btn flex items-center gap-2">
          {showForm ? <><X size={14}/> Cancel</> : <><Plus size={14}/> New Note</>}
        </button>
      </div>

      {showForm && (
        <div className="luxury-card p-6 animate-slide-up">
          <h2 className="font-bungee text-base text-zinc-900 mb-5">{editingId ? 'Edit Note' : 'Create Note'}</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="luxury-label">Title *</label>
                <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Note title" required className="luxury-input"/>
              </div>
              <div>
                <label className="luxury-label">Subject</label>
                <input value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="e.g. React, Biology" className="luxury-input"/>
              </div>
            </div>
            <div>
              <label className="luxury-label">Content *</label>
              <textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})} placeholder="Write your notes here..." required rows={5} className="luxury-input resize-none"/>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="luxury-btn">{editingId ? 'Update Note' : 'Save Note'}</button>
              <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-xl border border-zinc-200 font-mono text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-1 space-y-2">
          {loading ? <div className="luxury-card h-32 animate-pulse bg-zinc-50"/> :
           notes.length===0 ? (
            <div className="luxury-card p-8 text-center">
              <FileText size={28} className="mx-auto mb-2 text-zinc-200 empty-state-icon"/>
              <p className="font-mono text-xs text-zinc-300">No notes yet — your first idea starts here</p>
            </div>
           ) : notes.map((n,i)=>(
            <div key={n._id} onClick={()=>setSelected(n)}
              className={`luxury-card p-4 cursor-pointer transition-all card-rise relative overflow-hidden ${selected?._id===n._id?'border-primary-300 bg-primary-50':''}`}
              style={{animationDelay:`${i*50}ms`}}>
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{background: subjectColor(n.subject)}}/>
              <div className="flex items-start justify-between gap-2 pl-2">
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs font-bold text-zinc-800 truncate">{n.title}</p>
                  {n.subject&&<span className="flex items-center gap-1 font-mono text-[10px] mt-1" style={{color: subjectColor(n.subject)}}><Tag size={9}/>{n.subject}</span>}
                  <p className="font-mono text-[10px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{n.content}</p>
                  {n.summary && (
                    <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 font-mono text-[9px] font-bold">
                      <Sparkles size={8}/> AI summarized
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-2">
          {selected ? (
            <div className="luxury-card p-6 h-full card-rise" style={{borderTop:`3px solid ${subjectColor(selected.subject)}`}}>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="font-bungee text-xl text-zinc-900">{selected.title}</h2>
                  {selected.subject&&<span className="flex items-center gap-1 font-mono text-xs mt-1" style={{color: subjectColor(selected.subject)}}><Tag size={11}/>{selected.subject}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>openEdit(selected)} className="p-2 rounded-xl hover:bg-primary-50 text-primary-500 hover:text-primary-600 transition-colors">
                    <Pencil size={15}/>
                  </button>
                  <button onClick={()=>del(selected._id)} className="p-2 rounded-xl hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors">
                    <Trash2 size={15}/>
                  </button>
                </div>
              </div>
              <div className="divider mb-5"/>
              <p className="font-mono text-xs text-zinc-600 leading-relaxed whitespace-pre-wrap">{selected.content}</p>
              {selected.summary&&(
                <div className="mt-6 p-4 rounded-xl bg-violet-50 border border-violet-100">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={13} className="text-violet-600"/>
                    <span className="font-mono text-[10px] font-bold text-violet-600 tracking-wider uppercase">AI Summary</span>
                  </div>
                  <p className="font-mono text-xs text-violet-700 leading-relaxed">{selected.summary}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="luxury-card h-64 flex items-center justify-center">
              <div className="text-center">
                <FileText size={32} className="mx-auto mb-2 text-zinc-200 empty-state-icon"/>
                <p className="font-mono text-xs text-zinc-300">Select a note to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}