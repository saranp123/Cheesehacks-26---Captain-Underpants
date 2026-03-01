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
      time_estimate: 180,      suggested_volunteers: [
        { id: 'sv1', name: 'Alex Chen', skills: ['Teaching', 'Events'], availability: 'Sat/Sun', timeCommitmentMinutes: 180, badges: ['⭐ Top Volunteer'] },
        { id: 'sv2', name: 'Jordan Blake', skills: ['Physical Labor', 'Teaching'], availability: 'Weekends', timeCommitmentMinutes: 240, badges: [] },
        { id: 'sv3', name: 'Sam Rodriguez', skills: ['Events', 'Communication'], availability: 'Sat/Sun', timeCommitmentMinutes: 180, badges: ['🌱 Eco Warrior'] },
        { id: 'sv4', name: 'Casey Morgan', skills: ['Teaching', 'Leadership'], availability: 'Weekends', timeCommitmentMinutes: 200, badges: [] },
      ],
      applied_volunteers: [
        { id: 'av1', name: 'Taylor Kim', skills: ['Teaching', 'Events'], availability: 'Sat', timeCommitmentMinutes: 180, badges: ['✨ Community Star'] },
        { id: 'av2', name: 'Morgan Lee', skills: ['Physical Labor'], availability: 'Sun', timeCommitmentMinutes: 120, badges: [] },
        { id: 'av3', name: 'Drew Patterson', skills: ['Leadership', 'Teaching'], availability: 'Weekends', timeCommitmentMinutes: 240, badges: [] },
      ],    },
    {
      id: 'bw2',
      title: 'Social Media & Storytelling Volunteer',
      category: 'Social Media',
      description: 'Create 2–3 posts per month showcasing our programs and volunteer stories. We provide brand guidelines and content ideas.',
      required_skills: ['Social Media', 'Writing'],
      timeEstimate: '2–3 hours',
      time_estimate: 150,
      suggested_volunteers: [
        { id: 'sv5', name: 'Alex Jordan', skills: ['Social Media', 'Writing'], availability: 'Flex', timeCommitmentMinutes: 150, badges: ['⭐ Top Volunteer'] },
        { id: 'sv6', name: 'Sam Patel', skills: ['Writing', 'Design'], availability: 'Evenings', timeCommitmentMinutes: 120, badges: [] },
        { id: 'sv7', name: 'Casey Thompson', skills: ['Social Media', 'Content Creation'], availability: 'Flex', timeCommitmentMinutes: 180, badges: [] },
      ],
      applied_volunteers: [
        { id: 'av4', name: 'Riley Davis', skills: ['Social Media', 'Writing'], availability: 'Flex', timeCommitmentMinutes: 150, badges: [] },
        { id: 'av5', name: 'Jordan White', skills: ['Design', 'Social Media'], availability: 'Weekdays', timeCommitmentMinutes: 120, badges: ['✨ Community Star'] },
      ],
    },
    {
      id: 'bw3',
      title: 'Community Garden Coordinator (Seasonal)',
      category: 'Community',
      description: 'Help coordinate planting, maintenance, and harvest days at our two community gardens. No green thumb required—we train.',
      required_skills: ['Events', 'Teaching'],
      timeEstimate: '4–6 hours/month',
      time_estimate: 300,
      suggested_volunteers: [
        { id: 'sv8', name: 'Taylor Brown', skills: ['Events', 'Leadership'], availability: 'Weekdays', timeCommitmentMinutes: 300, badges: ['🌱 Eco Warrior'] },
        { id: 'sv9', name: 'Morgan Green', skills: ['Teaching', 'Events'], availability: 'Flex', timeCommitmentMinutes: 360, badges: [] },
        { id: 'sv10', name: 'Casey Wu', skills: ['Coordination', 'Teaching'], availability: 'Weekends', timeCommitmentMinutes: 300, badges: [] },
        { id: 'sv11', name: 'Drew Harris', skills: ['Events', 'Organization'], availability: 'Flex', timeCommitmentMinutes: 280, badges: ['⭐ Top Volunteer'] },
      ],
      applied_volunteers: [
        { id: 'av6', name: 'Sam Martinez', skills: ['Teaching', 'Events'], availability: 'Weekends', timeCommitmentMinutes: 240, badges: [] },
        { id: 'av7', name: 'Alex Washington', skills: ['Leadership', 'Events'], availability: 'Flex', timeCommitmentMinutes: 300, badges: ['🏆 Volunteer Champion'] },
        { id: 'av8', name: 'Jordan Scott', skills: ['Organization', 'Teaching'], availability: 'Weekdays', timeCommitmentMinutes: 180, badges: [] },
      ],
    },
    {
      id: 'bw4',
      title: 'Research: Local Sustainability Policies',
      category: 'Tech',
      description: 'Compile a short report on city/county sustainability initiatives to inform our advocacy and programming.',
      required_skills: ['Research', 'Writing'],
      timeEstimate: '5 hours',
      time_estimate: 300,
      suggested_volunteers: [
        { id: 'sv12', name: 'Morgan Taylor', skills: ['Research', 'Writing'], availability: 'Flex', timeCommitmentMinutes: 300, badges: [] },
        { id: 'sv13', name: 'Riley Anderson', skills: ['Analysis', 'Writing'], availability: 'Evenings', timeCommitmentMinutes: 240, badges: ['⭐ Top Volunteer'] },
      ],
      applied_volunteers: [
        { id: 'av9', name: 'Casey Wilson', skills: ['Research', 'Analysis'], availability: 'Flex', timeCommitmentMinutes: 300, badges: [] },
        { id: 'av10', name: 'Drew Moore', skills: ['Writing', 'Research'], availability: 'Weekdays', timeCommitmentMinutes: 360, badges: [] },
      ],
    },
    {
      id: 'bw5',
      title: 'Design Flyers for Youth Summit',
      category: 'Arts',
      description: 'Design print and digital flyers for our annual Youth Environmental Summit. We’ll provide copy and logos.',
      required_skills: ['Design'],
      timeEstimate: '2 hours',
      time_estimate: 120,      suggested_volunteers: [
        { id: 'sv14', name: 'Alex Lopez', skills: ['Design', 'Graphics'], availability: 'Flex', timeCommitmentMinutes: 120, badges: ['🎨 Design Star'] },
        { id: 'sv15', name: 'Sam Nelson', skills: ['Design', 'Digital Art'], availability: 'Evenings', timeCommitmentMinutes: 150, badges: [] },
        { id: 'sv16', name: 'Taylor Young', skills: ['Creative', 'Design'], availability: 'Flex', timeCommitmentMinutes: 180, badges: [] },
      ],
      applied_volunteers: [
        { id: 'av11', name: 'Jordan King', skills: ['Design', 'Graphic Design'], availability: 'Flex', timeCommitmentMinutes: 120, badges: ['⭐ Top Volunteer'] },
      ],    },
    {
      id: 'bw6',
      title: 'Tutor for After-School Green Club',
      category: 'Education',
      description: 'Support K–5 students in our after-school Green Club with reading and simple science activities once a week.',
      required_skills: ['Teaching', 'Tutoring'],
      timeEstimate: '1 hour/week',
      time_estimate: 60,
      suggested_volunteers: [
        { id: 'sv17', name: 'Morgan Sanchez', skills: ['Teaching', 'Tutoring'], availability: 'Weekdays', timeCommitmentMinutes: 60, badges: ['⭐ Top Volunteer'] },
        { id: 'sv18', name: 'Casey Flores', skills: ['Tutoring', 'Education'], availability: 'Weekdays', timeCommitmentMinutes: 90, badges: [] },
        { id: 'sv19', name: 'Riley Jackson', skills: ['Teaching', 'Communication'], availability: 'Afterschool', timeCommitmentMinutes: 60, badges: [] },
        { id: 'sv20', name: 'Drew Phillips', skills: ['Tutoring', 'Mentoring'], availability: 'Weekdays', timeCommitmentMinutes: 120, badges: ['🌟 Mentor Leader'] },
      ],
      applied_volunteers: [
        { id: 'av12', name: 'Alex Evans', skills: ['Teaching', 'Tutoring'], availability: 'Weekdays', timeCommitmentMinutes: 60, badges: [] },
        { id: 'av13', name: 'Taylor Edwards', skills: ['Education', 'Mentoring'], availability: 'Afterschool', timeCommitmentMinutes: 90, badges: ['✨ Community Star'] },
      ],
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
