import type { Meeting } from './mockData';

// Each template provides distinct transcript, summary, key points, and action items.
// The upcoming-meeting ID maps to a template key so different captures produce different content.

const templateA: Omit<Meeting, 'id' | 'date' | 'time' | 'recordingState'> = {
  title: 'Acme Corp — Product Discovery',
  duration: '52m',
  type: 'External Sync',
  participants: ['Alex Chen', 'Sarah Miller', 'Emily Wang (Acme)', 'John Doe (Acme)', 'Alice Smith (Acme)'],
  company: 'Acme Corp',
  platform: 'Zoom',
  summary: 'Comprehensive kickoff and product discovery for Acme Corp\'s enterprise rollout. We discussed the timeline, integration with Salesforce and Hubspot, security requirements, and pricing. Emily raised concerns about the pricing model for 500 seats. Security review is pending but the technical team is aligned on the API integration.',
  keyPoints: [
    'Acme Corp is looking to deploy to 500 seats by Q1.',
    'Salesforce and Hubspot integrations are hard requirements.',
    'Pricing objections were raised regarding the enterprise tier.',
    'Security review questionnaire needs to be completed by our team by next Friday.'
  ],
  actionItems: [
    { id: 'ta1', text: 'Send updated enterprise pricing proposal for 500 seats.', assignee: 'Alex Chen', dueDate: 'Friday', completed: false },
    { id: 'ta2', text: 'Complete Acme security questionnaire.', assignee: 'David Kumar', dueDate: 'Next Friday', completed: false },
    { id: 'ta3', text: 'Provide API documentation for custom integrations.', assignee: 'Sarah Miller', dueDate: 'Wednesday', completed: false }
  ],
  highlights: [],
  clips: [],
  transcript: [
    { speaker: 'Alex Chen', time: '00:00:00', text: 'Hi everyone, thanks for joining today. Let\'s get started with the kickoff.' },
    { speaker: 'Emily Wang (Acme)', time: '00:01:15', text: 'Thanks Alex. We have our core team here today. Our main goal is to understand how we can roll this out to our 500 reps.' },
    { speaker: 'John Doe (Acme)', time: '00:05:40', text: 'What about integrations? We heavily rely on Salesforce and Hubspot.' },
    { speaker: 'Sarah Miller', time: '00:07:10', text: 'We have native integrations for both. I can send over the API documentation for any custom workflows you might need.' },
    { speaker: 'Alice Smith (Acme)', time: '00:10:05', text: 'We will also need your team to complete our standard security questionnaire before we can proceed.' },
    { speaker: 'Emily Wang (Acme)', time: '00:15:30', text: 'Let\'s talk about pricing. The enterprise tier seems a bit steep when we are looking at 500 seats. Is there room for negotiation?' },
    { speaker: 'Alex Chen', time: '00:17:45', text: 'I understand. Let me take that back to our pricing team and get you a custom proposal by this Friday.' },
    { speaker: 'Emily Wang (Acme)', time: '00:25:00', text: 'What about the onboarding timeline? We need this live before the end of Q1.' },
    { speaker: 'Sarah Miller', time: '00:27:30', text: 'Our typical enterprise onboarding is four to six weeks. We can accelerate if you commit by end of month.' },
    { speaker: 'Alex Chen', time: '00:35:00', text: 'I also want to make sure we discuss the security review requirements. Alice, can you walk us through those?' },
    { speaker: 'Alice Smith (Acme)', time: '00:36:15', text: 'Sure. We need SOC 2 compliance documentation and a completed vendor risk assessment form.' },
    { speaker: 'Alex Chen', time: '00:45:00', text: 'We have SOC 2 Type II certification. I will send that over along with the completed risk assessment.' },
    { speaker: 'Emily Wang (Acme)', time: '00:50:00', text: 'Great. Let\'s regroup next week after we review the pricing and security docs.' },
    { speaker: 'Alex Chen', time: '00:51:30', text: 'Sounds like a plan. I\'ll follow up with the action items. Thanks everyone!' }
  ]
};

