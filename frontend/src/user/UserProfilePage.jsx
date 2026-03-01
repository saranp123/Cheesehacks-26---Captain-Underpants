import { useState } from 'react'
import AboutSection from './UserProfilePage/AboutSection'
import ExperienceList from './UserProfilePage/ExperienceList'
import SkillsSection from './UserProfilePage/SkillsSection'
import ResumeAttachment from './UserProfilePage/ResumeAttachment'

// Mock user data
const mockUserData = {
  id: 'user-001',
  name: 'Alex Mercer',
  bio: 'Passionate volunteer with experience in tutoring and community service.',
  experiences: [
    { id: 'exp1', role: 'Volunteer Tutor', org: 'City Library', dates: 'Jan 2025 - Mar 2025', description: 'Tutored students in math and reading.' },
    { id: 'exp2', role: 'Community Cleanup Lead', org: 'GreenEarth Org', dates: 'Apr 2025 - Jun 2025', description: 'Led a team to clean local parks and streets.' },
  ],
  skills: ['Tutoring', 'Event Planning', 'Graphic Design'],
  resume: { fileName: 'AlexMercerResume.pdf', url: '#', uploadedAt: '2026-02-15' },
}

export default function UserProfilePage() {
  const [userData, setUserData] = useState(mockUserData)
  const [isEditing, setIsEditing] = useState(false)

  const handleBioUpdate = (newBio) => {
    setUserData(prev => ({ ...prev, bio: newBio }))
  }

  const handleSkillAdd = (newSkill) => {
    if (newSkill && !userData.skills.includes(newSkill)) {
      setUserData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }))
    }
  }

  const handleSkillRemove = (skill) => {
    setUserData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }

  const handleExperienceAdd = (exp) => {
    setUserData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { ...exp, id: `exp-${Date.now()}` }],
    }))
  }

  const handleExperienceRemove = (id) => {
    setUserData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id),
    }))
  }

  const handleResumeUpload = (fileInfo) => {
    setUserData(prev => ({ ...prev, resume: fileInfo }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-kindr-primary/20 flex items-center justify-center text-3xl font-bold text-kindr-primary">
                {userData.name.split(' ')[0][0]}{userData.name.split(' ')[1]?.[0] || ''}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{userData.name}</h1>
                <p className="text-sm text-slate-500">Volunteer Profile</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isEditing
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-kindr-primary/10 text-kindr-primary hover:bg-kindr-primary/20'
              }`}
            >
              {isEditing ? '✓ Done' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <AboutSection
            bio={userData.bio}
            onBioUpdate={handleBioUpdate}
            isEditing={isEditing}
          />
          <ExperienceList
            experiences={userData.experiences}
            onAdd={handleExperienceAdd}
            onRemove={handleExperienceRemove}
            isEditing={isEditing}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <SkillsSection
            skills={userData.skills}
            onSkillAdd={handleSkillAdd}
            onSkillRemove={handleSkillRemove}
            isEditing={isEditing}
          />
          <ResumeAttachment
            resume={userData.resume}
            onUpload={handleResumeUpload}
            isEditing={isEditing}
          />
        </div>
      </div>
    </div>
  )
}
