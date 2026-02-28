export const CATEGORIES = ['Education', 'Environment', 'Health', 'Community', 'Tech', 'Arts']

export const SKILLS_LIST = ['Teaching', 'Writing', 'Design', 'Coding', 'Social Media', 'Events', 'Research', 'Tutoring']

export const BADGES = [
  { id: 'first', name: 'First Step', icon: '🌟', criteria: 'Complete 1 task' },
  { id: 'streak3', name: '3-Day Streak', icon: '🔥', criteria: '3 days in a row' },
  { id: 'hours10', name: '10 Hours', icon: '⏱️', criteria: '10 volunteer hours' },
  { id: 'helper', name: 'Super Helper', icon: '🤝', criteria: '5 tasks completed' },
  { id: 'quick', name: 'Quick Task', icon: '⚡', criteria: 'Under 1 hour' },
  { id: 'newbie', name: 'Newbie Friendly', icon: '🌱', criteria: 'Beginner welcome' },
  { id: 'top', name: 'Top Volunteer', icon: '🏆', criteria: 'Top performer' },
]

export function getPlaceholderUser(uid) {
  return {
    id: uid,
    type: 'person',
    name: 'Demo Student',
    email: 'student@kindr.demo',
    skills: ['Teaching', 'Writing', 'Design'],
    completed_tasks: ['t1', 't2'],
    badges: ['first', 'streak3'],
    volunteer_hours: 12,
  }
}

export function getPlaceholderOrg(uid) {
  return {
    id: uid,
    type: 'organization',
    name: 'Kindr Demo Nonprofit',
    logo: '',
    posted_tasks: ['t1', 't2', 't3'],
    volunteers: ['demo-user'],
  }
}

export const PLACEHOLDER_TASKS = [
  {
    id: 't1',
    title: 'Create social media post for local shelter',
    description: 'Draft 3 Instagram posts for our adoption campaign.',
    required_skills: ['Graphic Design', 'Copywriting'],
    time_estimate: 30,
    timeEstimate: '30 mins',
    category: 'Social Media',
    organizationId: 'demo-org',
    organizationName: 'Happy Paws',
    assigned_users: ['demo-user'],
    status: 'open',
    badges: ['Quick Task', 'Newbie Friendly'],
  },
  {
    id: 't2',
    title: 'Design a flyer for food drive',
    description: 'Create a simple flyer for our upcoming community food drive.',
    required_skills: ['Design'],
    time_estimate: 90,
    timeEstimate: '1.5 hrs',
    category: 'Community',
    organizationId: 'demo-org',
    organizationName: 'Kindr Demo Nonprofit',
    assigned_users: [],
    status: 'open',
    badges: ['Newbie Friendly'],
  },
  {
    id: 't3',
    title: 'Social media posts (3)',
    description: 'Draft 3 Instagram posts for our environmental campaign.',
    required_skills: ['Social Media', 'Writing'],
    time_estimate: 45,
    timeEstimate: '45 mins',
    category: 'Environment',
    organizationId: 'demo-org',
    organizationName: 'Kindr Demo Nonprofit',
    assigned_users: [],
    status: 'open',
    badges: ['Quick Task'],
  },
  {
    id: 't4',
    title: 'Research grant opportunities',
    description: 'Find 5 grant opportunities that match our mission.',
    required_skills: ['Research'],
    time_estimate: 120,
    timeEstimate: '2 hrs',
    category: 'Tech',
    organizationId: 'demo-org',
    organizationName: 'Kindr Demo Nonprofit',
    assigned_users: [],
    status: 'open',
    badges: [],
  },
]

export const PLACEHOLDER_VOLUNTEERS = [
  { id: 'v1', name: 'Saran P.', skills: ['Marketing', 'Event Planning'], tasksCompleted: 5, volunteer_hours: 20, availability: 'Weekends', badges: ['Top Volunteer'] },
  { id: 'v2', name: 'Alex T.', skills: ['Graphic Design', 'Copywriting'], tasksCompleted: 4, volunteer_hours: 35, availability: 'Weekdays', badges: [] },
  { id: 'v3', name: 'Jordan Lee', skills: ['Writing', 'Research'], tasksCompleted: 3, volunteer_hours: 15, availability: 'Flexible', badges: [] },
]