const templateB: Omit<Meeting, 'id' | 'date' | 'time' | 'recordingState'> = {
  title: 'Northstar — Weekly Sync',
  duration: '35m',
  type: 'Customer Success',
  participants: ['Rachel Torres', 'Marcus Webb', 'Priya Sharma (Northstar)', 'James Liu (Northstar)'],
  company: 'Northstar',
  platform: 'Google Meet',
  summary: 'Weekly sync with Northstar focused on onboarding progress and feature feedback. Adoption is at 62% after two weeks. The team reported issues with the mobile experience and requested better notification controls. James raised a feature request for custom report templates.',
  keyPoints: [
    'Onboarding adoption at 62% — ahead of schedule.',
    'Mobile app experience needs improvement for field reps.',
    'Custom report templates are a high-priority feature request.',
    'Next QBR is scheduled for November 15th.'
  ],
  actionItems: [
    { id: 'tb1', text: 'File mobile UX improvement ticket with engineering.', assignee: 'Rachel Torres', dueDate: 'Thursday', completed: false },
    { id: 'tb2', text: 'Draft custom report template proposal.', assignee: 'Marcus Webb', dueDate: 'Next Monday', completed: false },
    { id: 'tb3', text: 'Schedule QBR for November 15th.', assignee: 'Rachel Torres', dueDate: 'Friday', completed: false }
  ],
  highlights: [],
  clips: [],
  transcript: [
    { speaker: 'Rachel Torres', time: '00:00:00', text: 'Hey Priya, James — thanks for joining. Let\'s start with the adoption update.' },
    { speaker: 'Priya Sharma (Northstar)', time: '00:01:20', text: 'We\'re at 62% adoption after two weeks which is ahead of our internal target of 50%.' },
    { speaker: 'James Liu (Northstar)', time: '00:03:45', text: 'The desktop experience is great but our field reps are struggling with the mobile app. The notifications are too frequent and the interface is clunky on smaller screens.' },
    { speaker: 'Marcus Webb', time: '00:06:10', text: 'That\'s really helpful feedback. We have a mobile refresh planned for Q1. Can you share specific pain points so we can prioritize?' },
    { speaker: 'James Liu (Northstar)', time: '00:08:30', text: 'Absolutely. The main issues are notification overload and the inability to customize report views on mobile.' },
    { speaker: 'Rachel Torres', time: '00:12:00', text: 'Got it. I\'ll file a ticket with engineering today for the mobile UX improvements.' },
    { speaker: 'Priya Sharma (Northstar)', time: '00:15:00', text: 'On another note, we\'d love the ability to create custom report templates. Right now everything is a default format.' },
    { speaker: 'Marcus Webb', time: '00:17:30', text: 'That\'s actually something we\'ve been scoping. Let me draft a proposal and get back to you by next Monday.' },
    { speaker: 'Rachel Torres', time: '00:22:00', text: 'We should also talk about scheduling the QBR. How does November 15th work for your team?' },
    { speaker: 'Priya Sharma (Northstar)', time: '00:23:15', text: 'November 15th works. Let\'s block two hours for a deep dive on ROI and next quarter planning.' },
    { speaker: 'Rachel Torres', time: '00:30:00', text: 'Perfect. I\'ll send calendar invites by end of week. Anything else for today?' },
    { speaker: 'James Liu (Northstar)', time: '00:32:00', text: 'That covers it. Thanks team!' },
    { speaker: 'Rachel Torres', time: '00:34:00', text: 'Great sync. Talk to you next week!' }
  ]
};

