import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Search, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const INTEGRATIONS = [
  { id: '1', name: 'Zoom', desc: 'Native bot-free recording for Zoom. Capture meetings effortlessly.', cat: 'Video', src: 'https://www.vectorlogo.zone/logos/zoom/zoom-icon.svg' },
  { id: '2', name: 'Google Meet', desc: 'Seamlessly record and transcribe your Google Meet calls.', cat: 'Video', src: 'https://www.vectorlogo.zone/logos/google_meet/google_meet-icon.svg' },
  { id: '3', name: 'Microsoft Teams', desc: 'Bring Fathom intelligence to your MS Teams conversations.', cat: 'Video', src: 'https://www.vectorlogo.zone/logos/microsoft_teams/microsoft_teams-icon.svg' },
  { id: '4', name: 'Salesforce', desc: 'Automatically log calls, summaries, and transcripts to Salesforce records.', cat: 'CRM', src: 'https://www.vectorlogo.zone/logos/salesforce/salesforce-icon.svg' },
  { id: '5', name: 'HubSpot', desc: 'Sync meeting summaries and action items directly to HubSpot contacts and deals.', cat: 'CRM', src: 'https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg' },
  { id: '6', name: 'Slack', desc: 'Share meeting highlights and summaries instantly with your Slack channels.', cat: 'Communication', src: 'https://www.vectorlogo.zone/logos/slack/slack-icon.svg' },
  { id: '7', name: 'Asana', desc: 'Turn Fathom action items into Asana tasks automatically.', cat: 'Project Management', src: 'https://www.vectorlogo.zone/logos/asana/asana-icon.svg' },
  { id: '8', name: 'Notion', desc: 'Send full meeting transcripts and summaries to Notion databases.', cat: 'Knowledge Base', src: 'https://www.vectorlogo.zone/logos/notion/notion-icon.svg' },
  { id: '9', name: 'ChatGPT', desc: 'Query your Fathom meeting data directly within ChatGPT.', cat: 'AI', src: 'https://cdn.iconscout.com/icon/free/png-256/free-chatgpt-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-1-pack-logos-icons-2944937.png' },
  { id: '10', name: 'Claude', desc: 'Summarize or extract insights from Fathom transcripts using Anthropic Claude.', cat: 'AI', src: 'https://mintlify.s3-us-west-1.amazonaws.com/anthropic/logo/dark.svg' },
  { id: '11', name: 'Superhuman', desc: 'Draft follow-up emails instantly using your meeting context.', cat: 'Productivity', src: 'https://logospng.org/download/superhuman/superhuman-4096.png' },
  { id: '12', name: 'Zapier', desc: 'Connect Fathom to 5,000+ apps to build custom workflows.', cat: 'Automation', src: 'https://www.vectorlogo.zone/logos/zapier/zapier-icon.svg' },
  { id: '13', name: 'Make', desc: 'Design visually-driven workflows with your Fathom data.', cat: 'Automation', src: 'https://img.icons8.com/color/48/make-hq.png' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Integrations() {
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectedIds, setConnectedIds] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(INTEGRATIONS.map(i => i.cat)))];

  const handleConnect = (id: string) => {
    setConnectingId(id);
    setTimeout(() => {
      setConnectingId(null);
      setConnectedIds(prev => ({ ...prev, [id]: true }));
    }, 1500);
  };

  const filteredIntegrations = INTEGRATIONS.filter(i => {
    const matchesCategory = filter === 'All' || i.cat === filter;
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          i.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col pt-32 pb-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Works where you work
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Fathom integrates with the tools your team already uses to keep everyone aligned and automate data entry.
          </p>
          <div className="max-w-md mx-auto relative mb-12">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search integrations..." 
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-full pl-12 pr-6 py-4 text-white focus:outline-none focus:border-fathom-cyan transition-colors"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${filter === cat ? 'bg-white text-black border-white' : 'bg-[#1a1a1a] text-white/60 border-white/10 hover:border-white/30 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredIntegrations.map(integration => {
            const isConnected = connectedIds[integration.id];
            const isConnecting = connectingId === integration.id;

            return (
              <motion.div variants={itemVariants} key={integration.id} className="glass-panel p-6 rounded-2xl flex flex-col border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-inner">
                    <img src={integration.src} alt={integration.name} className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-xs font-medium text-white/40 uppercase tracking-wider bg-white/5 px-2 py-1 rounded">
                    {integration.cat}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{integration.name}</h3>
                <p className="text-sm text-white/60 mb-8 flex-1">{integration.desc}</p>
                
                {isConnected ? (
                  <Button variant="ghost" className="w-full justify-center gap-2 text-green-400 hover:text-green-300 hover:bg-green-400/10 border border-green-400/20">
                    <CheckCircle2 className="w-4 h-4" /> Connected
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
                    disabled={isConnecting}
                    onClick={() => handleConnect(integration.id)}
                  >
                    {isConnecting ? (
                      'Connecting...'
                    ) : (
                      <><LinkIcon className="w-4 h-4" /> Connect</>
                    )}
                  </Button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
