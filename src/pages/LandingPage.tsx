import { Link } from 'react-router-dom';
import { GraduationCap, CheckSquare, FileText, Sparkles, BarChart3, ArrowRight, Star, Flame, Target, Clock, Zap } from 'lucide-react';
import HeroIllustration from '../components/ui/HeroIllustration';
import CountUp from '../components/ui/CountUp';
import { useInView } from '../hooks/useInView';

const features = [
  {icon:CheckSquare,title:'Smart Tasks',desc:'Priority-based task management with deadlines and subject categorization loops.',color:'text-indigo-400',bg:'bg-indigo-500/10 border-indigo-500/20'},
  {icon:FileText,title:'Study Notes',desc:'Organize notes by subject structure. Advanced editor with AI summarization.',color:'text-purple-400',bg:'bg-purple-500/10 border-purple-500/20'},
  {icon:Sparkles,title:'AI Assistant',desc:'Gemini AI core engines compile note data dumps, quizzes, and dynamic vectors.',color:'text-amber-400',bg:'bg-amber-500/10 border-amber-500/20'},
  {icon:BarChart3,title:'Analytics',desc:'Track efficiency velocity benchmarks with beautiful charts and data nodes.',color:'text-emerald-400',bg:'bg-emerald-500/10 border-emerald-500/20'},
];

const momentum = [
  {icon:Flame,value:42000,suffix:'+',label:'Operational sessions logged this month'},
  {icon:Target,value:98,suffix:'%',label:'Of target objectives neutralized on time'},
  {icon:Clock,value:6,suffix:'min',label:'Average deployment execution latency'},
];

