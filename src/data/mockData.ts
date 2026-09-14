
export type Highlight = {
  id: string;
  title: string;
  time: string;
  note?: string;
};

export type Clip = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  shareUrl: string;
};

export type ActionItem = {
  id: string;
  text: string;
  assignee?: string;
  dueDate?: string;
  completed: boolean;
};

export type TranscriptLine = {
  speaker: string;
  time: string;
  text: string;
};

export type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  participants: string[];
  company?: string;
  platform: string;
  recordingState: string;
  summary: string;
  keyPoints: string[];
  actionItems: ActionItem[];
  transcript: TranscriptLine[];
  highlights: Highlight[];
  clips?: Clip[];
};

export const mockMeetings: Meeting[] = [
  {
    id: 'm-large',
    title: 'Acme Corp — Product Discovery & Enterprise Rollout',
    date: 'Today',
    time: '3:00 PM - 4:00 PM',
    duration: '60m',
    type: 'External Sync',
    participants: ['Alex Chen', 'Sarah Miller', 'David Kumar', 'Emily Wang (Acme)', 'John Doe (Acme)', 'Alice Smith (Acme)', 'Bob Jones (Acme)', 'Charlie Brown (Acme)'],
    company: 'Acme Corp',
    platform: 'Zoom',
    recordingState: 'recorded',
    summary: 'Comprehensive kickoff and product discovery for Acme Corp\'s enterprise rollout. We discussed the timeline, integration with Salesforce and Hubspot, security requirements, and pricing. Emily raised concerns about the pricing model for 500 seats. Security review is pending but the technical team is aligned on the API integration.',
    keyPoints: [
      'Acme Corp is looking to deploy to 500 seats by Q1.',
      'Salesforce and Hubspot integrations are hard requirements.',
      'Pricing objections were raised regarding the enterprise tier.',
      'Security review questionnaire needs to be completed by our team by next Friday.'
    ],
    actionItems: [
      { id: 'a1', text: 'Send updated enterprise pricing proposal for 500 seats.', assignee: 'Alex Chen', dueDate: 'Friday', completed: false },
      { id: 'a2', text: 'Complete Acme security questionnaire.', assignee: 'David Kumar', dueDate: 'Next Friday', completed: false },
      { id: 'a3', text: 'Provide API documentation for custom integrations.', assignee: 'Sarah Miller', dueDate: 'Wednesday', completed: true }
    ],
    highlights: [
      { id: 'h1', title: 'Pricing objection', time: '00:15:30', note: 'Emily is concerned about the per-seat cost at 500 users.' },
      { id: 'h2', title: 'Integration confirmation', time: '00:32:10', note: 'Confirmed we support both Salesforce and Hubspot natively.' }
    ],
    transcript: [
      { speaker: 'Alex Chen', time: '00:00:00', text: 'Hi everyone, thanks for joining today. Let\'s get started with the kickoff.' },
      { speaker: 'Emily Wang (Acme)', time: '00:01:15', text: 'Thanks Alex. We have our core team here today. Our main goal is to understand how we can roll this out to our 500 reps.' },
      { speaker: 'David Kumar', time: '00:03:20', text: 'From a technical perspective, rolling out to 500 seats is straightforward with our SSO integration.' },
      { speaker: 'John Doe (Acme)', time: '00:05:40', text: 'What about integrations? We heavily rely on Salesforce and Hubspot.' },
      { speaker: 'Sarah Miller', time: '00:07:10', text: 'We have native integrations for both. I can send over the API documentation for any custom workflows you might need.' },
      { speaker: 'Alice Smith (Acme)', time: '00:10:05', text: 'We will also need your team to complete our standard security questionnaire before we can proceed.' },
      { speaker: 'David Kumar', time: '00:11:30', text: 'Not a problem. Send it over and I\'ll have it done by next Friday.' },
      { speaker: 'Emily Wang (Acme)', time: '00:15:30', text: 'Let\'s talk about pricing. The enterprise tier seems a bit steep when we are looking at 500 seats. Is there room for negotiation?' },
      { speaker: 'Alex Chen', time: '00:17:45', text: 'I understand. Let me take that back to our pricing team and get you a custom proposal by this Friday.' },
      { speaker: 'Bob Jones (Acme)', time: '00:25:00', text: 'Can we also get a dedicated success manager for the rollout?' },
      { speaker: 'Alex Chen', time: '00:26:15', text: 'Yes, all enterprise plans come with a dedicated CSM.' },
      { speaker: 'Charlie Brown (Acme)', time: '00:30:00', text: 'How does the transcription accuracy hold up with technical jargon?' },
      { speaker: 'Sarah Miller', time: '00:32:10', text: 'Our models are trained on domain-specific datasets. We also support both Salesforce and Hubspot natively, which helps with entity recognition.' },
      { speaker: 'Emily Wang (Acme)', time: '00:45:00', text: 'Great. Let\'s regroup next week after we review the pricing and API docs.' },
      { speaker: 'Alex Chen', time: '00:58:00', text: 'Sounds like a plan. I\'ll follow up with the action items. Thanks everyone!' }
    ]
  },
  {
    id: 'm1',
    title: 'Q3 Product Roadmap Review',
    date: 'Oct 12, 2026',
    time: '10:00 AM - 11:00 AM',
    duration: '60m',
    type: 'Internal Sync',
    participants: ['Alex Chen', 'Sarah Miller', 'David Kumar'],
    company: 'Internal',
    platform: 'Google Meet',
    recordingState: 'recorded',
    summary: 'The team aligned on the Q3 roadmap. The primary focus will be rolling out the new bot-free capture system by mid-November. Marketing will prepare the launch sequence, and engineering needs to finalize the desktop app stability.',
    keyPoints: [
      'Bot-free capture is the #1 priority for Q3.',
      'Desktop app stability issues need resolution before launch.',
      'Marketing launch sequence begins Nov 1st.'
    ],
    actionItems: [
      { id: 'a1', text: 'Draft the Q3 launch announcement blog post by Friday.', assignee: 'Sarah', dueDate: 'Friday', completed: false },
      { id: 'a2', text: 'Share the QA test results for the desktop app.', assignee: 'David', dueDate: 'Wednesday', completed: true }
    ],
    highlights: [],
    transcript: [
      { speaker: 'Alex Chen', time: '00:00:00', text: 'Alright, let’s get started. The main goal today is to lock in the Q3 product roadmap.' },
      { speaker: 'Sarah Miller', time: '00:00:15', text: 'I think we all agree that the bot-free capture feature is the most anticipated. Are we still on track for mid-November?' },
      { speaker: 'David Kumar', time: '00:00:25', text: 'Yes, engineering is on track. We just have a few stability issues with the desktop app that we need to iron out this week.' },
      { speaker: 'Alex Chen', time: '00:00:45', text: 'Perfect. David, can you share those QA test results when they are ready? And Sarah, we’ll need the blog post drafted by Friday.' },
      { speaker: 'Sarah Miller', time: '00:01:05', text: 'You got it. I will have a draft ready for review on Thursday afternoon.' }
    ]
  },
  {
    id: 'm2',
    title: 'Design Sync: New Navigation',
    date: 'Oct 11, 2026',
    time: '1:00 PM - 1:30 PM',
    duration: '30m',
    type: 'Internal Sync',
    participants: ['Alex Chen', 'Jessica Lee'],
    company: 'Internal',
    platform: 'Microsoft Teams',
    recordingState: 'recorded',
    summary: 'Reviewed the new navigation concepts. Decided to go with the collapsible sidebar approach to maximize screen real estate for the meeting details view.',
    keyPoints: [
      'Collapsible sidebar chosen over top nav.',
      'Need to ensure accessibility for keyboard navigation.'
    ],
    actionItems: [],
    highlights: [],
    transcript: [
      { speaker: 'Jessica Lee', time: '00:00:00', text: 'I have two concepts for the new navigation. One is a top bar, the other is a collapsible sidebar.' },
      { speaker: 'Alex Chen', time: '00:05:00', text: 'I like the sidebar. It gives us more vertical space for the transcript.' }
    ]
  },
  {
    id: 'm3',
    title: 'Weekly Marketing Standup',
    date: 'Oct 10, 2026',
    time: '9:30 AM - 10:00 AM',
    duration: '30m',
    type: 'Standup',
    participants: ['Sarah Miller', 'Tom Holland', 'Zendaya'],
    company: 'Internal',
    platform: 'Zoom',
    recordingState: 'recorded',
    summary: 'Quick sync on the current campaigns. The upcoming webinar has 500 registrants.',
    keyPoints: ['Webinar is performing well.'],
    actionItems: [],
    highlights: [],
    transcript: [{ speaker: 'Sarah Miller', time: '00:00:00', text: 'Good morning. Webinar signups are at 500!' }]
  },
  {
    id: 'm4',
    title: 'Customer Interview: Globex',
    date: 'Oct 09, 2026',
    time: '4:00 PM - 4:45 PM',
    duration: '45m',
    type: 'User Research',
    participants: ['Alex Chen', 'Hank Scorpio (Globex)'],
    company: 'Globex',
    platform: 'Google Meet',
    recordingState: 'recorded',
    summary: 'Hank discussed their use of the product for onboarding new employees. They want better folder organization.',
    keyPoints: ['Folder organization is a pain point.'],
    actionItems: [],
    highlights: [],
    transcript: [{ speaker: 'Hank Scorpio', time: '00:10:00', text: 'We really need a way to nest folders.' }]
  },
  {
    id: 'm5',
    title: 'Engineering All-Hands',
    date: 'Oct 08, 2026',
    time: '11:00 AM - 12:00 PM',
    duration: '60m',
    type: 'All Hands',
    participants: ['David Kumar', 'Engineering Team'],
    company: 'Internal',
    platform: 'Zoom',
    recordingState: 'recorded',
    summary: 'Monthly engineering sync. Covered infrastructure upgrades and the recent downtime incident.',
    keyPoints: ['Downtime was caused by a database index issue.'],
    actionItems: [],
    highlights: [],
    transcript: [{ speaker: 'David Kumar', time: '00:15:00', text: 'The outage was due to a missing index on the users table.' }]
  },
  {
    id: 'm6',
    title: 'Vendor Negotiation: Cloudflare',
    date: 'Oct 07, 2026',
    time: '2:00 PM - 2:30 PM',
    duration: '30m',
    type: 'External Sync',
    participants: ['Alex Chen', 'Cloudflare Rep'],
    company: 'Cloudflare',
    platform: 'Zoom',
    recordingState: 'recorded',
    summary: 'Negotiated our enterprise plan renewal.',
    keyPoints: ['Secured a 10% discount for annual upfront payment.'],
    actionItems: [],
    highlights: [],
    transcript: [{ speaker: 'Cloudflare Rep', time: '00:12:00', text: 'We can offer 10% off if you sign today.' }]
  },
  {
    id: 'm7',
    title: 'Candidate Interview: Senior Frontend',
    date: 'Oct 06, 2026',
    time: '3:00 PM - 4:00 PM',
    duration: '60m',
    type: 'Interview',
    participants: ['David Kumar', 'Jane Smith (Candidate)'],
    company: 'Internal',
    platform: 'Google Meet',
    recordingState: 'recorded',
    summary: 'Jane has strong React experience and handled the system design question well. Recommended for the next round.',
    keyPoints: ['Strong React skills', 'Good communication'],
    actionItems: [],
    highlights: [],
    transcript: [{ speaker: 'Jane Smith', time: '00:20:00', text: 'In my last role, I migrated our app from Redux to Zustand.' }]
  },
  {
    id: 'm8',
    title: 'Board Meeting Prep',
    date: 'Oct 05, 2026',
    time: '1:00 PM - 2:00 PM',
    duration: '60m',
    type: 'Internal Sync',
    participants: ['Alex Chen', 'Sarah Miller'],
    company: 'Internal',
    platform: 'Zoom',
    recordingState: 'recorded',
    summary: 'Preparing the slides for the Q3 board meeting.',
    keyPoints: ['Need to highlight the new MRR growth.'],
    actionItems: [],
    highlights: [],
    transcript: [{ speaker: 'Alex Chen', time: '00:05:00', text: 'Let\'s make sure the MRR chart is on the first slide.' }]
  },
  {
    id: 'm9',
    title: 'Product Sync: Mobile App',
    date: 'Oct 04, 2026',
    time: '10:00 AM - 10:30 AM',
    duration: '30m',
    type: 'Internal Sync',
    participants: ['Alex Chen', 'David Kumar'],
    company: 'Internal',
    platform: 'Microsoft Teams',
    recordingState: 'recorded',
    summary: 'Discussed the mobile app launch timeline.',
    keyPoints: ['Beta testing starts next week.'],
    actionItems: [],
    highlights: [],
    transcript: [{ speaker: 'David Kumar', time: '00:10:00', text: 'The beta build is ready for internal testing.' }]
  }
];

export const getMeetingById = (id: string) => {
  return mockMeetings.find(m => m.id === id);
};
