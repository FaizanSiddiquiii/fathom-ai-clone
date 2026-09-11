export const mockMeetings = [
  {
    id: 'm1',
    title: 'Q3 Product Roadmap Review',
    date: 'Oct 12, 2026',
    time: '10:00 AM - 11:00 AM',
    type: 'Internal Sync',
    participants: ['Alex Chen', 'Sarah Miller', 'David Kumar'],
    summary: 'The team aligned on the Q3 roadmap. The primary focus will be rolling out the new bot-free capture system by mid-November. Marketing will prepare the launch sequence, and engineering needs to finalize the desktop app stability.',
    keyPoints: [
      'Bot-free capture is the #1 priority for Q3.',
      'Desktop app stability issues need resolution before launch.',
      'Marketing launch sequence begins Nov 1st.'
    ],
    actionItems: [
      { id: 'a1', text: 'Sarah: Draft the Q3 launch announcement blog post by Friday.', completed: false },
      { id: 'a2', text: 'David: Share the QA test results for the desktop app.', completed: true },
      { id: 'a3', text: 'Alex: Schedule a follow-up sync with the design team.', completed: false }
    ],
    transcript: [
      { speaker: 'Alex Chen', time: '00:00', text: 'Alright, let’s get started. The main goal today is to lock in the Q3 product roadmap.' },
      { speaker: 'Sarah Miller', time: '00:15', text: 'I think we all agree that the bot-free capture feature is the most anticipated. Are we still on track for mid-November?' },
      { speaker: 'David Kumar', time: '00:25', text: 'Yes, engineering is on track. We just have a few stability issues with the desktop app that we need to iron out this week.' },
      { speaker: 'Alex Chen', time: '00:45', text: 'Perfect. David, can you share those QA test results when they are ready? And Sarah, we’ll need the blog post drafted by Friday.' },
      { speaker: 'Sarah Miller', time: '01:05', text: 'You got it. I will have a draft ready for review on Thursday afternoon.' }
    ]
  },
  {
    id: 'm2',
    title: 'Acme Corp Sales Discovery',
    date: 'Oct 10, 2026',
    time: '2:00 PM - 2:45 PM',
    type: 'External Call',
    participants: ['Alex Chen', 'Emily Wang (Acme)'],
    summary: 'Emily from Acme Corp is looking for a solution to transcribe and summarize their sales calls to integrate with Salesforce. They have a team of 45 reps. Pricing is a concern, but the value of CRM automation resonates strongly.',
    keyPoints: [
      'Acme Corp has 45 sales reps.',
      'Main pain point: Manual Salesforce data entry.',
      'Budget constraints are present but flexible for the right ROI.'
    ],
    actionItems: [
      { id: 'a4', text: 'Alex: Send the Salesforce integration case study to Emily.', completed: false },
      { id: 'a5', text: 'Alex: Create a custom pricing proposal for 45 seats.', completed: false }
    ],
    transcript: [
      { speaker: 'Alex Chen', time: '00:00', text: 'Hi Emily, great to connect. To start, can you tell me a bit about how your sales team currently handles meeting notes?' },
      { speaker: 'Emily Wang', time: '00:18', text: 'It is mostly manual right now. We have 45 reps, and they spend hours every week just typing notes into Salesforce.' },
      { speaker: 'Alex Chen', time: '00:35', text: 'That’s exactly what Fathom helps with. We can automatically sync summaries and action items directly to Salesforce objects.' },
      { speaker: 'Emily Wang', time: '00:50', text: 'That sounds ideal. Can you send over some examples or a case study on how that works?' },
      { speaker: 'Alex Chen', time: '01:05', text: 'Absolutely, I’ll send that right after the call.' }
    ]
  }
];

export const getMeetingById = (id: string) => {
  return mockMeetings.find(m => m.id === id);
};
