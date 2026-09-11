import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is Fathom actually free?",
      a: "Yes! Fathom is free for individuals. You get unlimited recordings, transcriptions, and AI summaries for free. We make money from our Team and Enterprise plans which offer advanced features for organizations."
    },
    {
      q: "Does Fathom have a bot that joins my calls?",
      a: "No! Fathom's desktop app records directly from your computer's audio and video streams, so there is no bot joining your calls. It's completely invisible to other participants."
    },
    {
      q: "What video conferencing platforms are supported?",
      a: "Fathom works seamlessly with Zoom, Google Meet, and Microsoft Teams. Our desktop app automatically detects when a meeting starts on any of these platforms."
    },
    {
      q: "Is my meeting data secure?",
      a: "Absolutely. We are SOC2 Type II certified and fully compliant with GDPR and HIPAA. Your meeting data is encrypted in transit and at rest, and we never sell your data."
    },
    {
      q: "Can I search across all my past meetings?",
      a: "Yes! Fathom creates a searchable knowledge base of all your conversations. You can use Ask Fathom to search for specific topics, decisions, or customer objections across your entire meeting history."
    }
  ];

  return (
    <section className="py-32 relative z-10 max-w-3xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Frequently asked questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className="border border-white/10 bg-[#121212] rounded-2xl overflow-hidden transition-colors hover:border-white/20"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none"
            >
              <span className="text-lg font-medium text-white/90">{faq.q}</span>
              <ChevronDown 
                className={cn("w-5 h-5 text-white/50 transition-transform duration-300", openIdx === idx ? "rotate-180" : "rotate-0")} 
              />
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-white/70 leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
