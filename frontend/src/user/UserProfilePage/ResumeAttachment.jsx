import { useState } from 'react'
import { FileUp, Download, Trash2 } from 'lucide-react'

export default function ResumeAttachment({ resume, onUpload, isEditing }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (file) => {
    if (!file) return

    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.')
      return
    }

    // Store file info
    onUpload({
      fileName: file.name,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString().split('T')[0],
    })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    handleFileSelect(file)
  }

  const handleInputChange = (e) => {
    const file = e.target.files?.[0]
    handleFileSelect(file)
  }

  const handleRemove = () => {
    onUpload(null)
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <FileUp size={20} />
        Resume
      </h2>

      {resume ? (
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{resume.fileName}</p>
              {resume.uploadedAt && (
                <p className="text-xs text-slate-500">Uploaded: {resume.uploadedAt}</p>
              )}
            </div>
            <a
              href={resume.url}
              download={resume.fileName}
              className="flex-shrink-0 p-2 text-kindr-primary hover:bg-kindr-primary/10 rounded-lg transition"
              title="Download resume"
            >
              <Download size={18} />
            </a>
          </div>
          {isEditing && (
            <button
              onClick={handleRemove}
              className="w-full px-3 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition flex items-center justify-center gap-1"
            >
              <Trash2 size={14} /> Remove
            </button>
          )}
        </div>
      ) : isEditing ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`p-6 rounded-lg border-2 border-dashed transition cursor-pointer ${
            isDragging
              ? 'border-kindr-primary bg-kindr-primary/5'
              : 'border-slate-300 hover:border-kindr-primary hover:bg-slate-50'
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleInputChange}
            className="hidden"
            id="resume-input"
          />
          <label htmlFor="resume-input" className="flex flex-col items-center gap-2 cursor-pointer">
            <FileUp size={28} className="text-slate-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">Drag and drop your resume</p>
              <p className="text-xs text-slate-500">or click to select (PDF, max 5MB)</p>
            </div>
          </label>
        </div>
      ) : (
        <p className="text-slate-400 text-sm italic">No resume uploaded.</p>
      )}
    </div>
  )
}
