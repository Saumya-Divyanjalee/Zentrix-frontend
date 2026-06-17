import { Link } from 'react-router-dom';
import { GraduationCap, CheckSquare, FileText, Sparkles, BarChart3, ArrowRight, Star } from 'lucide-react';

const features = [
  {icon:CheckSquare,title:'Smart Tasks',desc:'Priority-based task management with deadlines and subject categorization.',color:'text-primary-600',bg:'bg-primary-50'},
  {icon:FileText,title:'Study Notes',desc:'Organize notes by subject. Rich editor with AI-powered summarization.',color:'text-violet-600',bg:'bg-violet-50'},
  {icon:Sparkles,title:'AI Assistant',desc:'Gemini AI summarizes notes, generates quizzes, creates study plans.',color:'text-amber-600',bg:'bg-amber-50'},
  {icon:BarChart3,title:'Analytics',desc:'Track productivity with beautiful charts and performance insights.',color:'text-emerald-600',bg:'bg-emerald-50'},
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100 sticky top-0 bg-white/80 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
            <GraduationCap size={18} color="white" strokeWidth={2.5}/>
          </div>
          <div>
            <h1 className="font-bungee text-sm text-zinc-900 leading-none">StudyFlow AI</h1>
            <p className="font-mono text-[9px] text-zinc-400 tracking-widest">PREMIUM EDITION</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="font-mono text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors px-4 py-2">Sign in</Link>
          <Link to="/register" className="luxury-btn text-xs py-2.5 px-5 flex items-center gap-2">Get Started <ArrowRight size={12}/></Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-4 py-28 max-w-4xl mx-auto animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-200 bg-primary-50 mb-8">
          <Sparkles size={12} className="text-primary-500"/>
          <span className="font-mono text-xs font-bold text-primary-700 tracking-wider">POWERED BY GOOGLE GEMINI AI</span>
        </div>
        <h1 className="font-bungee text-6xl text-zinc-900 leading-tight mb-6">
          Study Smarter.<br/>
          <span className="gradient-text">Achieve More.</span>
        </h1>
        <p className="font-mono text-sm text-zinc-500 max-w-xl mx-auto mb-10 leading-relaxed">
          The premium AI-powered productivity platform for students who demand excellence. Manage tasks, organize notes, and let AI accelerate your learning.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/register" className="luxury-btn flex items-center gap-2 text-sm px-8 py-4">
            Start for Free <ArrowRight size={15}/>
          </Link>
          <Link to="/login" className="font-mono text-sm font-bold text-zinc-500 hover:text-zinc-800 transition-colors flex items-center gap-2 px-6 py-4 rounded-xl border border-zinc-200 hover:border-zinc-300">
            Sign in
          </Link>
        </div>
        <div className="flex items-center justify-center gap-1 mt-8">
          {[...Array(5)].map((_,i)=><Star key={i} size={14} fill="#f59e0b" className="text-amber-400"/>)}
          <span className="font-mono text-xs text-zinc-400 ml-2">Trusted by students worldwide</span>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bungee text-3xl text-zinc-900 mb-2">Everything You Need</h2>
          <p className="font-mono text-xs text-zinc-400 tracking-wider">PREMIUM FEATURES</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {features.map(f=>(
            <div key={f.title} className="luxury-card p-6">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.bg}`}>
                <f.icon size={20} className={f.color} strokeWidth={2}/>
              </div>
              <h3 className="font-bungee text-lg text-zinc-900 mb-2">{f.title}</h3>
              <p className="font-mono text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 max-w-2xl mx-auto text-center">
        <div className="luxury-card p-14" style={{background:'linear-gradient(145deg,#f8f7ff,#f0f4ff)'}}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
            <GraduationCap size={24} color="white"/>
          </div>
          <h2 className="font-bungee text-3xl text-zinc-900 mb-3">Ready to Excel?</h2>
          <p className="font-mono text-xs text-zinc-500 mb-8 leading-relaxed">Join students who are achieving more with AI-powered study tools.</p>
          <Link to="/register" className="luxury-btn inline-flex items-center gap-2 text-sm px-10 py-4">
            Create Free Account <ArrowRight size={14}/>
          </Link>
        </div>
      </section>

      <footer className="text-center py-8 border-t border-zinc-100">
        <p className="font-mono text-xs text-zinc-400 tracking-wider">© 2026 STUDYFLOW AI — PREMIUM EDITION</p>
      </footer>
    </div>
  );
}
