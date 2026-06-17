import { useState } from 'react';
import { Sparkles, FileText, HelpCircle, Calendar, Copy, Check } from 'lucide-react';
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
    summarize:'Paste your long study notes here...',
    quiz:'Paste study content to generate MCQ questions...',
    plan:'Enter a topic for your study plan...',
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-bungee text-3xl text-zinc-900">AI Assistant</h1>
        <p className="font-mono text-xs text-zinc-400 mt-1 tracking-wide flex items-center gap-1.5">
          <Sparkles size={12} className="text-primary-500"/> POWERED BY GOOGLE GEMINI
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {tabs.map(t=>(
          <button key={t.key} onClick={()=>{setTab(t.key);setResult('');setError('');setInput('');}}
            className={`p-4 rounded-2xl text-left transition-all border-2 ${tab===t.key?'border-primary-300 bg-primary-50':'border-zinc-100 bg-white hover:border-zinc-200'}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${tab===t.key?'bg-primary-100':'bg-zinc-100'}`}>
              <t.icon size={16} className={tab===t.key?'text-primary-600':'text-zinc-400'} strokeWidth={2}/>
            </div>
            <p className="font-bungee text-sm text-zinc-900">{t.label}</p>
            <p className="font-mono text-[10px] text-zinc-400 mt-0.5">{t.desc}</p>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="luxury-card p-6">
          <label className="luxury-label">Input Content</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder={placeholders[tab]} rows={12} className="luxury-input resize-none mt-1 text-xs leading-relaxed"/>
          {tab==='plan'&&(
            <div className="mt-4">
              <label className="luxury-label">Study Duration</label>
              <div className="flex gap-2 mt-1">
                {['3','5','7','14','30'].map(d=>(
                  <button key={d} onClick={()=>setDays(d)} className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold transition-all border ${days===d?'bg-primary-600 text-white border-primary-600':'bg-white text-zinc-500 border-zinc-200 hover:border-primary-200'}`}>{d}d</button>
                ))}
              </div>
            </div>
          )}
          {error&&<p className="font-mono text-xs text-red-500 mt-3">{error}</p>}
          <button onClick={run} disabled={loading||!input.trim()} className="luxury-btn w-full mt-4 flex items-center justify-center gap-2">
            {loading?(<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Generating...</>):(<><Sparkles size={14}/>Generate</>)}
          </button>
        </div>
        <div className="luxury-card p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="luxury-label">AI Result</label>
            {result&&(<button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors">
              {copied?<Check size={12} className="text-emerald-500"/>:<Copy size={12} className="text-zinc-400"/>}
              <span className="font-mono text-[10px] text-zinc-500">{copied?'Copied!':'Copy'}</span>
            </button>)}
          </div>
          {loading?(
            <div className="flex flex-col items-center justify-center h-72 gap-4">
              <div className="relative w-16 h-16">
                <div className="w-16 h-16 border-2 border-primary-100 border-t-primary-500 rounded-full animate-spin absolute"/>
                <div className="w-16 h-16 flex items-center justify-center"><Sparkles size={20} className="text-primary-400"/></div>
              </div>
              <p className="font-bungee text-sm text-zinc-400">Thinking...</p>
            </div>
          ):result?(
            <div className="h-80 overflow-y-auto"><p className="font-mono text-xs text-zinc-700 leading-relaxed whitespace-pre-wrap">{result}</p></div>
          ):(
            <div className="flex flex-col items-center justify-center h-72 border-2 border-dashed border-zinc-100 rounded-xl">
              <Sparkles size={28} className="text-zinc-200 mb-2"/>
              <p className="font-mono text-xs text-zinc-300">AI result appears here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
