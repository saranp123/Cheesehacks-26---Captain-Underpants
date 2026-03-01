import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Globe, Mail } from 'lucide-react'
import { Clock } from 'lucide-react'

// Mock data for organizations accessible to users
const ORGANIZATION_DATA = {
  'kindr-demo': {
    id: 'kindr-demo',
    name: 'Kindr Demo Nonprofit',
    description: 'A nonprofit focused on community engagement and local volunteer impact.',
    mission: 'Empower individuals to make meaningful change through accessible volunteering opportunities.',
    location: 'Madison, WI',
    contact: 'contact@kindr.org',
    website: 'https://kindr.org',
    logo: '🤝',
    totalVolunteers: 45,
    totalHours: 320,
    rating: 4.8,
    reviews: 12,
    opportunities: [
      {
        id: 'opp_001',
        title: 'Community Outreach Coordinator',
        description: 'Help coordinate community outreach events and volunteer recruitment campaigns.',
        timeCommitment: '4-6 hours/week',
        requiredSkills: ['Events', 'Social Media', 'Communication'],
        badge: 'Ongoing',
      },
      {
        id: 'opp_002',
        title: 'Newsletter Writer',
        description: 'Write and edit weekly newsletters highlighting volunteer impact and upcoming opportunities.',
        timeCommitment: '2-3 hours/week',
        requiredSkills: ['Writing', 'Editing'],
        badge: 'Flexible',
      },
      {
        id: 'opp_003',
        title: 'Data Entry & Database Management',
        description: 'Help maintain our volunteer database and input program data to track impact.',
        timeCommitment: '3-5 hours/week',
        requiredSkills: ['Data Entry', 'Excel', 'Attention to Detail'],
        badge: 'Remote',
      },
    ],
  },
}

export default function UserOrganizationDetailPage() {
  const { orgId } = useParams()
  const navigate = useNavigate()
  const org = ORGANIZATION_DATA[orgId]

  if (!org) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Organization Not Found</h2>
          <p className="text-slate-500">The organization you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Organization Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-8 mb-6">
        <div className="flex items-start gap-6">
          <div className="text-6xl">{org.logo}</div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{org.name}</h1>
            <p className="text-slate-600 mb-3">{org.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {org.location}
              </span>
              <span className="flex items-center gap-1">
                👥 {org.totalVolunteers} volunteers
              </span>
              <span className="flex items-center gap-1">
                ⏱️ {org.totalHours} hours contributed
              </span>
              <span className="flex items-center gap-1">
                ⭐ {org.rating} ({org.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Contact */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Our Mission</h3>
          <p className="text-slate-600">{org.mission}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Contact & Web</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-blue-600 mt-1 flex-shrink-0" />
              <a href={`mailto:${org.contact}`} className="text-blue-600 hover:underline">
                {org.contact}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Globe size={18} className="text-blue-600 mt-1 flex-shrink-0" />
              <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {org.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Available Opportunities */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Available Opportunities</h2>
        <div className="space-y-4">
          {org.opportunities && org.opportunities.length > 0 ? (
            org.opportunities.map((opp) => (
              <div key={opp.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/30 transition">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800">{opp.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">{opp.description}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium whitespace-nowrap">
                    {opp.badge}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-3">
                  <span className="flex items-center gap-1">
                    <Clock size={16} /> {opp.timeCommitment}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {opp.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-block px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                  Learn More
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-center py-6">No opportunities currently available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
