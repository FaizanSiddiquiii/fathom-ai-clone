import { Button } from '../components/ui/Button';

export default function Solutions() {
  return (
    <div className="flex-1 flex flex-col pt-32 pb-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Fathom for Teams
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Automate your team's CRM data entry, build coaching playlists, and query all your team's meetings with Ask Fathom.
          </p>
          <Button variant="gradient" size="lg" className="font-bold">
            Start Team Free Trial
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative aspect-video rounded-2xl overflow-hidden glass-panel p-2 gradient-border-pink-orange">
            <div className="bg-[#141414] w-full h-full rounded-xl flex items-center justify-center text-white/40">
               {/* Simplified mock of product UI */}
               <div className="text-center">
                 <div className="text-4xl mb-4 font-bold text-fathom-pink">Sync to CRM</div>
                 <p className="text-sm">Meeting summary synced to Salesforce.</p>
               </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Automate your CRM</h2>
            <p className="text-xl text-white/60 mb-8">
              Sales reps spend hours doing manual data entry. Fathom syncs summaries, transcripts, and action items directly to the right HubSpot or Salesforce records.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center flex-row-reverse md:flex-row">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Team Intelligence</h2>
            <p className="text-xl text-white/60 mb-8">
              Use Ask Fathom to query across all team meetings. Identify trends, understand why deals are lost, and keep the whole organization aligned.
            </p>
          </div>
          <div className="order-1 md:order-2 relative aspect-video rounded-2xl overflow-hidden glass-panel p-2 gradient-border-purple-pink">
             <div className="bg-[#141414] w-full h-full rounded-xl flex items-center justify-center text-white/40 p-8">
               <div className="w-full text-left bg-[#1a1a1a] p-4 rounded-lg border border-white/10">
                 <div className="font-semibold text-white mb-2">Q: Why did we lose Acme Corp?</div>
                 <div className="text-sm text-white/80">
                   A: Based on recent meetings, Acme Corp churned because our current pricing structure was 20% above their allocated Q3 budget.
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