export default function LandingPage() {
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>(0.4);
  const { ref: featuresRef, inView: featuresInView } = useInView<HTMLDivElement>(0.15);

  return (
    <div className="dark-surface w-full min-h-screen bg-[#090d16] text-slate-100 selection:bg-indigo-500/30">
      {/* Premium Navigation Terminal Header */}
      <nav className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-900 sticky top-0 bg-[#090d16]/80 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
            <GraduationCap size={20} color="white" strokeWidth={2.5}/>
          </div>
          <div>
            <h1 className="font-bungee text-base text-white tracking-wide leading-none">Zentrix</h1>
            <p className="font-mono text-[10px] text-slate-400 font-bold tracking-widest mt-1">PREMIUM EDITION CORE</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="font-mono text-sm font-black text-slate-400 hover:text-white transition-all px-4 py-2 uppercase tracking-wider">Sign In</Link>
          <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-black text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2">
            Get Started <ArrowRight size={14} strokeWidth={2.5}/>
          </Link>
        </div>
      </nav>

      {/* Main Feature Hero Core Arena Section */}
      <section className="px-6 sm:px-8 py-20 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-slide-up relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl ambient-blob -z-10" />
        
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 shadow-lg shadow-amber-400/5">
            <Sparkles size={13} className="text-amber-400 animate-pulse"/>
            <span className="font-mono text-xs font-black text-amber-300 tracking-wider">POWERED BY GOOGLE GEMINI AI ARCHITECTURE</span>
          </div>
          
          <h1 className="font-bungee text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-wide">
            Study Smarter.<br/>
            <span className="text-indigo-400 dark-glow-indigo">Execute Faster.</span>
          </h1>
          
          <p className="font-mono text-sm text-slate-300 max-w-md leading-relaxed font-bold">
            The premium AI-powered productivity framework for developers and engineering students who demand absolute execution excellence. Optimize data streams, structure objectives, and let dynamic logic accelerate your pipeline.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-black text-sm uppercase tracking-wider text-center py-4 px-8 rounded-xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2">
              Initialize Free Instance <ArrowRight size={16} strokeWidth={2.5}/>
            </Link>
            <Link to="/login" className="font-mono text-sm font-black text-slate-300 hover:text-white transition-all text-center py-4 px-6 rounded-xl border-2 border-slate-800 bg-transparent hover:border-slate-700 uppercase tracking-wider">
              Access Console
            </Link>
          </div>
          
          <div className="flex items-center gap-1 pt-4">
            {[...Array(5)].map((_,i)=><Star key={i} size={14} fill="#f59e0b" className="text-amber-400 shadow-sm"/>)}
            <span className="font-mono text-xs font-black text-slate-400 ml-2 uppercase tracking-wide">✦ TRUSTED BY NEXT-GEN DEVELOPERS WORLDWIDE</span>
          </div>
        </div>
        
        <div className="max-w-md mx-auto lg:max-w-none w-full">
          <HeroIllustration />
        </div>
      </section>

      {/* Numerical Data Momentum Stats Module */}
      <div ref={statsRef} className="px-6 sm:px-8 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {momentum.map((m, i) => (
            <div 
              key={m.label}
              className="dark-card p-6 text-center transition-all bg-white/[0.01] border border-white/5"
              style={{
                animation: statsInView ? `riseUp 0.5s cubic-bezier(.16,1,.3,1) ${i * 0.12}s forwards` : 'none',
                opacity: statsInView ? undefined : 0,
              }}
            >
              <m.icon size={20} className="text-indigo-400 mx-auto mb-3" strokeWidth={2.5}/>
              <div className="font-mono text-3xl font-black text-white dark-glow-violet">
                <CountUp to={m.value} suffix={m.suffix} start={statsInView} />
              </div>
              <p className="font-mono text-xs font-bold text-slate-400 mt-2.5 uppercase tracking-wide leading-relaxed">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Operational Features Core Layout */}
      <section ref={featuresRef} className="px-6 sm:px-8 py-20 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-1">
          <h2 className="font-bungee text-3xl text-white tracking-wide">COMPREHENSIVE SUBSYSTEMS</h2>
          <p className="font-mono text-xs font-black text-indigo-400 tracking-widest uppercase">PREMIUM OPERATIONAL MODULES</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f, i)=>(
            <div 
              key={f.title}
              className="dark-card p-6 border border-white/5 bg-white/[0.01]"
              style={{
                animation: featuresInView ? `riseUp 0.5s cubic-bezier(.16,1,.3,1) ${i * 0.1}s forwards` : 'none',
                opacity: featuresInView ? undefined : 0,
              }}
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 transition-transform duration-300 ${f.bg}`}>
                <f.icon size={20} className={f.color} strokeWidth={2.5}/>
              </div>
              <h3 className="font-mono text-base font-black text-white uppercase tracking-wide mb-2">{f.title}</h3>
              <p className="font-mono text-xs text-slate-400 font-bold leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Conversion Block Terminal */}
      <section className="px-6 sm:px-8 py-20 max-w-3xl mx-auto text-center relative">
        <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-3xl ambient-blob -z-10" />
        
        <div className="dark-card p-10 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
            <GraduationCap size={26} color="white" strokeWidth={2.5}/>
          </div>
          <h2 className="font-bungee text-3xl text-white tracking-wide mb-3">READY TO EXECUTE?</h2>
          <p className="font-mono text-sm font-bold text-slate-300 mb-8 max-w-md mx-auto leading-relaxed">Join elite engineering nodes optimizing their execution loops with AI integration loops.</p>
          <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-black text-sm uppercase tracking-wider py-4 px-10 rounded-xl transition-all shadow-xl shadow-indigo-600/20 inline-flex items-center gap-2">
            Deploy Free Clearance Account <ArrowRight size={16} strokeWidth={2.5}/>
          </Link>
        </div>
      </section>

      {/* Technical Footer Module */}
      <footer className="text-center py-10 border-t border-slate-900 bg-slate-950/20">
        <p className="font-mono text-xs font-black text-slate-500 tracking-widest">© 2026 ZENTRIX — PREMIUM SYSTEM CONSOLE</p>
      </footer>
    </div>
  );
}