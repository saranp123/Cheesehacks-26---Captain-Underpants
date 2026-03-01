import { useState } from 'react'
import { Clock, Tag, MessageCircle, User, Filter } from 'lucide-react'

export default function OrgOpportunitiesSection({ opportunities, orgId = 'bluewave' }) {
  const [expandedOpp, setExpandedOpp] = useState(null)
  const [skillFilter, setSkillFilter] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('')

  if (!opportunities || opportunities.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Current opportunities</h2>
        <p className="text-slate-500">No active opportunities right now. Check back soon.</p>
      </section>
    )
  }

  // Collect all unique skills and availability values for filters
  const allSkills = new Set()
  const allAvailability = new Set()
  opportunities.forEach(opp => {
    ;(opp.suggested_volunteers || []).forEach(v => {
      v.skills?.forEach(s => allSkills.add(s))
      allAvailability.add(v.availability)
    })
    ;(opp.applied_volunteers || []).forEach(v => {
      v.skills?.forEach(s => allSkills.add(s))
      allAvailability.add(v.availability)
    })
  })

  const filterVolunteers = (volunteers) => {
    return volunteers.filter(v => {
      const matchSkill = !skillFilter || v.skills?.includes(skillFilter)
      const matchAvail = !availabilityFilter || v.availability === availabilityFilter
      return matchSkill && matchAvail
    })
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Current volunteering opportunities</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-500" />
            <select
              value={skillFilter}
              onChange={e => setSkillFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kindr-primary"
            >
              <option value="">All Skills</option>
              {Array.from(allSkills).sort().map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          
          <select
            value={availabilityFilter}
            onChange={e => setAvailabilityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kindr-primary"
          >
            <option value="">All Availability</option>
            {Array.from(allAvailability).sort().map(avail => (
              <option key={avail} value={avail}>{avail}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-6">
        {opportunities.map((opp) => {
          const isExpanded = expandedOpp === opp.id
          const filteredSuggested = filterVolunteers(opp.suggested_volunteers || [])
          const filteredApplied = filterVolunteers(opp.applied_volunteers || [])

          return (
            <div key={opp.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              {/* Header */}
              <button
                onClick={() => setExpandedOpp(isExpanded ? null : opp.id)}
                className="w-full text-left p-4 hover:bg-slate-50 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-2">{opp.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">{opp.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {opp.category}
                      </span>
                      <span className="text-xs flex items-center gap-1 text-slate-500">
                        <Clock size={12} /> {opp.timeEstimate || `${opp.time_estimate} min`}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(opp.required_skills || []).map(s => (
                        <span key={s} className="text-xs text-slate-500 flex items-center gap-0.5">
                          <Tag size={10} /> {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-medium text-kindr-primary">
                      {(opp.suggested_volunteers?.length || 0) + (opp.applied_volunteers?.length || 0)} volunteers
                    </div>
                    <span className={`text-xl transition ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-4 bg-slate-50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Suggested Volunteers */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3 text-sm">
                        Suggested Volunteers ({filteredSuggested.length})
                      </h4>
                      <div className="space-y-3">
                        {filteredSuggested.length > 0 ? (
                          filteredSuggested.map(vol => (
                            <VolunteerCard key={vol.id} volunteer={vol} />
                          ))
                        ) : (
                          <p className="text-xs text-slate-500">No matching volunteers</p>
                        )}
                      </div>
                    </div>

                    {/* Applied Volunteers */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3 text-sm">
                        Applied ({filteredApplied.length})
                      </h4>
                      <div className="space-y-3">
                        {filteredApplied.length > 0 ? (
                          filteredApplied.map(vol => (
                            <VolunteerCard key={vol.id} volunteer={vol} isApplied />
                          ))
                        ) : (
                          <p className="text-xs text-slate-500">No matching volunteers</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function VolunteerCard({ volunteer, isApplied = false }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-sm transition">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-slate-800 text-sm">{volunteer.name}</p>
          {volunteer.badges?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {volunteer.badges.map(badge => (
                <span key={badge} className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      {volunteer.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {volunteer.skills.map(skill => (
            <span key={skill} className="text-xs bg-kindr-primary/10 text-kindr-primary px-2 py-0.5 rounded">
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Availability & Time */}
      <div className="text-xs text-slate-600 space-y-1 mb-3">
        <p>📅 {volunteer.availability}</p>
        <p>⏱️ {Math.round(volunteer.timeCommitmentMinutes / 60)}h commitment</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 px-2 py-1.5 rounded border border-kindr-primary text-kindr-primary hover:bg-kindr-primary/5 text-xs font-medium transition flex items-center justify-center gap-1">
          <MessageCircle size={12} /> Message
        </button>
        <button className="flex-1 px-2 py-1.5 rounded bg-kindr-primary text-white hover:bg-kindr-secondary text-xs font-medium transition flex items-center justify-center gap-1">
          <User size={12} /> Profile
        </button>
      </div>
    </div>
  )
}
