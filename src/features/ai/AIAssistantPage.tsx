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
    <div className="ai-room -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8 min-h-[85vh] relative overflow-hidden">
      <div className="absolute top-10 right-1/4 w-2 h-2 rounded-full bg-violet-300 spark-dot"/>
      <div className="absolute top-1/3 left-10 w-1.5 h-1.5 rounded-full bg-amber-300 spark-dot" style={{animationDelay:'0.7s'}}/>
      <div className="absolute bottom-1/4 right-10 w-1.5 h-1.5 rounded-full bg-violet-300 spark-dot" style={{animationDelay:'1.3s'}}/>
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-20 blur-3xl ambient-blob" style={{background:'#8b5cf6'}}/>

      <div className="relative z-10 space-y-6 max-w-5xl mx-auto">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3" style={{background:'rgba(251,191,36,0.1)',border:'1px solid rgba(251,191,36,0.25)'}}>
            <Sparkles size={11} className="text-amber-300"/>
            <span className="font-mono text-[10px] font-bold text-amber-200 tracking-wider">POWERED BY GOOGLE GEMINI</span>
          </div>
          <h1 className="font-bungee text-3xl text-white">AI Study Room</h1>
          <p className="font-mono text-xs text-white/40 mt-1">Your focused space to summarize, quiz, and plan</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tabs.map(t=>(
            <button key={t.key} onClick={()=>{setTab(t.key);setResult('');setError('');setInput('');}}
              className={`p-4 rounded-2xl text-left transition-all duration-200 border ${
                tab===t.key ? 'border-violet-400/50' : 'border-white/8 hover:border-white/20'
              }`}
              style={tab===t.key ? {background:'linear-gradient(160deg,rgba(139,92,246,0.18),rgba(99,102,241,0.06))'} : {background:'rgba(255,255,255,0.03)'}}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${tab===t.key?'momentum-glow':''}`}
                style={{background: tab===t.key ? 'rgba(165,180,252,0.18)' : 'rgba(255,255,255,0.06)'}}>
                <t.icon size={16} className={tab===t.key?'text-violet-200':'text-white/40'} strokeWidth={2}/>
              </div>
              <p className="font-bungee text-sm text-white">{t.label}</p>
              <p className="font-mono text-[10px] text-white/35 mt-0.5">{t.desc}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="dark-card p-6">
            <label className="font-mono text-[11px] font-bold text-white/50 uppercase tracking-wider mb-2 block">Input Content</label>
            <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder={placeholders[tab]} rows={11}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white leading-relaxed resize-none outline-none focus:border-violet-400/50 transition-colors placeholder:text-white/25"/>
            {tab==='plan'&&(
              <div className="mt-4">
                <label className="font-mono text-[11px] font-bold text-white/50 uppercase tracking-wider mb-2 block">Study Duration</label>
                <div className="flex gap-2">
                  {['3','5','7','14','30'].map(d=>(
                    <button key={d} onClick={()=>setDays(d)}
                      className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold transition-all border ${
                        days===d ? 'bg-violet-500/20 text-violet-200 border-violet-400/40' : 'text-white/40 border-white/10 hover:border-white/25'
                      }`}>{d}d</button>
                  ))}
                </div>
              </div>
            )}
            {error&&<p className="font-mono text-xs text-red-300 mt-3">{error}</p>}
            <button onClick={run} disabled={loading||!input.trim()} className="luxury-btn w-full mt-4 flex items-center justify-center gap-2">
              {loading?(<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Generating...</>):(<><Wand2 size={14}/>Generate</>)}
            </button>
          </div>

          <div className="dark-card p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="font-mono text-[11px] font-bold text-white/50 uppercase tracking-wider">AI Result</label>
              {result&&(<button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 transition-colors">
                {copied?<Check size={12} className="text-emerald-400"/>:<Copy size={12} className="text-white/40"/>}
                <span className="font-mono text-[10px] text-white/50">{copied?'Copied!':'Copy'}</span>
              </button>)}
            </div>
            {loading?(
              <div className="flex flex-col items-center justify-center h-72 gap-4">
                <div className="relative w-16 h-16">
                  <div className="w-16 h-16 border-2 border-violet-500/20 border-t-violet-400 rounded-full animate-spin absolute"/>
                  <div className="w-16 h-16 flex items-center justify-center"><Sparkles size={20} className="text-violet-300"/></div>
                </div>
                <p className="font-bungee text-sm text-white/40">Thinking...</p>
              </div>
            ):result?(
              <div className="h-80 overflow-y-auto pr-1"><p className="font-mono text-xs text-white/80 leading-relaxed whitespace-pre-wrap">{result}</p></div>
            ):(
              <div className="flex flex-col items-center justify-center h-72 border border-dashed border-white/10 rounded-xl">
                <Sparkles size={28} className="text-white/15 mb-2 empty-state-icon"/>
                <p className="font-mono text-xs text-white/25">Your AI result will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}