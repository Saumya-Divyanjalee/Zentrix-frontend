import { useState } from 'react';
import { Sparkles, FileText, HelpCircle, Calendar, Copy, Check, Wand2 } from 'lucide-react';
import api from '../../api/axiosInstance';

type Tab = 'summarize'|'quiz'|'plan';
const tabs = [
  {key:'summarize' as Tab,icon:FileText,label:'Summarizer',desc:'Turn notes into bullet points'},
  {key:'quiz' as Tab,icon:HelpCircle,label:'Quiz Generator',desc:'Generate MCQs from content'},
  {key:'plan' as Tab,icon:Calendar,label:'Study Planner',desc:'Create personalized study plans'},
];

export default function AIAssistantPage() {
  const [tab,setTab] = useState<Tab>('summarize');
  const [input,setInput] = useState('');
  const [days,setDays] = useState('7');
  const [result,setResult] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [copied,setCopied] = useState(false);

  const run = async() => {
    if(!input.trim()) return setError('Please enter content first');
    setLoading(true); setResult(''); setError('');
    try {
      let r: any;
      if(tab==='summarize') r=await api.post('/ai/summarize',{content:input});
      else if(tab==='quiz') r=await api.post('/ai/quiz',{content:input});
      else r=await api.post('/ai/study-plan',{topic:input,days:parseInt(days)});
      setResult(r.data.data?.summary||r.data.data?.questions||r.data.data?.plan||'No result');
    } catch { setError('AI error — check GEMINI_API_KEY in backend .env'); }
    finally { setLoading(false); }
  };

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const placeholders: Record<Tab,string> = {
    summarize:'Paste your long study notes here...\n\nThe AI will turn this into clear, scannable bullet points.',
    quiz:'Paste study content to generate MCQ questions...\n\nGreat for testing yourself before an exam.',
    plan:'Enter a topic for your study plan...\n\nExample: "Organic chemistry reactions" or "React hooks"',
  };

  return (
    <div className="ai-room -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8 min-h-screen relative overflow-hidden">
      {/* Background Ambient Elements */}
      <div className="absolute top-10 right-1/4 w-2.5 h-2.5 rounded-full bg-indigo-400 spark-dot"/>
      <div className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-amber-400 spark-dot" style={{animationDelay:'0.7s'}}/>
      <div className="absolute bottom-1/4 right-10 w-2 h-2 rounded-full bg-indigo-400 spark-dot" style={{animationDelay:'1.3s'}}/>
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl ambient-blob" style={{background:'#6366f1'}}/>

      <div className="relative z-10 space-y-7 w-full mx-auto">
        {/* Header - Left Aligned and Solid Contrast */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 shadow-lg shadow-amber-400/5">
              <Sparkles size={13} className="text-amber-400 animate-pulse"/>
              <span className="font-mono text-xs font-bold text-amber-300 tracking-wider">POWERED BY GOOGLE GEMINI AI</span>
            </div>
            <h1 className="font-bungee text-2xl sm:text-3xl text-white tracking-wide mt-2">AI STUDY COMMAND ROOM</h1>
            <p className="font-mono text-sm text-slate-300">Your professional execution space to analyze, summarize, quiz, and structure plans.</p>
          </div>
        </div>

        {/* Action Tabs Grid - Made Larger with High Visual Contrast */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tabs.map(t=>(
            <button 
              key={t.key} 
              onClick={()=>{setTab(t.key);setResult('');setError('');setInput('');}}
              className={`p-5 rounded-xl text-left transition-all duration-200 border-2 ${
                tab===t.key 
                  ? 'border-indigo-500 bg-indigo-600/15 shadow-xl shadow-indigo-600/10' 
                  : 'border-white/5 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div 
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform ${tab===t.key?'scale-105 shadow-md shadow-indigo-500/20':''}`}
                style={{background: tab===t.key ? '#4f46e5' : 'rgba(255,255,255,0.06)'}}
              >
                <t.icon size={18} className="text-white" strokeWidth={2.5}/>
              </div>
              <p className="font-bungee text-sm text-white tracking-wide">{t.label}</p>
              <p className="font-mono text-xs text-slate-300 mt-1 leading-relaxed font-bold">{t.desc}</p>
            </button>
          ))}
        </div>

        {/* Twin Panel Split Terminal - Expanded Width & Visibility */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Terminal Panel */}
          <div className="dark-card p-6 flex flex-col justify-between">
            <div>
              <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest mb-2.5 block">INPUT CONTENT TERMINAL</label>
              <textarea 
                value={input} 
                onChange={e=>setInput(e.target.value)} 
                placeholder={placeholders[tab]} 
                rows={12}
                className="w-full bg-slate-950/60 border-2 border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 font-mono text-sm text-slate-100 leading-relaxed resize-none outline-none transition-all placeholder:text-slate-500"
              />
              
              {tab=='plan'&&(
                <div className="mt-5 space-y-2">
                  <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest block">Study Plan Duration Anchor</label>
                  <div className="grid grid-cols-5 gap-2">
                    {['3','5','7','14','30'].map(d=>(
                      <button 
                        key={d} 
                        onClick={()=>setDays(d)}
                        className={`py-2.5 rounded-xl font-mono text-xs font-black transition-all border-2 ${
                          days===d 
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/10' 
                            : 'text-slate-400 border-slate-800 bg-transparent hover:border-slate-700'
                        }`}
                      >
                        {d} Days
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {error&&<p className="font-mono text-xs font-bold text-rose-400 mt-3 border border-rose-500/20 bg-rose-500/10 p-2.5 rounded-lg">{error}</p>}
            
            <button 
              onClick={run} 
              disabled={loading||!input.trim()} 
              className="w-full mt-5 bg-indigo-600 hover:bg-indigo-500 font-mono font-black text-sm text-white py-3.5 px-4 rounded-xl uppercase tracking-wider transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
            >
              {loading?(
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Processing Analytics...
                </>
              ):(
                <>
                  <Wand2 size={16} strokeWidth={2.5}/>
                  Execute Core AI Operation
                </>
              )}
            </button>
          </div>

          {/* AI Output Terminal Panel */}
          <div className="dark-card p-6 flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <label className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest">AI GENERATED ENGINE OUTPUT</label>
              {result&&((
                <button 
                  onClick={copy} 
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900/60 transition-colors shadow-md"
                >
                  {copied?<Check size={13} className="text-emerald-400"/>:<Copy size={13} className="text-slate-400"/>}
                  <span className="font-mono text-xs font-bold text-slate-300">{copied?'Copied!':'Copy Index'}</span>
                </button>
              ))}
            </div>

            {loading?(
              <div className="flex flex-col items-center justify-center flex-1 py-24 gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-400 rounded-full animate-spin absolute"/>
                  <Sparkles size={24} className="text-indigo-400 animate-pulse"/>
                </div>
                <p className="font-mono text-xs font-black text-indigo-300 uppercase tracking-widest animate-pulse">Running Neural Analytics...</p>
              </div>
            ):result?(
              <div className="flex-1 overflow-y-auto pr-1 bg-slate-950/40 border border-slate-800/60 rounded-xl p-4 min-h-[18rem] max-h-[28rem]">
                <p className="font-mono text-sm text-slate-100 leading-relaxed whitespace-pre-wrap font-medium">{result}</p>
              </div>
            ):(
              <div className="flex flex-col items-center justify-center flex-1 py-24 border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/20">
                <Sparkles size={36} className="text-slate-700 mb-3 empty-state-icon"/>
                <p className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">Awaiting Execution Command</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}