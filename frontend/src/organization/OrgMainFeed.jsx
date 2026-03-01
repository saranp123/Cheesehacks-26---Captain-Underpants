import React, { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const orgFeedMock = [
  {
    id: "opp_001",
    title: "Park Cleanup",
    description: "Help clean up Central Park this weekend — trash pickup, sorting recyclables, and light landscaping.",
    durationMinutes: 120,
    orgName: "GreenEarth Initiative",
    requiredSkills: ["Teamwork", "Physical Labor"],
    badges: ["Outdoor"],
    suggestedVolunteers: [
      { name: "Alex P.", skills: ["Physical Labor"], availability: "Sat/Sun", timeCommitmentMinutes: 120, badges: ["Top Volunteer"] },
      { name: "Taylor K.", skills: ["Teamwork"], availability: "Sat", timeCommitmentMinutes: 90, badges: ["Quick Task"] },
      { name: "Sam R.", skills: ["Physical Labor", "First Aid"], availability: "Sun", timeCommitmentMinutes: 120, badges: [] }
    ],
    appliedVolunteers: [
      { name: "Jordan L.", skills: ["Physical Labor"], availability: "Sat/Sun", timeCommitmentMinutes: 120, badges: [] },
      { name: "Casey M.", skills: ["Teamwork"], availability: "Sun", timeCommitmentMinutes: 60, badges: ["Newbie"] },
      { name: "Riley B.", skills: ["Logistics"], availability: "Sat", timeCommitmentMinutes: 120, badges: ["Reliable"] }
    ]
  },
  {
    id: "opp_002",
    title: "Soup Kitchen Volunteer",
    description: "Serve meals and help with food prep at the downtown soup kitchen.",
    durationMinutes: 180,
    orgName: "Community Table",
    requiredSkills: ["Food Handling", "Customer Service"],
    badges: ["Food"],
    suggestedVolunteers: [
      { name: "Morgan T.", skills: ["Food Handling"], availability: "Weekdays", timeCommitmentMinutes: 180, badges: ["Experienced"] },
      { name: "Drew S.", skills: ["Customer Service"], availability: "Sat", timeCommitmentMinutes: 120, badges: [] },
      { name: "Avery N.", skills: ["Food Handling", "Teamwork"], availability: "Weekdays", timeCommitmentMinutes: 180, badges: ["Top Volunteer"] }
    ],
    appliedVolunteers: [
      { name: "Lee C.", skills: ["Customer Service"], availability: "Sat/Sun", timeCommitmentMinutes: 120, badges: [] },
      { name: "Parker Q.", skills: ["Food Handling"], availability: "Weekdays", timeCommitmentMinutes: 180, badges: ["First-Timer"] },
      { name: "Jordan W.", skills: ["Teamwork"], availability: "Sun", timeCommitmentMinutes: 90, badges: [] }
    ]
  },
  {
    id: "opp_003",
    title: "Senior Companion Calls",
    description: "Make friendly, weekly phone calls to seniors in the community to reduce loneliness.",
    durationMinutes: 30,
    orgName: "GoldenYears",
    requiredSkills: ["Communication", "Empathy"],
    badges: ["Remote"],
    suggestedVolunteers: [
      { name: "Kai Z.", skills: ["Communication"], availability: "Weekdays", timeCommitmentMinutes: 30, badges: ["Consistent"] },
      { name: "Robin Y.", skills: ["Empathy"], availability: "Weekdays", timeCommitmentMinutes: 30, badges: [] },
      { name: "Chris V.", skills: ["Communication", "Empathy"], availability: "Evenings", timeCommitmentMinutes: 30, badges: [] }
    ],
    appliedVolunteers: [
      { name: "Sam K.", skills: ["Empathy"], availability: "Weekdays", timeCommitmentMinutes: 30, badges: ["Newbie"] },
      { name: "Taylor Z.", skills: ["Communication"], availability: "Evenings", timeCommitmentMinutes: 30, badges: [] },
      { name: "Jordan P.", skills: ["Listening"], availability: "Weekdays", timeCommitmentMinutes: 30, badges: ["Reliable"] }
    ]
  }
];

function formatDuration(mins) {
  if (mins < 60) return `${mins}m`;
  if (mins % 60 === 0) return `${mins / 60}h`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

export default function OrgMainFeed() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [opportunities] = useState(orgFeedMock);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFiltersDropdown(false);
      }
    }
    if (showFiltersDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showFiltersDropdown]);

  const allSkills = useMemo(() => {
    const set = new Set();
    opportunities.forEach((o) => o.requiredSkills.forEach((s) => set.add(s)));
    opportunities.forEach((o) => o.suggestedVolunteers.forEach(v => v.skills.forEach(s => set.add(s))));
    opportunities.forEach((o) => o.appliedVolunteers.forEach(v => v.skills.forEach(s => set.add(s))));
    return Array.from(set).sort();
  }, [opportunities]);

  const filteredOpps = useMemo(() => {
    return opportunities.filter((o) => {
      if (selectedSkill) {
        const has = o.requiredSkills.includes(selectedSkill) || o.suggestedVolunteers.some(v => v.skills.includes(selectedSkill)) || o.appliedVolunteers.some(v => v.skills.includes(selectedSkill));
        if (!has) return false;
      }
      if (selectedAvailability) {
        const hasAvail = o.suggestedVolunteers.concat(o.appliedVolunteers).some(v => v.availability.includes(selectedAvailability));
        if (!hasAvail) return false;
      }
      if (selectedTimeRange !== "all") {
        const mins = o.durationMinutes;
        if (selectedTimeRange === "short" && mins >= 60) return false;
        if (selectedTimeRange === "medium" && (mins < 60 || mins > 120)) return false;
        if (selectedTimeRange === "long" && mins <= 120) return false;
      }
      return true;
    });
  }, [opportunities, selectedSkill, selectedAvailability, selectedTimeRange]);

  function handleMessage(volunteer) {
    // Navigate to messaging page with volunteer info in state
    navigate('/org/messages', { 
      state: { 
        recipientName: volunteer.name,
        recipientId: volunteer.id,
        volunteerId: volunteer.id
      } 
    })
  }

  function handleViewProfile(volunteer) {
    // Navigate to volunteer profile
    navigate(`/volunteer/${volunteer.id}`)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Organization Main Feed</h1>
            <p className="text-slate-500 text-sm mt-1">Manage opportunities and connect with volunteers</p>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
            >
              ⚙️ Filters
            </button>

            {showFiltersDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg z-50 p-6 border border-slate-200 transition-all">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Filter Opportunities</h3>
                
                {/* Skills */}
                <div className="mb-4">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-600 block mb-2">Skill</label>
                  <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Skills</option>
                    {allSkills.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Availability */}
                <div className="mb-4">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-600 block mb-2">Availability</label>
                  <select value={selectedAvailability} onChange={e => setSelectedAvailability(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Times</option>
                    <option value="Sat">Saturday</option>
                    <option value="Sun">Sunday</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Evenings">Evenings</option>
                  </select>
                </div>

                {/* Time Commitment */}
                <div className="mb-4">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-600 block mb-2">Time Commitment</label>
                  <select value={selectedTimeRange} onChange={e => setSelectedTimeRange(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">All</option>
                    <option value="short">&lt; 1 hour</option>
                    <option value="medium">1–2 hours</option>
                    <option value="long">&gt; 2 hours</option>
                  </select>
                </div>

                {/* Clear Filters Button */}
                <button
                  onClick={() => {
                    setSelectedSkill("");
                    setSelectedAvailability("");
                    setSelectedTimeRange("all");
                  }}
                  className="w-full text-sm text-slate-600 hover:text-blue-600 font-semibold py-2 border-t border-slate-200 mt-4 transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="space-y-6">
          {filteredOpps.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No opportunities match your filters</h3>
              <p className="text-slate-500">Try adjusting your filter selections</p>
            </div>
          ) : (
            filteredOpps.map((opp) => (
              <div key={opp.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-1">
                  {/* Left column - opportunity card */}
                  <div className="p-6 lg:border-r border-slate-200">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📋</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900">{opp.title}</h3>
                        {opp.badges && opp.badges.length > 0 && (
                          <div className="flex gap-1.5 mt-2">
                            {opp.badges.map(b => (
                              <span key={b} className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold">{b}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{opp.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="font-semibold text-slate-500">Time:</span>
                        <span className="font-medium">{formatDuration(opp.durationMinutes)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="font-semibold text-slate-500">Organization:</span>
                        <span className="font-medium">{opp.orgName}</span>
                      </div>
                      {opp.requiredSkills && opp.requiredSkills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {opp.requiredSkills.map(skill => (
                            <span key={skill} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center column - suggested volunteers */}
                  <div className="p-6 lg:border-r border-slate-200">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-slate-600 mb-4">Suggested Volunteers</h4>
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                      {opp.suggestedVolunteers.length === 0 ? (
                        <p className="text-sm text-slate-500 py-4">No suggested volunteers</p>
                      ) : (
                        opp.suggestedVolunteers.map((v, i) => (
                          <div key={i} className="p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-semibold text-slate-900 text-sm">{v.name}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{v.skills.join(", ")}</div>
                              </div>
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">{v.availability}</span>
                            </div>
                            <div className="mb-2 text-xs text-slate-600 font-medium">{formatDuration(v.timeCommitmentMinutes)}</div>
                            {v.badges && v.badges.length > 0 && (
                              <div className="flex gap-1 mb-2">
                                {v.badges.map(b => (
                                  <span key={b} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{b}</span>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <button onClick={() => handleMessage(v)} className="flex-1 text-xs bg-blue-600 text-white px-2 py-1.5 rounded-lg hover:bg-blue-700 transition font-semibold">Message</button>
                              <button onClick={() => handleViewProfile(v)} className="flex-1 text-xs border border-slate-300 text-slate-700 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition font-semibold">Profile</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Right column - applied volunteers */}
                  <div className="p-6">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-slate-600 mb-4">Applied Volunteers</h4>
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                      {opp.appliedVolunteers.length === 0 ? (
                        <p className="text-sm text-slate-500 py-4">No applications yet</p>
                      ) : (
                        opp.appliedVolunteers.map((v, i) => (
                          <div key={i} className="p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-green-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-semibold text-slate-900 text-sm">{v.name}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{v.skills.join(", ")}</div>
                              </div>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">{v.availability}</span>
                            </div>
                            <div className="mb-2 text-xs text-slate-600 font-medium">{formatDuration(v.timeCommitmentMinutes)}</div>
                            {v.badges && v.badges.length > 0 && (
                              <div className="flex gap-1 mb-2">
                                {v.badges.map(b => (
                                  <span key={b} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{b}</span>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <button onClick={() => handleMessage(v)} className="flex-1 text-xs bg-blue-600 text-white px-2 py-1.5 rounded-lg hover:bg-blue-700 transition font-semibold">Message</button>
                              <button onClick={() => handleViewProfile(v)} className="flex-1 text-xs border border-slate-300 text-slate-700 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition font-semibold">Profile</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
