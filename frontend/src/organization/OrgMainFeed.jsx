import React, { useMemo, useState, useRef, useEffect } from "react";

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

  function handleMessage(vol) {
    // placeholder action — state-only
    alert(`Message ${vol.name} (mock)`);
  }
  function handleViewProfile(vol) {
    alert(`View profile for ${vol.name} (mock)`);
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Organization Main Feed</h2>
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
                  <option value="Sat">Sat</option>
                  <option value="Sun">Sun</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Evenings">Evenings</option>
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
    </div>
  );
}
