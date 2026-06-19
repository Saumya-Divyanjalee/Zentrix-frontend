import { useState } from 'react';
import { Sparkles, FileText, HelpCircle, Calendar, Copy, Check, Wand2, Zap } from 'lucide-react';
import api from '../../api/axiosInstance';

type Tab = 'summarize'|'quiz'|'plan';
const tabs = [
  {key:'summarize' as Tab,icon:FileText,label:'Summarizer',desc:'Turn notes into bullet points',emoji:'📝'},
  {key:'quiz' as Tab,icon:HelpCircle,label:'Quiz Generator',desc:'Generate MCQs from content',emoji:'🧠'},
  {key:'plan' as Tab,icon:Calendar,label:'Study Planner',desc:'Create personalized study plans',emoji:'🗓️'},
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
    <div className="space-y-6 animate-slide-up relative">
      <div className="relative overflow-hidden rounded-3xl p-7 sm:p-9" style={{background:'linear-gradient(120deg,#6366f1 0%,#8b5cf6 45%,#ec4899 100%)'}}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl ambient-blob" style={{background:'#fff'}}/>
        <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full opacity-15 blur-3xl ambient-blob" style={{background:'#fbbf24', animationDelay:'3s'}}/>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 mb-4">
            <Zap size={12} className="text-amber-300 spark-dot" fill="currentColor"/>
            <span className="font-mono text-[10px] font-bold text-white tracking-wider">POWERED BY GOOGLE GEMINI ✨</span>
          </div>
          <h1 className="font-bungee text-3xl sm:text-4xl text-white mb-2">AI Study Room 🤖</h1>
          <p className="font-mono text-sm text-white/80">Your personal AI sidekick — summarize, quiz yourself, and plan smarter.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tabs.map(t=>(
          <button key={t.key} onClick={()=>{setTab(t.key);setResult('');setError('');setInput('');}}
            className={`p-5 rounded-2xl text-left transition-all duration-200 border-2 ${
              tab===t.key ? 'border-transparent shadow-lg' : 'border-zinc-100 bg-white hover:border-violet-200'
            }`}
            style={tab===t.key ? {background:'linear-gradient(135deg,#eef2ff,#fdf4ff)', boxShadow:'0 8px 30px rgba(139,92,246,0.18)'} : undefined}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${tab===t.key?'momentum-glow':''}`}
                style={{background: tab===t.key ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : '#f4f4f5'}}>
                {tab===t.key ? <span>{t.emoji}</span> : <t.icon size={16} className="text-zinc-400" strokeWidth={2}/>}
              </div>
            </div>
            <p className="font-bungee text-sm text-zinc-900">{t.label}</p>
            <p className="font-mono text-[10px] text-zinc-500 mt-0.5">{t.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="luxury-card p-6 border-2 border-violet-100">
          <label className="luxury-label flex items-center gap-1.5">✍️ Input Content</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder={placeholders[tab]} rows={11} className="luxury-input resize-none mt-1 text-xs leading-relaxed"/>
          {tab==='plan'&&(
            <div className="mt-4">
              <label className="luxury-label">Study Duration</label>
              <div className="flex gap-2 mt-1">
                {['3','5','7','14','30'].map(d=>(
                  <button key={d} onClick={()=>setDays(d)}
                    className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold transition-all border ${
                      days===d ? 'text-white border-transparent shadow-md' : 'bg-white text-zinc-500 border-zinc-200 hover:border-primary-200'
                    }`}
                    style={days===d ? {background:'linear-gradient(135deg,#6366f1,#8b5cf6)'} : undefined}>{d}d</button>
                ))}
              </div>
            </div>
          )}
          {error&&<p className="font-mono text-xs text-red-500 mt-3">⚠️ {error}</p>}
          <button onClick={run} disabled={loading||!input.trim()}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl font-mono text-sm font-bold text-white transition-all disabled:opacity-40"
            style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)', boxShadow: loading||!input.trim() ? 'none' : '0 8px 24px rgba(139,92,246,0.35)'}}>
            {loading?(<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Generating magic...</>):(<><Wand2 size={15}/>Generate ✨</>)}
          </button>
        </div>

        <div className="luxury-card p-6 border-2 border-violet-100">
          <div className="flex items-center justify-between mb-4">
            <label className="luxury-label flex items-center gap-1.5">🎯 AI Result</label>
            {result&&(<button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors">
              {copied?<Check size={12} className="text-emerald-500"/>:<Copy size={12} className="text-zinc-400"/>}
              <span className="font-mono text-[10px] text-zinc-500">{copied?'Copied!':'Copy'}</span>
            </button>)}
          </div>
          {loading?(
            <div className="flex flex-col items-center justify-center h-72 gap-4">
              <div className="relative w-20 h-20">
                <div className="w-20 h-20 rounded-full absolute animate-spin" style={{background:'conic-gradient(from 0deg,#6366f1,#8b5cf6,#ec4899,#6366f1)', mask:'radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 4px))', WebkitMask:'radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 4px))'}}/>
                <div className="w-20 h-20 flex items-center justify-center text-2xl">🤖</div>
              </div>
              <p className="font-bungee text-sm" style={{background:'linear-gradient(135deg,#6366f1,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Thinking...</p>
            </div>
          ):result?(
            <div className="h-80 overflow-y-auto"><p className="font-mono text-xs text-zinc-700 leading-relaxed whitespace-pre-wrap">{result}</p></div>
          ):(
            <div className="flex flex-col items-center justify-center h-72 border-2 border-dashed border-violet-100 rounded-xl" style={{background:'linear-gradient(160deg,#fafaff,#fff)'}}>
              <span className="text-4xl mb-2 empty-state-icon">✨</span>
              <p className="font-mono text-xs text-zinc-400">Your AI result will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}