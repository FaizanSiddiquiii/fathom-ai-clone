import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Check } from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="flex-1 flex flex-col pt-32 pb-24 relative">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Free forever for individuals. Upgrade to Teams for AI-powered CRM updates and team collaboration.
          </p>
          
          <div className="inline-flex items-center bg-[#1a1a1a] border border-white/10 rounded-full p-1 relative">
            <button 
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${isAnnual ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
            >
              Annual (Save 20%)
            </button>
            <button 
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${!isAnnual ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
            <p className="text-white/60 text-sm mb-6 h-10">For individuals who want to never take notes again.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-white/60">/mo</span>
            </div>
            <Button variant="outline" className="w-full mb-8 rounded-xl font-bold">
              Sign Up Free
            </Button>
            <div className="flex-1">
              <ul className="space-y-4 text-sm text-white/80">
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-cyan shrink-0" /> Bot-free capture</li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-cyan shrink-0" /> AI Summaries</li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-cyan shrink-0" /> Full Transcripts</li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-cyan shrink-0" /> Slack & Notion integration</li>
              </ul>
            </div>
          </div>

          {/* Teams Standard */}
          <div className="p-8 rounded-3xl flex flex-col gradient-border-multi relative">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-fathom-purple to-fathom-pink text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl">POPULAR</div>
            <h3 className="text-xl font-semibold text-white mb-2">Standard</h3>
            <p className="text-white/60 text-sm mb-6 h-10">For teams looking to automate their CRM.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">${isAnnual ? '24' : '32'}</span>
              <span className="text-white/60">/user/mo</span>
            </div>
            <Button variant="gradient" className="w-full mb-8 rounded-xl font-bold">
              Start Free Trial
            </Button>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white mb-4">Everything in Free, plus:</p>
              <ul className="space-y-4 text-sm text-white/80">
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-pink shrink-0" /> Automated CRM Sync (HubSpot, Salesforce)</li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-pink shrink-0" /> Team Highlights & Playlists</li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-pink shrink-0" /> Ask Fathom across team calls</li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-pink shrink-0" /> Custom vocabulary</li>
              </ul>
            </div>
          </div>

          {/* Teams Pro */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
            <p className="text-white/60 text-sm mb-6 h-10">Advanced security and admin controls.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">${isAnnual ? '39' : '49'}</span>
              <span className="text-white/60">/user/mo</span>
            </div>
            <Button variant="outline" className="w-full mb-8 rounded-xl font-bold">
              Start Free Trial
            </Button>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white mb-4">Everything in Standard, plus:</p>
              <ul className="space-y-4 text-sm text-white/80">
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-yellow shrink-0" /> SOC 2 Type II Reports</li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-yellow shrink-0" /> SSO / SCIM Provisioning</li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-yellow shrink-0" /> Advanced data retention</li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-fathom-yellow shrink-0" /> Priority Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
