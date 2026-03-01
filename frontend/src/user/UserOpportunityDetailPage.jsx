import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOpportunity } from '../api/client'
import { Clock, Tag, MapPin, ArrowLeft } from 'lucide-react'

export default function UserOpportunityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [opportunity, setOpportunity] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOpportunity(id).then((data) => {
      setOpportunity(data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate('/feed')}
          className="text-slate-500 hover:text-kindr-primary flex items-center gap-1 mb-6"
        >
          <ArrowLeft size={18} /> Back to feed
        </button>
        <p className="text-slate-500">Loading opportunity…</p>
      </div>
    )
  }

  if (!opportunity) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate('/feed')}
          className="text-slate-500 hover:text-kindr-primary flex items-center gap-1 mb-4"
        >
          <ArrowLeft size={18} /> Back to feed
        </button>
        <p className="text-slate-500">Opportunity not found.</p>
      </div>
    )
  }

  const { title, description, deliverables, category, required_skills, timeEstimate, time_estimate, location, organizationName, organizationId } = opportunity
  const timeLabel = timeEstimate || (time_estimate != null ? `${time_estimate} min` : '—')

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          type="button"
          onClick={() => navigate('/feed')}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition"
        >
          <ArrowLeft size={18} /> Back to Opportunities
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-slate-200 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                {category && (
                  <span className="inline-block text-xs px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold uppercase tracking-wide mb-3">{category}</span>
                )}
                <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
              </div>
            </div>

            {(organizationId || organizationName) && (
              <Link to={`/user/organization-profile/${organizationId === 'demo-org' ? 'kindr-demo' : organizationId || opportunity.orgId}`} className="inline-block mb-6">
                <span className="text-blue-600 hover:text-blue-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                  → {organizationName || 'View Organization'}
                </span>
              </Link>
            )}

            {/* Meta Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Time Commitment</p>
                  <p className="text-lg font-bold text-slate-900">{timeLabel}</p>
                </div>
              </div>
              
              {location && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <MapPin size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Location</p>
                    <p className="text-lg font-bold text-slate-900">{location}</p>
                  </div>
                </div>
              )}

              {required_skills && required_skills.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Tag size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Skills</p>
                    <p className="text-lg font-bold text-slate-900">{required_skills.length} needed</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-8">
            {/* Description */}
            {description && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">About This Opportunity</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
              </div>
            )}

            {/* Skills Required */}
            {required_skills && required_skills.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {required_skills.map((s) => (
                    <span key={s} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition">
                      <Tag size={16} /> {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables */}
            {deliverables && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">What You'll Deliver</h2>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-700">{deliverables}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Section */}
          <div className="p-8 border-t border-slate-200 bg-slate-50 flex flex-wrap gap-3">
            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Apply for Opportunity
            </button>
            <button
              type="button"
              onClick={() => navigate('/feed')}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
