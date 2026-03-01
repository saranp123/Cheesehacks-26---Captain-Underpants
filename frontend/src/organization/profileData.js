/**
 * Mock organization profile data for BlueWave Collective.
 * Theme: Community-driven environmental and youth empowerment.
 */

export const BLUEWAVE_ORG = {
  id: 'bluewave',
  name: 'BlueWave Collective',
  tagline: 'Empowering Communities Through Action.',
  location: 'Minneapolis, MN',
  website: 'https://bluewavecollective.org',
  founded: 2018,
  verified: true,
  logo: null, // placeholder SVG in component
  mission: 'We bring together communities to protect our environment and empower the next generation through hands-on education, sustainable practices, and inclusive action.',
  values: [
    { name: 'Sustainability', icon: '🌱', description: 'We prioritize long-term environmental health in every project.' },
    { name: 'Youth Empowerment', icon: '🌟', description: 'Young people lead and learn alongside us.' },
    { name: 'Community Collaboration', icon: '🤝', description: 'Real change happens when we work together.' },
    { name: 'Accessibility', icon: '♿', description: 'Our programs and spaces are open to all.' },
    { name: 'Impact Transparency', icon: '📊', description: 'We share our outcomes and learn from data.' },
  ],
  biography: `BlueWave Collective was founded in 2018 in Minneapolis with a simple belief: that local action can create lasting global impact. What started as a small group of neighbors planting trees and cleaning watersheds has grown into a nonprofit that runs youth environmental camps, community gardens, and sustainability workshops across the Twin Cities.

We focus on three pillars: environmental stewardship, youth leadership, and community resilience. Our programs serve K–12 students, families, and community members who want to learn and contribute. From river cleanups to solar education to food justice projects, we meet people where they are and grow from there.

Our long-term goal is to build a generation of informed, engaged citizens who see themselves as caretakers of their communities and the planet. We measure success not only in trees planted or pounds of waste diverted, but in the relationships we build and the confidence we help young people find.`,
  totalVolunteers: 128,
  totalHours: 640,
  tasksCompleted: 312,
  activeOpportunities: 6,
  categoriesOfImpact: [
    { name: 'Education', hours: 180, color: '#0ea5e9' },
    { name: 'Environment', hours: 280, color: '#22c55e' },
    { name: 'Social', hours: 120, color: '#f59e0b' },
    { name: 'Community', hours: 60, color: '#8b5cf6' },
  ],
  badge: 'Community Champion 2024',
  opportunities: [
    {
      id: 'bw1',
      title: 'Youth River Stewards – Weekend Cleanup',
      category: 'Environment',
      description: 'Lead or support a half-day river cleanup with middle schoolers. You’ll help with safety, logistics, and reflection activities.',
      required_skills: ['Teaching', 'Events'],
      timeEstimate: '3 hours',
      time_estimate: 180,
    },
    {
      id: 'bw2',
      title: 'Social Media & Storytelling Volunteer',
      category: 'Social Media',
      description: 'Create 2–3 posts per month showcasing our programs and volunteer stories. We provide brand guidelines and content ideas.',
      required_skills: ['Social Media', 'Writing'],
      timeEstimate: '2–3 hours',
      time_estimate: 150,
    },
    {
      id: 'bw3',
      title: 'Community Garden Coordinator (Seasonal)',
      category: 'Community',
      description: 'Help coordinate planting, maintenance, and harvest days at our two community gardens. No green thumb required—we train.',
      required_skills: ['Events', 'Teaching'],
      timeEstimate: '4–6 hours/month',
      time_estimate: 300,
    },
    {
      id: 'bw4',
      title: 'Research: Local Sustainability Policies',
      category: 'Tech',
      description: 'Compile a short report on city/county sustainability initiatives to inform our advocacy and programming.',
      required_skills: ['Research', 'Writing'],
      timeEstimate: '5 hours',
      time_estimate: 300,
    },
    {
      id: 'bw5',
      title: 'Design Flyers for Youth Summit',
      category: 'Arts',
      description: 'Design print and digital flyers for our annual Youth Environmental Summit. We’ll provide copy and logos.',
      required_skills: ['Design'],
      timeEstimate: '2 hours',
      time_estimate: 120,
    },
    {
      id: 'bw6',
      title: 'Tutor for After-School Green Club',
      category: 'Education',
      description: 'Support K–5 students in our after-school Green Club with reading and simple science activities once a week.',
      required_skills: ['Teaching', 'Tutoring'],
      timeEstimate: '1 hour/week',
      time_estimate: 60,
    },
  ],
  featuredVolunteers: [
    {
      id: 'fv1',
      name: 'Maya Chen',
      hoursContributed: 42,
      quote: 'BlueWave showed me that I could actually make a difference in my own neighborhood. Now I bring my little sister to cleanups.',
      avatar: null,
    },
    {
      id: 'fv2',
      name: 'James Okonkwo',
      hoursContributed: 38,
      quote: 'The youth programs here are the real deal. I started as a volunteer and now I help run the garden. Best decision I made.',
      avatar: null,
    },
    {
      id: 'fv3',
      name: 'Sofia Reyes',
      hoursContributed: 56,
      quote: 'I love that every hour counts—whether it’s one afternoon at the river or a whole summer with the kids. They make it easy to show up.',
      avatar: null,
    },
  ],
}

export function getFeaturedVolunteer(id) {
  return BLUEWAVE_ORG.featuredVolunteers.find((v) => v.id === id) || null
}
