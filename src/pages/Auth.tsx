import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Video, CheckCircle2 } from 'lucide-react';

export default function Auth({ mode = 'login' }: { mode?: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: form, 2: calendar, 3: platform, 4: ready
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      if (mode === 'login') {
        navigate('/app');
      } else {
        setStep(2);
      }
    }, 800);
  };

  const handleNextStep = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(prev => prev + 1);
    }, 600);
  };

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        navigate('/app');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center items-center py-12 px-6">
      <Link to="/" className="mb-8 flex items-center text-2xl font-bold tracking-tight text-white">
        <span className="text-fathom-cyan mr-2">●</span> Fathom
      </Link>
      
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-white/10">
        {step === 1 && (
          <>
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
          </>
        )}

        {step === 2 && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Calendar className="w-6 h-6 text-fathom-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Connect your calendar</h2>
            <p className="text-white/60 text-sm mb-8">
              Fathom needs access to your calendar to know when your meetings are happening.
            </p>
            <div className="space-y-3">
              <button onClick={handleNextStep} disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-lg hover:bg-white/90 transition-colors">
                Connect Google Calendar
              </button>
              <button onClick={handleNextStep} disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 bg-[#262626] text-white font-semibold py-3 rounded-lg hover:bg-[#333333] transition-colors border border-white/10">
                Connect Outlook Calendar
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Video className="w-6 h-6 text-fathom-purple" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Primary Video Platform</h2>
            <p className="text-white/60 text-sm mb-8">
              Which platform do you use for most of your meetings?
            </p>
            <div className="space-y-3">
              <button onClick={handleNextStep} disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 bg-[#2D8CFF] text-white font-semibold py-3 rounded-lg hover:bg-[#2D8CFF]/90 transition-colors">
                Zoom
              </button>
              <button onClick={handleNextStep} disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 bg-[#0078D4] text-white font-semibold py-3 rounded-lg hover:bg-[#0078D4]/90 transition-colors">
                Microsoft Teams
              </button>
              <button onClick={handleNextStep} disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 bg-[#0F9D58] text-white font-semibold py-3 rounded-lg hover:bg-[#0F9D58]/90 transition-colors">
                Google Meet
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 bg-fathom-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-fathom-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">You're all set!</h2>
            <p className="text-white/60 text-sm">
              Redirecting you to your dashboard...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

