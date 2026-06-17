import { Link } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center animate-slide-up">
        <div className="w-20 h-20 rounded-3xl bg-zinc-100 flex items-center justify-center mx-auto mb-6">
          <Search size={32} className="text-zinc-300"/>
        </div>
        <h1 className="font-bungee text-6xl text-zinc-900 mb-2">404</h1>
        <h2 className="font-bungee text-xl text-zinc-500 mb-3">Page Not Found</h2>
        <p className="font-mono text-xs text-zinc-400 mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/dashboard" className="luxury-btn inline-flex items-center gap-2">
          <ArrowLeft size={14}/> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
