import { useState, useEffect } from 'react';
import { Plus, FileText, Trash2, BookOpen, Tag, Pencil, X, Sparkles, FolderHeart } from 'lucide-react';
import api from '../../api/axiosInstance';
import { Note } from '../../types';

const subjectColor = (subject?: string) => {
  if (!subject) return '#64748b';
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];
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

  const fetch = () => { 
    api.get('/notes')
      .then(r => setNotes(r.data.data || []))
      .finally(() => setLoading(false)); 
  };
  
  useEffect(() => { fetch(); }, []);

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
    <div className="dark-surface w-full min-h-screen p-2 sm:p-4 space-y-7 relative overflow-hidden card-rise">
      {/* Notes Top Header Navigation Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <h1 className="font-bungee text-2xl sm:text-3xl text-white tracking-wide">SYSTEM KNOWLEDGE BASE</h1>
          <p className="font-mono text-sm text-slate-300">Logged repository containing {notes.length} operational study modules.</p>
        </div>
        <button 
          onClick={showForm ? resetForm : openCreate} 
          className="luxury-btn flex items-center justify-center gap-2 text-sm py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex-shrink-0"
        >
          {showForm ? <><X size={16} strokeWidth={2.5}/> Cancel Action</> : <><Plus size={16} strokeWidth={2.5}/> Deploy New Note</>}
        </button>
      </div>

      {/* Note Creation / Editing Dynamic Panel Terminal */}
      {showForm && (
        <div className="dark-card p-6 animate-slide-up border-2 border-indigo-500/30 bg-indigo-600/[0.02]">
          <h2 className="font-mono text-base font-black text-white uppercase tracking-wider mb-5 flex items-center gap-2">
            <FolderHeart size={18} className="text-indigo-400" /> {editingId ? 'Modify Note Segment' : 'Initialize New Knowledge Cluster'}
          </h2>
          <form onSubmit={submit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">Note Header Title *</label>
                <input 
                  value={form.title} 
                  onChange={e=>setForm({...form,title:e.target.value})} 
                  placeholder="Enter explicit note identifier..." 
                  required 
                  className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">Subject Anchor Node</label>
                <input 
                  value={form.subject} 
                  onChange={e=>setForm({...form,subject:e.target.value})} 
                  placeholder="e.g. React hooks, Advanced Network Architecture" 
                  className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">Raw Core Content Text *</label>
              <textarea 
                value={form.content} 
                onChange={e=>setForm({...form,content:e.target.value})} 
                placeholder="Log your deep textual data blocks here..." 
                required 
                rows={6} 
                className="w-full bg-slate-950 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 resize-none leading-relaxed"
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-md shadow-indigo-600/10">
                {editingId ? 'Execute Update Loop' : 'Commit Core Note'}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-3 rounded-xl border-2 border-slate-800 font-mono text-xs font-black text-slate-400 hover:text-white bg-transparent hover:border-slate-700 transition-colors uppercase tracking-wider">
                Abort Action
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Workspace Twin View Splitter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Note Cards Streams Index Container */}
        <div className="col-span-1 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
          {loading ? (
            <div className="dark-card h-36 animate-pulse bg-slate-900/40" />
          ) : notes.length === 0 ? (
            <div className="dark-card p-8 text-center border-2 border-dashed border-slate-800 bg-slate-950/20">
              <FileText size={32} className="mx-auto mb-3 text-slate-700 empty-state-icon" />
              <p className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">Zero data entries logged</p>
            </div>
          ) : (
            notes.map((n, i) => (
              <div 
                key={n._id} 
                onClick={() => setSelected(n)}
                className={`dark-card p-4.5 cursor-pointer transition-all card-rise relative overflow-hidden ${
                  selected?._id === n._id 
                    ? 'border-indigo-500 bg-indigo-600/10 shadow-xl shadow-indigo-600/5' 
                    : 'border-white/5 bg-white/[0.01]'
                }`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: subjectColor(n.subject) }} />
                <div className="flex items-start justify-between gap-2 pl-2">
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="font-mono text-sm font-black text-slate-100 truncate">{n.title}</p>
                    {n.subject && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-black uppercase tracking-wider" style={{ color: subjectColor(n.subject) }}>
                        <Tag size={10} strokeWidth={2.5}/> {n.subject}
                      </span>
                    )}
                    <p className="font-mono text-xs text-slate-400 line-clamp-2 leading-relaxed pt-0.5">{n.content}</p>
                    
                    {n.summary && (
                      <div className="pt-1.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-[9px] font-black uppercase tracking-wider">
                          <Sparkles size={10} fill="currentColor" /> Neural Summary Stacked
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Detailed Focus Reading Terminal Dashboard */}
        <div className="col-span-1 lg:col-span-2">
          {selected ? (
            <div className="dark-card p-6 min-h-[50vh] flex flex-col justify-between card-rise" style={{ borderTop: `4px solid ${subjectColor(selected.subject)}` }}>
              <div>
                <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-5 gap-4">
                  <div className="space-y-1 min-w-0">
                    <h2 className="font-mono text-xl font-black text-white tracking-wide truncate uppercase">{selected.title}</h2>
                    {selected.subject && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-black uppercase tracking-wider" style={{ color: subjectColor(selected.subject) }}>
                        <Tag size={12} strokeWidth={2.5}/> {selected.subject}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
                    <button onClick={() => openEdit(selected)} className="p-2 rounded-xl hover:bg-white/5 text-indigo-400 hover:text-indigo-300 transition-all">
                      <Pencil size={15} strokeWidth={2.5}/>
                    </button>
                    <button onClick={() => del(selected._id)} className="p-2 rounded-xl hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 transition-all">
                      <Trash2 size={15} strokeWidth={2.5}/>
                    </button>
                  </div>
                </div>
                
                <p className="font-mono text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-medium">{selected.content}</p>
              </div>

              {/* Neural Summary Embedded Module Extension */}
              {selected.summary && (
                <div className="mt-8 p-5 rounded-xl bg-indigo-600/10 border border-indigo-500/20 shadow-md">
                  <div className="flex items-center gap-2 mb-2.5">
                    <BookOpen size={14} className="text-indigo-400" strokeWidth={2.5}/>
                    <span className="font-mono text-[10px] font-black text-indigo-300 tracking-widest uppercase">NEURAL ENGINE SUMMARY EXTENSION</span>
                  </div>
                  <p className="font-mono text-xs text-slate-200 leading-relaxed font-semibold">{selected.summary}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="dark-card min-h-[45vh] flex items-center justify-center border-2 border-dashed border-slate-800 bg-slate-950/10">
              <div className="text-center">
                <FileText size={36} className="mx-auto mb-3 text-slate-700 empty-state-icon" />
                <p className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">Select an index node to initialize reader console</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}