const templateC: Omit<Meeting, 'id' | 'date' | 'time' | 'recordingState'> = {
  title: 'Vertex — Enterprise Demo',
  duration: '48m',
  type: 'Sales Demo',
  participants: ['Sarah Miller', 'David Kumar', 'Tom Reyes (Vertex)', 'Linda Park (Vertex)', 'Nina Patel (Vertex)'],
  company: 'Vertex',
  platform: 'Microsoft Teams',
  summary: 'Enterprise demo for Vertex covering security architecture, SSO integration, and data residency requirements. Linda from their procurement team asked about volume pricing for 1,200 seats. Tom confirmed their current vendor contract ends in March, creating urgency for a decision by end of January.',
  keyPoints: [
    'Vertex needs data residency in EU — confirmed our Frankfurt data center qualifies.',
    'Volume pricing requested for 1,200 seats across three regions.',
    'Current vendor contract expires March 31st — decision needed by end of January.',
    'SSO integration with Okta is a hard requirement.'
  ],
  actionItems: [
    { id: 'tc1', text: 'Prepare volume pricing proposal for 1,200 seats.', assignee: 'Sarah Miller', dueDate: 'Monday', completed: false },
    { id: 'tc2', text: 'Send EU data residency compliance documentation.', assignee: 'David Kumar', dueDate: 'Wednesday', completed: false },
    { id: 'tc3', text: 'Schedule technical deep dive for Okta SSO integration.', assignee: 'David Kumar', dueDate: 'Next Week', completed: false },
    { id: 'tc4', text: 'Send case studies from similar enterprise deployments.', assignee: 'Sarah Miller', dueDate: 'Thursday', completed: false }
  ],
  highlights: [],
  clips: [],
  transcript: [
    { speaker: 'Sarah Miller', time: '00:00:00', text: 'Welcome everyone. Today we\'ll walk through our enterprise platform with a focus on security and compliance.' },
    { speaker: 'Tom Reyes (Vertex)', time: '00:02:00', text: 'Thanks Sarah. We have three key requirements — data residency in the EU, SSO with Okta, and robust audit logging.' },
    { speaker: 'David Kumar', time: '00:04:30', text: 'Great. Let me start with our infrastructure. We have a dedicated data center in Frankfurt that provides full EU data residency.' },
    { speaker: 'Linda Park (Vertex)', time: '00:08:00', text: 'That\'s exactly what we need. Can you also confirm GDPR compliance documentation is available?' },
    { speaker: 'David Kumar', time: '00:09:30', text: 'Yes, we have full GDPR compliance documentation. I\'ll send that over after this call.' },
    { speaker: 'Nina Patel (Vertex)', time: '00:14:00', text: 'What about SSO? We use Okta across our entire organization.' },
    { speaker: 'David Kumar', time: '00:15:30', text: 'We have native Okta integration. It typically takes about two hours to configure. I can schedule a technical deep dive next week.' },
    { speaker: 'Tom Reyes (Vertex)', time: '00:22:00', text: 'Our current vendor contract expires March 31st. We need to make a decision by end of January to allow for migration.' },
    { speaker: 'Sarah Miller', time: '00:24:00', text: 'Understood. That gives us a clear timeline. Let\'s make sure we have everything you need well before then.' },
    { speaker: 'Linda Park (Vertex)', time: '00:30:00', text: 'Can you provide volume pricing? We\'re looking at approximately 1,200 seats across three regions.' },
    { speaker: 'Sarah Miller', time: '00:32:00', text: 'Absolutely. I\'ll have a custom proposal ready by Monday with tiered pricing for that volume.' },
    { speaker: 'Tom Reyes (Vertex)', time: '00:40:00', text: 'Do you have case studies from companies of similar size? That would help our internal approval process.' },
    { speaker: 'Sarah Miller', time: '00:42:00', text: 'Yes, we have several. I\'ll compile relevant ones and send them by Thursday.' },
    { speaker: 'Tom Reyes (Vertex)', time: '00:46:00', text: 'This was very productive. Looking forward to the next steps.' },
    { speaker: 'Sarah Miller', time: '00:47:30', text: 'Thank you all. We\'ll be in touch shortly with everything discussed today.' }
  ]
};

// Map upcoming meeting IDs to templates
export const captureTemplateMap: Record<string, Omit<Meeting, 'id' | 'date' | 'time' | 'recordingState'>> = {
  'u1': templateA,
  'u2': templateB,
  'u3': templateC,
};

// Fallback: pick a template by cycling through available ones
const allTemplates = [templateA, templateB, templateC];
export function getTemplateForUpcoming(upcomingId: string): Omit<Meeting, 'id' | 'date' | 'time' | 'recordingState'> {
  return captureTemplateMap[upcomingId] || allTemplates[Math.floor(Math.random() * allTemplates.length)];
}
