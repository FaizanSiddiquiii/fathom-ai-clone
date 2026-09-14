import { useState, useEffect, useMemo } from 'react';
import { Search, Folder, MessageSquare, ListTodo, Video, CheckCircle2, Circle, Clock, Plus, Settings, LogOut, Share2, Play, Pause, Volume2, FastForward, Edit3, X, ChevronDown, Calendar, Scissors, LinkIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMeetingStore } from '../lib/store';
import { getTemplateForUpcoming } from '../data/captureTemplates';

export default function AppDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { 
    meetings, addMeeting, addHighlight, addClip, toggleActionItem, 
    calendarConnected, setCalendarConnected, addCaptureSession 
  } = useMeetingStore();

  const [activeTab, setActiveTab] = useState<'summary' | 'transcript'>('summary');
  
  const selectedMeetingId = id || (meetings.length > 0 ? meetings[0].id : '');
  const selectedMeeting = meetings.find(m => m.id === selectedMeetingId) || meetings[0];

  // Capture Simulation State
  const [captureState, setCaptureState] = useState<'idle' | 'joining' | 'recording' | 'processing'>('idle');
  const [captureTarget, setCaptureTarget] = useState<any>(null);
  const [captureTime, setCaptureTime] = useState(0);

  const upcomingMeetings = calendarConnected ? [
    { id: 'u1', title: 'Acme Corp — Product Discovery', participants: ['Alex J.', 'Sam T.'], platform: 'Zoom', time: 'Today · 3:00 PM' },
    { id: 'u2', title: 'Northstar — Weekly Sync', participants: ['Team'], platform: 'Google Meet', time: 'Today · 4:30 PM' },
    { id: 'u3', title: 'Vertex — Enterprise Demo', participants: ['Sarah W.', 'Client'], platform: 'Teams', time: 'Tomorrow · 11:00 AM' }
  ] : [];
  
  // Search
  const [searchQuery, setSearchQuery] = useState('');
  
  // Player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const durationSec = 3600; // Fake 60 min
  
  // Summary Template
  const [summaryTemplate, setSummaryTemplate] = useState('General');
  
  // Modals
  const [clipModalOpen, setClipModalOpen] = useState(false);
  const [highlightModalOpen, setHighlightModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [highlightNote, setHighlightNote] = useState('');
  const [highlightTitle, setHighlightTitle] = useState('');
  const [clipTitle, setClipTitle] = useState('');
  
  const toggleActionItemLocal = (actionItemId: string) => {
    if (selectedMeeting) toggleActionItem(selectedMeeting.id, actionItemId);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const parseTimeToSeconds = (timeStr: string) => {
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 0;
  };

  const handleTranscriptClick = (timeStr: string) => {
    const secs = parseTimeToSeconds(timeStr);
    setCurrentTime(secs);
    setIsPlaying(true);
  };

  // Fake player progress
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(c => (c >= durationSec ? 0 : c + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, durationSec]);

  const createMeetingFromTemplate = (target: any) => {
    const template = getTemplateForUpcoming(target.id);
    const newId = `m-${Date.now()}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const newMeeting = {
      ...template,
      id: newId,
      title: target.title || template.title,
      platform: target.platform || template.platform,
      participants: template.participants,
      company: template.company,
      date: 'Today',
      time: timeStr,
      recordingState: 'recorded' as const,
      highlights: [],
      clips: [],
      actionItems: template.actionItems.map((a, i) => ({ ...a, id: `${newId}-a${i}`, completed: false }))
    };
    addMeeting(newMeeting);
    
    addCaptureSession({
      id: `cs-${Date.now()}`,
      sourceMeetingId: newId,
      title: newMeeting.title,
      platform: newMeeting.platform,
      participants: newMeeting.participants,
      startedAt: Date.now() - captureTime * 1000,
      elapsedSeconds: captureTime,
      status: 'completed'
    });

    return newId;
  };

  // Capture Simulation State Machine
  useEffect(() => {
    if (captureState === 'joining') {
      const t = setTimeout(() => {
        setCaptureState('recording');
        setCaptureTime(0);
      }, 2500);
      return () => clearTimeout(t);
    }
    if (captureState === 'recording') {
      const i = setInterval(() => {
        setCaptureTime(c => c + 1);
      }, 1000);
      return () => clearInterval(i);
    }
    if (captureState === 'processing') {
      const t = setTimeout(() => {
        const newId = createMeetingFromTemplate(captureTarget);
        setCaptureState('idle');
        setCaptureTarget(null);
        setActiveTab('summary');
        navigate(`/app/meetings/${newId}`);
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [captureState]);

  // Search logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results: any[] = [];
    meetings.forEach(m => {
      let matched = false;
      if (m.title.toLowerCase().includes(q)) matched = true;
      m.transcript.forEach(t => {
        if (t.text.toLowerCase().includes(q)) {
          results.push({
            meetingId: m.id,
            meetingTitle: m.title,
            date: m.date,
            timeStr: t.time,
            excerpt: t.text
          });
        }
      });
      if (matched && results.filter(r => r.meetingId === m.id).length === 0) {
        results.push({
          meetingId: m.id,
          meetingTitle: m.title,
          date: m.date,
          timeStr: '00:00:00',
          excerpt: m.summary.substring(0, 50) + '...'
        });
      }
    });
    return results;
  }, [searchQuery, meetings]);

  const saveHighlight = () => {
    if (!highlightTitle) return;
    const newHighlight = {
      id: Math.random().toString(),
      title: highlightTitle,
      time: formatTime(currentTime),
      note: highlightNote
    };
    if (selectedMeeting) {
      addHighlight(selectedMeeting.id, newHighlight);
    }
    setHighlightModalOpen(false);
    setHighlightTitle('');
    setHighlightNote('');
  };

  const generateClip = () => {
    if (!clipTitle || !selectedMeeting) return;
    const newClip = {
      id: Math.random().toString(),
      title: clipTitle,
      startTime: formatTime(currentTime),
      endTime: formatTime(currentTime + 60),
      createdAt: new Date().toISOString(),
      shareUrl: `https://fathom.video/clip/${Math.random().toString(36).substring(7)}`
    };
    addClip(selectedMeeting.id, newClip);
    alert(`Clip link generated: ${newClip.shareUrl} (Copied to clipboard)`);
    setClipModalOpen(false);
    setClipTitle('');
  };

  const meetingHighlights = selectedMeeting?.highlights || [];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white pt-[72px]">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 flex flex-col bg-black shrink-0">
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
        <div className="p-4 border-t border-white/10 shrink-0">
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
            <button onClick={() => setSettingsModalOpen(true)} className="flex-1 flex justify-center items-center py-2 text-xs text-white/60 hover:text-white bg-white/5 rounded-md transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <Link to="/" className="flex-1 flex justify-center items-center py-2 text-xs text-white/60 hover:text-white bg-white/5 rounded-md transition-colors">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Middle Column: Meeting List / Search Results */}
      <div className="w-80 border-r border-white/10 flex flex-col bg-[#0f0f0f] shrink-0">
        <div className="p-4 border-b border-white/10 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search meetings..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-md pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {searchQuery ? (
            <div className="p-2 space-y-1">
              {searchResults.length === 0 ? (
                <div className="text-sm text-white/40 text-center p-4">No results found</div>
              ) : (
                searchResults.map((res, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate(`/app/meetings/${res.meetingId}`);
                      setActiveTab('transcript');
                      handleTranscriptClick(res.timeStr);
                    }}
                    className="w-full text-left p-3 rounded hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-sm font-semibold text-white mb-1 truncate">{res.meetingTitle}</h3>
                    <div className="text-xs text-white/40 mb-1">{res.date} • {res.timeStr}</div>
                    <p className="text-xs text-white/60 line-clamp-2 italic">"{res.excerpt}"</p>
                  </button>
                ))
              )}
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-white/10 shrink-0">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Upcoming Meetings</h3>
                <div className="space-y-2">
                  {!calendarConnected ? (
                    <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                      <Calendar className="w-6 h-6 text-white/40 mx-auto mb-3" />
                      <h4 className="text-sm font-semibold text-white mb-1">Connect Calendar</h4>
                      <p className="text-xs text-white/50 mb-3">Sync your upcoming meetings to capture them.</p>
                      <button 
                        onClick={() => setCalendarConnected(true)}
                        className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-1.5 px-4 rounded transition-colors">
                        Connect Google Calendar
                      </button>
                    </div>
                  ) : upcomingMeetings.map(um => (
                    <div key={um.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-white truncate mb-1">{um.title}</h4>
                      <div className="text-xs text-white/50 mb-2">{um.time} • {um.platform}</div>
                      <button 
                        onClick={() => { setCaptureTarget(um); setCaptureState('joining'); }}
                        className="w-full bg-fathom-cyan text-black text-xs font-semibold py-1.5 rounded hover:bg-fathom-cyan/90 transition-colors">
                        Start Fathom
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Past Meetings</h3>
                <div className="space-y-1 -mx-4">
                {meetings.map((meeting) => (
                  <button
                    key={meeting.id}
                    onClick={() => navigate(`/app/meetings/${meeting.id}`)}
                    className={cn(
                      "w-full text-left p-4 border-b border-white/5 hover:bg-white/5 transition-colors block",
                      selectedMeetingId === meeting.id ? "bg-white/10 border-l-2 border-l-fathom-cyan" : ""
                    )}
                  >
                    <h3 className="text-sm font-semibold text-white mb-1 truncate block w-full">{meeting.title}</h3>
                    <div className="flex items-center text-xs text-white/50 mb-2 gap-2">
                      <span>{meeting.date}</span>
                      <span>•</span>
                      <span>{meeting.type}</span>
                    </div>
                    <p className="text-xs text-white/40 truncate w-full block">
                      {meeting.participants.join(', ')}
                    </p>
                  </button>
                ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Meeting Detail */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
        {/* Meeting Header */}
        <div className="p-6 lg:p-8 border-b border-white/10 shrink-0">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">{selectedMeeting.title}</h1>
            <div className="flex gap-2">
              <button onClick={() => setClipModalOpen(true)} className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#262626] border border-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Share2 className="w-4 h-4" /> Share Clip
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-white/60">
            <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-white/5">
              <Clock className="w-4 h-4 text-fathom-cyan" /> 
              <span className="font-medium text-white/80">{selectedMeeting.date}</span>
              <span className="text-white/40 ml-1">({selectedMeeting.time} • {selectedMeeting.duration})</span>
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
            <div className="px-3 py-1 bg-white/5 rounded-md text-white/80">
              Platform: {selectedMeeting.platform}
            </div>
          </div>
        </div>

        {/* Video Player Mock */}
        <div className="bg-black border-b border-white/10 p-4 shrink-0 flex flex-col">
          {/* Player controls */}
          <div className="flex items-center gap-4 text-white">
            <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            <div className="text-sm font-medium w-16 text-center">{formatTime(currentTime)}</div>
            <div className="flex-1 h-1.5 bg-white/20 rounded-full relative overflow-hidden cursor-pointer">
              <div className="absolute top-0 left-0 h-full bg-fathom-cyan transition-all duration-300" style={{ width: `${(currentTime / durationSec) * 100}%` }}></div>
            </div>
            <div className="text-sm text-white/60 w-16">{formatTime(durationSec)}</div>
            <button className="p-2 hover:bg-white/10 rounded-md transition-colors"><Volume2 className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-white/10 rounded-md transition-colors flex items-center text-xs font-semibold"><FastForward className="w-4 h-4 mr-1" /> 1x</button>
            <button onClick={() => setHighlightModalOpen(true)} className="ml-2 flex items-center gap-1.5 bg-fathom-purple/20 text-fathom-purple hover:bg-fathom-purple/30 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors">
              <Edit3 className="w-3.5 h-3.5" /> Highlight
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-white/10 flex gap-6 shrink-0 bg-[#0a0a0a]">
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
        <div className="flex-1 overflow-y-auto p-6 bg-[#0a0a0a]">
          {activeTab === 'summary' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Summary Column */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                      <ListTodo className="w-5 h-5 text-fathom-cyan" /> Meeting Summary
                    </h2>
                    <div className="relative group">
                      <button className="flex items-center gap-2 text-sm bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-1.5 hover:bg-[#262626]">
                        {summaryTemplate} <ChevronDown className="w-4 h-4" />
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-48 bg-[#1a1a1a] border border-white/10 rounded-md shadow-xl py-1 hidden group-hover:block z-10">
                        {['General', 'Sales', 'Customer Success', 'Project Update'].map(t => (
                          <button key={t} onClick={() => setSummaryTemplate(t)} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10">
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#141414] border border-white/5 rounded-xl p-5 text-white/80 leading-relaxed text-sm">
                    {summaryTemplate === 'Sales' ? (
                      "Sales-focused summary: The prospect raised pricing objections but is aligned on the technical value. Need to follow up with a custom proposal."
                    ) : summaryTemplate === 'Customer Success' ? (
                      "CS-focused summary: Customer is healthy but requested a QBR next month. Rollout is at 50% adoption."
                    ) : (
                      selectedMeeting.summary
                    )}
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

                <section>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-fathom-cyan" /> Highlights
                  </h2>
                  <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
                    {meetingHighlights.length === 0 ? (
                      <div className="p-4 text-sm text-white/40">No highlights recorded yet.</div>
                    ) : (
                      meetingHighlights.map((hl: any, idx: number) => (
                        <div key={idx} className="p-4 border-b border-white/5 last:border-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-fathom-cyan font-mono bg-fathom-cyan/10 px-1.5 py-0.5 rounded cursor-pointer hover:bg-fathom-cyan/20" onClick={() => { setActiveTab('transcript'); handleTranscriptClick(hl.time); }}>{hl.time}</span>
                            <span className="font-semibold text-sm">{hl.title}</span>
                          </div>
                          {hl.note && <p className="text-sm text-white/60 ml-14">{hl.note}</p>}
                        </div>
                      ))
                    )}
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-fathom-pink" /> Clips
                  </h2>
                  <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
                    {(!selectedMeeting?.clips || selectedMeeting.clips.length === 0) ? (
                      <div className="p-4 text-sm text-white/40">No clips created yet. Use "Share Clip" to create one.</div>
                    ) : (
                      selectedMeeting.clips.map((clip: any, idx: number) => (
                        <div key={idx} className="p-4 border-b border-white/5 last:border-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm text-white">{clip.title}</span>
                            <button
                              onClick={() => { navigator.clipboard.writeText(clip.shareUrl); alert('Link copied: ' + clip.shareUrl); }}
                              className="flex items-center gap-1 text-xs text-fathom-cyan hover:text-fathom-cyan/80 transition-colors"
                            >
                              <LinkIcon className="w-3 h-3" /> Copy link
                            </button>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-white/50">
                            <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded">{clip.startTime} – {clip.endTime}</span>
                            <span>Created {new Date(clip.createdAt).toLocaleDateString() === new Date().toLocaleDateString() ? 'just now' : new Date(clip.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </div>

              {/* Action Items Column */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white mb-4">Action Items</h2>
                <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
                  {selectedMeeting.actionItems.length === 0 ? (
                    <div className="p-4 text-sm text-white/40">No action items.</div>
                  ) : (
                    selectedMeeting.actionItems.map(item => {
                      const isCompleted = item.completed;
                      return (
                        <button 
                          key={item.id}
                          onClick={() => toggleActionItemLocal(item.id)}
                          className="w-full flex items-start gap-3 p-4 border-b border-white/5 hover:bg-white/5 transition-colors text-left"
                        >
                          <div className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-white/30" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className={cn(
                              "text-sm block mb-1", 
                              isCompleted ? "text-white/40 line-through" : "text-white/80"
                            )}>
                              {item.text}
                            </span>
                            <div className="flex gap-2 text-xs text-white/40">
                              {item.assignee && <span>{item.assignee}</span>}
                              {item.dueDate && <span>• Due: {item.dueDate}</span>}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-2 pb-12">
              {selectedMeeting.transcript.map((line, idx) => {
                const lineSecs = parseTimeToSeconds(line.time);
                // Active if current time is within 15 seconds of this line
                const isActive = currentTime >= lineSecs && currentTime < lineSecs + 15;
                return (
                  <div key={idx} onClick={() => handleTranscriptClick(line.time)} className={cn("flex gap-4 group p-3 -mx-3 rounded-lg transition-colors cursor-pointer", isActive ? "bg-white/10" : "hover:bg-white/5")}>
                    <div className="w-16 pt-0.5 shrink-0 text-xs text-white/40 font-mono text-right">
                      {line.time}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/80 mb-1">{line.speaker}</div>
                      <div className="text-sm text-white/80 leading-relaxed">{line.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {clipModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Share Clip</h3>
              <button onClick={() => setClipModalOpen(false)} className="text-white/60 hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm mb-1 text-white/70">Clip Title</label>
                <input type="text" value={clipTitle} onChange={e => setClipTitle(e.target.value)} placeholder="e.g. Pricing Discussion" className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-fathom-cyan" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1 text-white/70">Start Time</label>
                  <input type="text" defaultValue={formatTime(currentTime)} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none font-mono" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1 text-white/70">End Time</label>
                  <input type="text" defaultValue={formatTime(currentTime + 60)} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1 text-white/70">Send to (Email)</label>
                <input type="email" placeholder="colleague@company.com" className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-fathom-cyan" />
              </div>
              <button onClick={generateClip} className="w-full bg-fathom-cyan text-black font-semibold py-2 rounded mt-2 hover:bg-fathom-cyan/90 transition-colors">
                Generate & Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      {highlightModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-semibold text-lg flex items-center gap-2"><Edit3 className="w-5 h-5 text-fathom-cyan"/> Save Highlight</h3>
              <button onClick={() => setHighlightModalOpen(false)} className="text-white/60 hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-sm text-fathom-cyan font-mono">Timestamp: {formatTime(currentTime)}</div>
              <div>
                <label className="block text-sm mb-1 text-white/70">Title</label>
                <input value={highlightTitle} onChange={e => setHighlightTitle(e.target.value)} type="text" placeholder="e.g. Good feedback" className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-fathom-cyan" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-white/70">Notes (Optional)</label>
                <textarea value={highlightNote} onChange={e => setHighlightNote(e.target.value)} rows={3} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-fathom-cyan" placeholder="Add context..." />
              </div>
              <button onClick={saveHighlight} className="w-full bg-fathom-purple text-white font-semibold py-2 rounded mt-2 hover:bg-fathom-purple/90 transition-colors">
                Save Highlight
              </button>
            </div>
          </div>
        </div>
      )}

      {settingsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Settings & Integrations</h3>
              <button onClick={() => setSettingsModalOpen(false)} className="text-white/60 hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="text-sm font-semibold text-white/40 uppercase mb-3">Connected Services</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-black/30 p-3 rounded border border-white/5">
                    <div>
                      <div className="text-sm font-semibold">Google Calendar</div>
                      <div className="text-xs text-green-400">Connected</div>
                    </div>
                    <button className="text-xs border border-white/20 px-2 py-1 rounded hover:bg-white/10">Disconnect</button>
                  </div>
                  <div className="flex justify-between items-center bg-black/30 p-3 rounded border border-white/5">
                    <div>
                      <div className="text-sm font-semibold">Zoom</div>
                      <div className="text-xs text-green-400">Connected</div>
                    </div>
                    <button className="text-xs border border-white/20 px-2 py-1 rounded hover:bg-white/10">Disconnect</button>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-white/40 uppercase mb-3">Integrations</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-black/30 p-3 rounded border border-white/5">
                    <div>
                      <div className="text-sm font-semibold">Slack</div>
                      <div className="text-xs text-white/40">Not connected</div>
                    </div>
                    <button className="text-xs bg-fathom-cyan text-black font-semibold px-3 py-1 rounded hover:bg-fathom-cyan/90">Connect</button>
                  </div>
                  <div className="flex justify-between items-center bg-black/30 p-3 rounded border border-white/5">
                    <div>
                      <div className="text-sm font-semibold">Salesforce</div>
                      <div className="text-xs text-white/40">Not connected</div>
                    </div>
                    <button className="text-xs bg-fathom-cyan text-black font-semibold px-3 py-1 rounded hover:bg-fathom-cyan/90">Connect</button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white/40 uppercase mb-3">Preferences</h4>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm">Auto-generate Action Items</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm">Auto-share with participants</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Capture Simulation Overlay */}
      {captureState !== 'idle' && captureTarget && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 delay-100">
            <div className="p-6 text-center border-b border-white/10">
              <h2 className="text-xl font-bold text-white mb-2">{captureTarget.title}</h2>
              <div className="text-sm text-white/60 flex items-center justify-center gap-2">
                 <Video className="w-4 h-4"/> {captureTarget.platform} • {captureTarget.participants.join(', ')}
              </div>
            </div>
            
            <div className="p-10 flex flex-col items-center justify-center min-h-[250px]">
              {captureState === 'joining' && (
                <>
                  <div className="w-12 h-12 border-4 border-fathom-cyan/20 border-t-fathom-cyan rounded-full animate-spin mb-6"></div>
                  <h3 className="text-xl font-medium text-white mb-2">Joining meeting...</h3>
                  <p className="text-sm text-white/50">Fathom bot is connecting to {captureTarget.platform}</p>
                </>
              )}
              
              {captureState === 'recording' && (
                <>
                  <div className="relative mb-6">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-50"></div>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Recording</h3>
                  <div className="text-4xl font-mono text-white/90 font-light mb-8 tracking-wider">{formatTime(captureTime)}</div>
                  <button onClick={() => setCaptureState('processing')} className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 px-6 py-2 rounded-full text-sm font-semibold transition-colors">
                    End Recording
                  </button>
                </>
              )}
              
              {captureState === 'processing' && (
                <>
                  <div className="w-12 h-12 border-4 border-fathom-purple/20 border-t-fathom-purple rounded-full animate-spin mb-6"></div>
                  <h3 className="text-xl font-medium text-white mb-2">Processing meeting...</h3>
                  <p className="text-sm text-white/50 mb-6">Generating transcript, summary, and action items.</p>
                  <div className="w-full max-w-[200px] bg-white/5 h-2 rounded-full overflow-hidden">
                     <div className="h-full bg-fathom-purple w-full origin-left animate-[pulse_2s_ease-in-out_infinite]"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
