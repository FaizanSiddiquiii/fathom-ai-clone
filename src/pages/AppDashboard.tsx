import { useState } from 'react';
import { mockMeetings } from '../data/mockData';
import { Search, Folder, MessageSquare, ListTodo, Video, CheckCircle2, Circle, Clock, PlayCircle, Plus, Settings, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function AppDashboard() {
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript'>('summary');
  const [selectedMeetingId, setSelectedMeetingId] = useState(mockMeetings[0].id);
  const [actionItemsState, setActionItemsState] = useState<Record<string, boolean>>({});

  const selectedMeeting = mockMeetings.find(m => m.id === selectedMeetingId) || mockMeetings[0];

  const toggleActionItem = (id: string) => {
    setActionItemsState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white pt-[72px]"> {/* Account for fixed navbar */}
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 flex flex-col bg-black">
        <div className="p-5 border-b border-white/10 mb-2">
          <Link to="/" className="flex items-center gap-2 group w-max">
            <svg width="24" height="24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <path d="M60 0C93.137 0 120 26.863 120 60C120 93.137 93.137 120 60 120C26.863 120 0 93.137 0 60C0 26.863 26.863 0 60 0Z" fill="url(#paint0_linear_app)"/>
              <path d="M42.5 35H82.5V47.5H55V57.5H75V70H55V85H42.5V35Z" fill="white"/>
              <defs>
                <linearGradient id="paint0_linear_app" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
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
        <div className="px-4 pb-4">
          <button className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#262626] border border-white/10 rounded-lg py-2.5 transition-colors font-medium">
            <Plus className="w-4 h-4" /> New Folder
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-3 space-y-1 mb-8">
            <p className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Library</p>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white bg-white/10 rounded-md">
              <Video className="w-4 h-4 text-fathom-cyan" /> All Meetings
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-md transition-colors">
              <Folder className="w-4 h-4" /> My Folders
            </button>
            <Link to="/app/ask-fathom" className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-md transition-colors">
              <MessageSquare className="w-4 h-4" /> Ask Fathom
            </Link>
          </div>
        </div>

        {/* User Profile Area */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fathom-purple to-fathom-pink flex items-center justify-center text-sm font-bold shadow-inner">
              AJ
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Alex Johnson</p>
              <p className="text-xs text-white/40 truncate">Free Plan</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Link to="/pricing" className="flex-1 flex justify-center items-center py-2 text-xs text-white/60 hover:text-white bg-white/5 rounded-md transition-colors">
              <Settings className="w-4 h-4" />
            </Link>
            <Link to="/" className="flex-1 flex justify-center items-center py-2 text-xs text-white/60 hover:text-white bg-white/5 rounded-md transition-colors">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Middle Column: Meeting List */}
      <div className="w-80 border-r border-white/10 flex flex-col bg-[#0f0f0f]">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search meetings..." 
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-md pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {mockMeetings.map((meeting) => (
            <button
              key={meeting.id}
              onClick={() => setSelectedMeetingId(meeting.id)}
              className={cn(
                "w-full text-left p-4 border-b border-white/5 hover:bg-white/5 transition-colors",
                selectedMeetingId === meeting.id ? "bg-white/10 border-l-2 border-l-fathom-cyan" : ""
              )}
            >
              <h3 className="text-sm font-semibold text-white mb-1 truncate">{meeting.title}</h3>
              <div className="flex items-center text-xs text-white/50 mb-2 gap-2">
                <span>{meeting.date}</span>
                <span>•</span>
                <span>{meeting.type}</span>
              </div>
              <p className="text-xs text-white/40 truncate">
                {meeting.participants.join(', ')}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Meeting Detail */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
        {/* Meeting Header */}
        <div className="p-6 lg:p-8 border-b border-white/10">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6">{selectedMeeting.title}</h1>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-white/60">
            <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-white/5">
              <Clock className="w-4 h-4 text-fathom-cyan" /> 
              <span className="font-medium text-white/80">{selectedMeeting.date}</span>
              <span className="text-white/40 ml-1">({selectedMeeting.time})</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {selectedMeeting.participants.slice(0, 3).map((p, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-[#262626] border border-[#0a0a0a] flex items-center justify-center text-[10px] font-bold text-white uppercase" title={p}>
                    {p.charAt(0)}
                  </div>
                ))}
                {selectedMeeting.participants.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-[#0a0a0a] flex items-center justify-center text-[10px] text-white/60">
                    +{selectedMeeting.participants.length - 3}
                  </div>
                )}
              </div>
              <span className="text-white/80 font-medium">{selectedMeeting.participants.length} Participants</span>
            </div>
            <button className="flex items-center gap-2 hover:text-white transition-colors">
              <PlayCircle className="w-4 h-4" /> Watch Recording
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-white/10 flex gap-6">
          <button 
            onClick={() => setActiveTab('summary')}
            className={cn(
              "py-4 text-sm font-medium transition-colors relative",
              activeTab === 'summary' ? "text-fathom-cyan" : "text-white/60 hover:text-white"
            )}
          >
            Summary & Action Items
            {activeTab === 'summary' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-fathom-cyan rounded-t-full"></span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('transcript')}
            className={cn(
              "py-4 text-sm font-medium transition-colors relative",
              activeTab === 'transcript' ? "text-fathom-cyan" : "text-white/60 hover:text-white"
            )}
          >
            Transcript
            {activeTab === 'transcript' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-fathom-cyan rounded-t-full"></span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'summary' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Summary Column */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-fathom-cyan" /> Meeting Summary
                  </h2>
                  <div className="bg-[#141414] border border-white/5 rounded-xl p-5 text-white/80 leading-relaxed text-sm">
                    {selectedMeeting.summary}
                  </div>
                </section>
                
                <section>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-fathom-purple" /> Key Points
                  </h2>
                  <div className="bg-[#141414] border border-white/5 rounded-xl p-5 text-sm">
                    <ul className="space-y-3">
                      {selectedMeeting.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex gap-3 text-white/80">
                          <span className="text-fathom-purple mt-0.5">•</span> {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>

              {/* Action Items Column */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white mb-4">Action Items</h2>
                <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
                  {selectedMeeting.actionItems.map(item => {
                    const isCompleted = actionItemsState[item.id] ?? item.completed;
                    return (
                      <button 
                        key={item.id}
                        onClick={() => toggleActionItem(item.id)}
                        className="w-full flex items-start gap-3 p-4 border-b border-white/5 hover:bg-white/5 transition-colors text-left"
                      >
                        <div className="mt-0.5 shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-white/30" />
                          )}
                        </div>
                        <span className={cn(
                          "text-sm", 
                          isCompleted ? "text-white/40 line-through" : "text-white/80"
                        )}>
                          {item.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {selectedMeeting.transcript.map((line, idx) => (
                <div key={idx} className="flex gap-4 group hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                  <div className="w-12 pt-0.5 shrink-0 text-xs text-white/40 font-mono">
                    {line.time}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/80 mb-1">{line.speaker}</div>
                    <div className="text-sm text-white/70 leading-relaxed">{line.text}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
