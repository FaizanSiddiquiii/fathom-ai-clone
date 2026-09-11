import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export default function Auth({ mode = 'login' }: { mode?: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app we would redirect here, but we will just simulate success
      window.location.href = '/app';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center items-center py-12 px-6">
      <Link to="/" className="mb-8 flex items-center text-2xl font-bold tracking-tight text-white">
        <span className="text-fathom-cyan mr-2">●</span> Fathom
      </Link>
      
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          {mode === 'login' ? 'Welcome back' : 'Create your free account'}
        </h2>
        <p className="text-white/60 text-sm text-center mb-8">
          {mode === 'login' 
            ? "Don't have an account? " 
            : "Already have an account? "}
          <Link 
            to={mode === 'login' ? '/signup' : '/login'} 
            className="text-fathom-cyan hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </Link>
        </p>

        <div className="space-y-4 mb-6">
          <button className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-lg hover:bg-white/90 transition-colors">
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 bg-[#262626] text-white font-semibold py-3 rounded-lg hover:bg-[#333333] transition-colors border border-white/10">
            Continue with Microsoft
          </button>
        </div>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink-0 mx-4 text-white/40 text-xs uppercase">or</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Work Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fathom-cyan transition-colors"
              placeholder="you@company.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fathom-cyan transition-colors"
              placeholder="••••••••"
            />
          </div>

          <Button 
            variant="gradient" 
            className="w-full py-3 rounded-lg mt-4 font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Please wait...' : (mode === 'login' ? 'Log in' : 'Sign up free')}
          </Button>
        </form>
      </div>
    </div>
  );
}
