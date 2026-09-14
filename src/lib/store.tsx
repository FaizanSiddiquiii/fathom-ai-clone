import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { mockMeetings } from '../data/mockData';
import type { Meeting, Highlight, Clip } from '../data/mockData';

type CaptureSession = {
  id: string;
  sourceMeetingId: string;
  title: string;
  platform: string;
  participants: string[];
  startedAt: number;
  endedAt?: number;
  elapsedSeconds: number;
  status: 'idle' | 'joining' | 'recording' | 'processing' | 'completed';
};

interface MeetingContextType {
  meetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, partial: Partial<Meeting>) => void;
  toggleActionItem: (meetingId: string, actionItemId: string) => void;
  addHighlight: (meetingId: string, highlight: Highlight) => void;
  addClip: (meetingId: string, clip: Clip) => void;
  
  calendarConnected: boolean;
  setCalendarConnected: (val: boolean) => void;

  captureSessions: CaptureSession[];
  addCaptureSession: (session: CaptureSession) => void;
  updateCaptureSession: (id: string, partial: Partial<CaptureSession>) => void;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export function MeetingProvider({ children }: { children: ReactNode }) {
  const [meetings, setMeetings] = useState<Meeting[]>(() => {
    const stored = localStorage.getItem('fathom_meetings');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return mockMeetings;
      }
    }
    return mockMeetings;
  });

  const [calendarConnected, setCalendarConnected] = useState<boolean>(() => {
    const stored = localStorage.getItem('fathom_calendar_connected');
    return stored ? JSON.parse(stored) : false;
  });

  const [captureSessions, setCaptureSessions] = useState<CaptureSession[]>(() => {
    const stored = localStorage.getItem('fathom_capture_sessions');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('fathom_meetings', JSON.stringify(meetings));
  }, [meetings]);

  useEffect(() => {
    localStorage.setItem('fathom_calendar_connected', JSON.stringify(calendarConnected));
  }, [calendarConnected]);

  useEffect(() => {
    localStorage.setItem('fathom_capture_sessions', JSON.stringify(captureSessions));
  }, [captureSessions]);

  const addMeeting = (meeting: Meeting) => {
    setMeetings(prev => [meeting, ...prev]);
  };

  const updateMeeting = (id: string, partial: Partial<Meeting>) => {
    setMeetings(prev => prev.map(m => m.id === id ? { ...m, ...partial } : m));
  };

  const toggleActionItem = (meetingId: string, actionItemId: string) => {
    setMeetings(prev => prev.map(m => {
      if (m.id !== meetingId) return m;
      return {
        ...m,
        actionItems: m.actionItems.map(a => a.id === actionItemId ? { ...a, completed: !a.completed } : a)
      };
    }));
  };

  const addHighlight = (meetingId: string, highlight: Highlight) => {
    setMeetings(prev => prev.map(m => {
      if (m.id !== meetingId) return m;
      return {
        ...m,
        highlights: [...(m.highlights || []), highlight]
      };
    }));
  };

  const addClip = (meetingId: string, clip: Clip) => {
    setMeetings(prev => prev.map(m => {
      if (m.id !== meetingId) return m;
      return {
        ...m,
        clips: [...(m.clips || []), clip]
      };
    }));
  };

  const addCaptureSession = (session: CaptureSession) => {
    setCaptureSessions(prev => [session, ...prev]);
  };

  const updateCaptureSession = (id: string, partial: Partial<CaptureSession>) => {
    setCaptureSessions(prev => prev.map(s => s.id === id ? { ...s, ...partial } : s));
  };

  return (
    <MeetingContext.Provider value={{
      meetings,
      addMeeting,
      updateMeeting,
      toggleActionItem,
      addHighlight,
      addClip,
      calendarConnected,
      setCalendarConnected,
      captureSessions,
      addCaptureSession,
      updateCaptureSession
    }}>
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeetingStore() {
  const context = useContext(MeetingContext);
  if (context === undefined) {
    throw new Error('useMeetingStore must be used within a MeetingProvider');
  }
  return context;
}
