import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Folder, Video, MessageSquare, ChevronLeft, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useMeetingStore } from '../lib/store';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  citations?: { meetingId: string; title: string }[];
};

const SUGGESTED_PROMPTS = [
  "What did we decide about the Q3 roadmap?",
  "Summarize the feedback from Acme Corp.",
  "Did anyone mention budget constraints?",
  "What are Sarah's action items this week?"
];

export default function AskFathom() {
  const { meetings } = useMeetingStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: 'Hi! I can search across all your meetings to answer questions, write emails, or draft follow-ups. What would you like to know?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, thinkingPhase]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setThinkingPhase('Searching meetings...');

    setTimeout(() => setThinkingPhase('Analyzing transcripts...'), 800);
    setTimeout(() => setThinkingPhase('Synthesizing response...'), 1600);

    setTimeout(() => {
      setIsTyping(false);
      setThinkingPhase('');

      const q = text.toLowerCase();
      // Tokenize the question into searchable keywords (3+ chars, skip stop words)
      const stopWords = new Set(['the','and','was','were','what','when','where','how','did','does','any','about','from','with','that','this','have','been','they','their','there','which','would','could','should','also','just','been','into','some','than']);
      const tokens = q.split(/\W+/).filter(t => t.length >= 3 && !stopWords.has(t));

      // Score each meeting
      type ScoredMeeting = { meeting: typeof meetings[0]; score: number; snippets: { speaker: string; time: string; text: string }[] };
      const scored: ScoredMeeting[] = meetings.map(m => {
        let score = 0;
        const snippets: { speaker: string; time: string; text: string }[] = [];

        for (const token of tokens) {
          if (m.title.toLowerCase().includes(token)) score += 5;
          if (m.company?.toLowerCase().includes(token)) score += 4;
          if (m.summary.toLowerCase().includes(token)) score += 3;
          for (const kp of m.keyPoints) {
            if (kp.toLowerCase().includes(token)) score += 2;
          }
          for (const line of m.transcript) {
            if (line.text.toLowerCase().includes(token)) {
              score += 1;
              if (snippets.length < 3 && !snippets.find(s => s.time === line.time)) {
                snippets.push(line);
              }
            }
          }
          for (const ai of m.actionItems) {
            if (ai.text.toLowerCase().includes(token)) score += 2;
          }
        }
        return { meeting: m, score, snippets };
      }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

      let responseContent: string;
      let citations: { meetingId: string; title: string }[] = [];

      if (scored.length === 0) {
        responseContent = "I couldn't find specific information about that in your recent meetings. Try searching for a topic, person, or company name.";
      } else {
        const top = scored[0];
        const m = top.meeting;
        citations = scored.slice(0, 3).map(s => ({ meetingId: s.meeting.id, title: s.meeting.title }));

        // Build a contextual answer from the best match
        const parts: string[] = [];
        parts.push(`Based on the "${m.title}" meeting${m.company ? ` with ${m.company}` : ''}:\n`);

        // Add relevant key points
        const relevantKPs = m.keyPoints.filter(kp => tokens.some(t => kp.toLowerCase().includes(t)));
        if (relevantKPs.length > 0) {
          parts.push('Key points discussed:');
          relevantKPs.forEach(kp => parts.push(`• ${kp}`));
        }

        // Add relevant transcript snippets
        if (top.snippets.length > 0) {
          parts.push('\nRelevant excerpts from the transcript:');
          top.snippets.slice(0, 2).forEach(s => {
            parts.push(`[${s.time}] ${s.speaker}: "${s.text}"`);
          });
        }

        // Add relevant action items
        const relevantActions = m.actionItems.filter(ai => tokens.some(t => ai.text.toLowerCase().includes(t)));
        if (relevantActions.length > 0) {
          parts.push('\nRelated action items:');
          relevantActions.forEach(ai => {
            parts.push(`${ai.completed ? '✅' : '⬜'} ${ai.text}${ai.assignee ? ` (${ai.assignee})` : ''}`);
          });
        }

        // If we had multiple high-scoring meetings, mention others
        if (scored.length > 1 && scored[1].score > 2) {
          parts.push(`\nThis topic was also discussed in "${scored[1].meeting.title}".`);
        }

        responseContent = parts.join('\n');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responseContent,
        citations: citations.length > 0 ? citations : undefined
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 2400);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white pt-[72px]">
      {/* Sidebar - Same as Dashboard */}
      <div className="w-64 border-r border-white/10 flex flex-col bg-black shrink-0 hidden md:flex">
        <div className="p-5 border-b border-white/10 mb-2">
          <Link to="/" className="flex items-center gap-2 group w-max">
            <svg width="24" height="24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <path d="M60 0C93.137 0 120 26.863 120 60C120 93.137 93.137 120 60 120C26.863 120 0 93.137 0 60C0 26.863 26.863 0 60 0Z" fill="url(#paint0_linear_ask)"/>
              <path d="M42.5 35H82.5V47.5H55V57.5H75V70H55V85H42.5V35Z" fill="white"/>
              <defs>
                <linearGradient id="paint0_linear_ask" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6E56CF"/>
                  <stop offset="1" stopColor="#E93D82"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-[18px] font-bold tracking-tight text-white group-hover:text-white/90 transition-colors">
              Fathom
            </span>
          </Link>
        </div>
        <div className="px-4">
          <Link to="/app" className="w-full flex items-center text-sm text-white/60 hover:text-white mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Meetings
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-3 space-y-1">
            <p className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Library</p>
            <Link to="/app" className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-md transition-colors">
              <Video className="w-4 h-4" /> All Meetings
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-md transition-colors">
              <Folder className="w-4 h-4" /> My Folders
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white bg-white/10 rounded-md">
              <MessageSquare className="w-4 h-4 text-fathom-cyan" /> Ask Fathom
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0a0a0a] relative">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-fathom-pink" />
          <h1 className="text-xl font-bold">Ask Fathom</h1>
          <span className="text-xs px-2 py-1 bg-white/10 text-white/60 rounded-full ml-2">Beta</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-8 pb-32">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-4", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === 'user' ? "bg-white/20 text-white" : "bg-fathom-purple text-white"
                )}>
                  {msg.role === 'user' ? "U" : <Sparkles className="w-4 h-4" />}
                </div>
                <div className={cn(
                  "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-[#262626] text-white rounded-tr-sm" 
                    : "bg-transparent border border-white/10 text-white/90 rounded-tl-sm shadow-xl"
                )}>
                  <p>{msg.content}</p>
                  
                  {/* Citations */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-white/40 font-medium mb-2 uppercase tracking-wider">Sources</p>
                      <div className="flex flex-col gap-2">
                        {msg.citations.map((cit, i) => (
                          <Link key={i} to={`/app/meetings/${cit.meetingId}`} className="flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 p-2 rounded-md transition-colors border border-white/5">
                            <Video className="w-3 h-3 text-fathom-cyan" />
                            <span className="text-white/80">{cit.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-fathom-purple text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-transparent border border-white/10 rounded-2xl rounded-tl-sm p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-xs text-white/50">{thinkingPhase}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
          <div className="max-w-3xl mx-auto">
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 px-3 py-2 rounded-full transition-colors"
                  >
                    <Lightbulb className="w-3 h-3 text-fathom-yellow" /> {prompt}
                  </button>
                ))}
              </div>
            )}
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-fathom-purple to-fathom-pink rounded-xl blur opacity-30 group-focus-within:opacity-60 transition duration-500"></div>
              <div className="relative bg-[#1a1a1a] rounded-xl flex items-center">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                  placeholder="Ask anything about your past meetings..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-white px-6 py-4 text-sm"
                />
                <button 
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim()}
                  className="p-2 mr-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-white"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] text-white/40 mt-3">
              AI can make mistakes. Always verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
