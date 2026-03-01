import React, { useMemo, useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Mock opportunities for viewing organizations
const ORGANIZATION_OPPORTUNITIES = {
  "kindr-demo": {
    name: "Kindr Demo Nonprofit",
    location: "Madison, WI",
    opportunities: [
      {
        id: "kindr_opp_001",
        title: "Community Literacy Tutor",
        description: "Help adults improve reading and writing skills through one-on-one tutoring sessions.",
        durationMinutes: 90,
        orgName: "Kindr Demo Nonprofit",
        requiredSkills: ["Teaching", "Tutoring", "Communication"],
        badges: ["In-Person"],
        suggestedVolunteers: [
          { name: "Sarah M.", skills: ["Teaching", "Communication"], availability: "Weekdays", timeCommitmentMinutes: 90, badges: ["Top Volunteer"] },
          { name: "Marcus D.", skills: ["Tutoring", "Patience"], availability: "Evenings", timeCommitmentMinutes: 90, badges: [] },
          { name: "Lisa K.", skills: ["Teaching"], availability: "Weekends", timeCommitmentMinutes: 90, badges: ["Experienced"] },
          { name: "James P.", skills: ["Communication"], availability: "Flexible", timeCommitmentMinutes: 90, badges: [] },
        ],
        appliedVolunteers: [
          { name: "Emma T.", skills: ["Teaching"], availability: "Weekdays", timeCommitmentMinutes: 90, badges: ["Newbie"] },
          { name: "David R.", skills: ["Communication", "Tutoring"], availability: "Evenings", timeCommitmentMinutes: 90, badges: [] },
          { name: "Nina L.", skills: ["Tutoring"], availability: "Weekends", timeCommitmentMinutes: 90, badges: ["Consistent"] },
        ]
      },
      {
        id: "kindr_opp_002",
        title: "Social Media Content Creator",
        description: "Create engaging social media content highlighting volunteer impact stories and upcoming opportunities.",
        durationMinutes: 120,
        orgName: "Kindr Demo Nonprofit",
        requiredSkills: ["Social Media", "Writing", "Design"],
        badges: ["Remote"],
        suggestedVolunteers: [
          { name: "Alex Chen.", skills: ["Social Media", "Writing"], availability: "Flexible", timeCommitmentMinutes: 120, badges: ["Creative"] },
          { name: "Jordan S.", skills: ["Design", "Social Media"], availability: "Weekdays", timeCommitmentMinutes: 120, badges: [] },
          { name: "Riley T.", skills: ["Writing"], availability: "Flexible", timeCommitmentMinutes: 120, badges: ["Top Volunteer"] },
          { name: "Casey L.", skills: ["Social Media"], availability: "Weekends", timeCommitmentMinutes: 120, badges: [] },
          { name: "Morgan B.", skills: ["Design", "Writing"], availability: "Weekdays", timeCommitmentMinutes: 120, badges: [] },
        ],
        appliedVolunteers: [
          { name: "Taylor H.", skills: ["Social Media"], availability: "Flexible", timeCommitmentMinutes: 120, badges: [] },
          { name: "Quinn M.", skills: ["Writing", "Design"], availability: "Weekends", timeCommitmentMinutes: 120, badges: ["Newbie"] },
          { name: "Sage O.", skills: ["Social Media", "Design"], availability: "Weekdays", timeCommitmentMinutes: 120, badges: ["Quick Learner"] },
        ]
      },
      {
        id: "kindr_opp_003",
        title: "Event Planning & Coordination",
        description: "Help plan and coordinate volunteer appreciation events and community outreach activities.",
        durationMinutes: 180,
        orgName: "Kindr Demo Nonprofit",
        requiredSkills: ["Events", "Organization", "Leadership"],
        badges: ["Hybrid"],
        suggestedVolunteers: [
          { name: "Sophia V.", skills: ["Events", "Organization"], availability: "Weekdays", timeCommitmentMinutes: 180, badges: ["Leader"] },
          { name: "Lucas W.", skills: ["Leadership"], availability: "Flexible", timeCommitmentMinutes: 180, badges: [] },
          { name: "Ava Y.", skills: ["Events"], availability: "Weekends", timeCommitmentMinutes: 180, badges: ["Top Volunteer"] },
        ],
        appliedVolunteers: [
          { name: "Noah Z.", skills: ["Organization"], availability: "Weekdays", timeCommitmentMinutes: 180, badges: [] },
          { name: "Olivia A.", skills: ["Events", "Leadership"], availability: "Flexible", timeCommitmentMinutes: 180, badges: ["Newbie"] },
          { name: "Ethan B.", skills: ["Organization", "Events"], availability: "Weekends", timeCommitmentMinutes: 180, badges: ["Reliable"] },
          { name: "Isabella C.", skills: ["Leadership"], availability: "Weekdays", timeCommitmentMinutes: 180, badges: [] },
        ]
      },
    ]
  }
};

function formatDuration(mins) {
  if (mins < 60) return `${mins}m`;
  if (mins % 60 === 0) return `${mins / 60}h`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

export default function UserOrganizationFeedView() {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const orgData = ORGANIZATION_OPPORTUNITIES[orgId];
  
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

  if (!orgData) {
    return (
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800">Organization Not Found</h2>
          <p className="text-slate-500 mt-2">This organization's opportunities are not available.</p>
        </div>
      </div>
    );
  }

  const opportunities = orgData.opportunities || [];

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

  function handleMessage(vol) {
    alert(`Message ${vol.name} (mock)`);
  }
  function handleViewProfile(vol) {
    alert(`View profile for ${vol.name} (mock)`);
  }

  return (
    <div className="p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <ArrowLeft size={20} /> Back to Feed
      </button>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{orgData.name}</h1>
          <p className="text-slate-600 mt-1">{orgData.location}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-end items-center mb-6">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Filters
          </button>

          {showFiltersDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg z-50 p-4 border border-gray-200 transition-all">
              {/* Skills */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-2">Skill</label>
                <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} className="w-full border rounded px-2 py-2 text-sm">
                  <option value="">All</option>
                  {allSkills.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-2">Availability</label>
                <select value={selectedAvailability} onChange={e => setSelectedAvailability(e.target.value)} className="w-full border rounded px-2 py-2 text-sm">
                  <option value="">All</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Evenings">Evenings</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              {/* Time Commitment */}
              <div className="mb-4">
                <label className="text-sm font-medium block mb-2">Time Commitment</label>
                <select value={selectedTimeRange} onChange={e => setSelectedTimeRange(e.target.value)} className="w-full border rounded px-2 py-2 text-sm">
                  <option value="all">All</option>
                  <option value="short">&lt; 60m</option>
                  <option value="medium">60–120m</option>
                  <option value="long">&gt; 120m</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={() => {
                  setSelectedSkill("");
                  setSelectedAvailability("");
                  setSelectedTimeRange("all");
                }}
                className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium py-2 border-t"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="space-y-6">
        {filteredOpps.map((opp) => (
          <div key={opp.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex gap-4">
              {/* Left column - opportunity card */}
              <div className="w-1/2">
                <h3 className="text-lg font-semibold">{opp.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{opp.description}</p>
                <div className="mt-3 text-sm text-gray-700">
                  <div><strong>Time:</strong> {formatDuration(opp.durationMinutes)}</div>
                  <div><strong>Organization:</strong> {opp.orgName}</div>
                  <div className="mt-2"><strong>Skills:</strong> {opp.requiredSkills.join(", ")}</div>
                  {opp.badges && opp.badges.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {opp.badges.map(b => (
                        <span key={b} className="text-xs bg-gray-100 px-2 py-1 rounded">{b}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Center column - suggested volunteers */}
              <div className="w-1/4">
                <div className="text-sm font-medium mb-2">Suggested</div>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
                  {opp.suggestedVolunteers.map((v, i) => (
                    <div key={i} className="p-2 border rounded flex flex-col bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{v.name}</div>
                          <div className="text-xs text-gray-600">{v.skills.join(", ")}</div>
                        </div>
                        <div className="text-xs text-gray-600">{v.availability}</div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-xs text-gray-700">{formatDuration(v.timeCommitmentMinutes)}</div>
                        <div className="flex gap-2">
                          <button onClick={() => handleMessage(v)} className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Message</button>
                          <button onClick={() => handleViewProfile(v)} className="text-xs border px-2 py-1 rounded">Profile</button>
                        </div>
                      </div>
                      {v.badges && v.badges.length > 0 && (
                        <div className="mt-2 flex gap-1">
                          {v.badges.map(b => <span key={b} className="text-xs bg-yellow-100 px-2 py-0.5 rounded">{b}</span>)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column - applied volunteers */}
              <div className="w-1/4">
                <div className="text-sm font-medium mb-2">Applied</div>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
                  {opp.appliedVolunteers.map((v, i) => (
                    <div key={i} className="p-2 border rounded flex flex-col bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{v.name}</div>
                          <div className="text-xs text-gray-600">{v.skills.join(", ")}</div>
                        </div>
                        <div className="text-xs text-gray-600">{v.availability}</div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-xs text-gray-700">{formatDuration(v.timeCommitmentMinutes)}</div>
                        <div className="flex gap-2">
                          <button onClick={() => handleMessage(v)} className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Message</button>
                          <button onClick={() => handleViewProfile(v)} className="text-xs border px-2 py-1 rounded">Profile</button>
                        </div>
                      </div>
                      {v.badges && v.badges.length > 0 && (
                        <div className="mt-2 flex gap-1">
                          {v.badges.map(b => <span key={b} className="text-xs bg-green-100 px-2 py-0.5 rounded">{b}</span>)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOpps.length === 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
          <p className="text-slate-500">No opportunities match your filters.</p>
        </div>
      )}
    </div>
  );
}
