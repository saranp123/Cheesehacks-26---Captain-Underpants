import { useState } from 'react'
import { FileText } from 'lucide-react'

export default function AboutSection({ bio, onBioUpdate, isEditing }) {
  const [tempBio, setTempBio] = useState(bio)

  const handleSave = () => {
    onBioUpdate(tempBio)
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <FileText size={20} />
        About
      </h2>
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={tempBio}
            onChange={e => setTempBio(e.target.value)}
            placeholder="Write your bio..."
            rows={4}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-kindr-primary"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-kindr-primary text-white font-medium hover:bg-kindr-secondary transition"
          >
            Save Bio
          </button>
        </div>
      ) : (
        <p className="text-slate-600 leading-relaxed">
          {bio || (
            <span className="text-slate-400 italic">No bio added yet. Click "Edit Profile" to add one.</span>
          )}
        </p>
      )}
    </div>
  )
}
