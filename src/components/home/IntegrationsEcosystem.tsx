import { motion } from 'framer-motion';

export default function IntegrationsEcosystem() {
  const integrations = [
    { name: "Zoom", icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Zoom_Logo.png", x: -140, y: -100 },
    { name: "Google Meet", icon: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg", x: 140, y: -100 },
    { name: "Microsoft Teams", icon: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg", x: -200, y: 0 },
    { name: "Slack", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg", x: 200, y: 0 },
    { name: "HubSpot", icon: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg", x: -140, y: 100 },
    { name: "Salesforce", icon: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg", x: 140, y: 100 },
  ];

  return (
    <section className="py-40 relative z-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">Works wherever you work</h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">Fathom connects your meetings to the tools your team already uses every day.</p>
        </div>

        <div className="relative h-[400px] flex items-center justify-center max-w-3xl mx-auto">
          {/* Central Fathom Node */}
          <div className="relative z-20 w-32 h-32 rounded-3xl bg-gradient-to-br from-[#00b4f0] to-[#0073a8] flex items-center justify-center shadow-[0_0_80px_rgba(0,180,240,0.4)]">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 50 V80 A 12 12 0 0 0 44 80 V60 Z" fill="white"/>
              <rect x="20" y="20" width="70" height="24" rx="12" transform="rotate(25 20 20)" fill="white"/>
              <rect x="20" y="55" width="55" height="24" rx="12" transform="rotate(25 20 55)" fill="white"/>
            </svg>
          </div>

          {/* Connection Lines (Decorative) */}
          <div className="absolute inset-0 z-0">
            {integrations.map((_, i) => (
               <motion.div 
                 key={i}
                 className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-fathom-cyan/20 to-transparent -translate-x-1/2 -translate-y-1/2"
                 style={{ rotate: `${i * (360 / integrations.length)}deg` }}
               />
            ))}
          </div>

          {/* Integration Nodes */}
          {integrations.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.1 }}
              className="absolute z-10 w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-xl cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
              style={{
                transform: `translate(${app.x}px, ${app.y}px)`,
              }}
            >
              {app.name === 'Zoom' && <img src={app.icon} alt={app.name} className="w-12 h-12 object-contain" />}
              {app.name === 'Google Meet' && <img src={app.icon} alt={app.name} className="w-10 h-10 object-contain" />}
              {app.name === 'Microsoft Teams' && <img src={app.icon} alt={app.name} className="w-10 h-10 object-contain" />}
              {app.name === 'Slack' && <img src={app.icon} alt={app.name} className="w-10 h-10 object-contain" />}
              {app.name === 'HubSpot' && <img src={app.icon} alt={app.name} className="w-10 h-10 object-contain" />}
              {app.name === 'Salesforce' && <img src={app.icon} alt={app.name} className="w-12 h-12 object-contain" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
