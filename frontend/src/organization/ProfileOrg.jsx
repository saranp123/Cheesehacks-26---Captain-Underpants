import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BLUEWAVE_ORG } from './profileData'
import OrgHeroSection from './Profile/OrgHeroSection'
import MissionValuesSection from './Profile/MissionValuesSection'
import OrgOpportunitiesSection from './Profile/OrgOpportunitiesSection'
import ImpactSnapshot from './Profile/ImpactSnapshot'
import VolunteerHighlights from './Profile/VolunteerHighlights'
import { getOrg } from '../api/client'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'opportunities', label: 'Opportunities' },
  { id: 'impact', label: 'Impact' },
]

export default function ProfileOrg() {
  const [activeTab, setActiveTab] = useState('overview')
  const [org, setOrg] = useState(BLUEWAVE_ORG)

  useEffect(() => {
    let cancelled = false
    const id = BLUEWAVE_ORG?.id || 'mock-org'
    getOrg(id).then(data => { if (!cancelled && data) setOrg(data) }).catch(() => {})
    return () => { cancelled = true }
  }, [])

  const handleContact = () => {
    window.location.href = 'mailto:hello@bluewavecollective.org'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <OrgHeroSection org={org} onContact={handleContact} />

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 mt-8 mb-6">
        <nav className="flex gap-6 border-b border-slate-200" aria-label="Profile sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-semibold text-sm transition ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="space-y-10">
          {activeTab === 'overview' && (
            <>
              <MissionValuesSection org={org} />
              <VolunteerHighlights featuredVolunteers={org.featuredVolunteers} />
              <JoinCTA />
            </>
          )}
          {activeTab === 'opportunities' && (
            <>
              <OrgOpportunitiesSection opportunities={org.opportunities} orgId={org.id} />
              <JoinCTA />
            </>
          )}
          {activeTab === 'impact' && (
            <>
              <ImpactSnapshot org={org} />
              <JoinCTA />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function JoinCTA() {
  return (
    <section className="bg-gradient-to-r from-kindr-primary/10 to-kindr-secondary/10 rounded-2xl border border-slate-200 p-8 text-center">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Join our community</h2>
      <p className="text-slate-600 mb-4 max-w-md mx-auto">
        Whether you have an hour or a season to give, your action matters. Find an opportunity above or reach out to get involved.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/org/feed"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-kindr-primary text-white font-medium hover:bg-kindr-secondary transition"
        >
          View opportunities
        </Link>
        <a
          href="mailto:hello@bluewavecollective.org"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-kindr-primary text-kindr-primary font-medium hover:bg-kindr-primary/10 transition"
        >
          Get in touch
        </a>
      </div>
    </section>
  )
}
