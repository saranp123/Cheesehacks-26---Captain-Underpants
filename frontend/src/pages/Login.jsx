import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('demo@kindr.demo')
  const [password, setPassword] = useState('demo123')
  const [isOrg, setIsOrg] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (signUp) {
        await signup(email, password, name || (isOrg ? 'Demo Org' : 'Demo User'), isOrg)
      } else {
        await login(email, password, isOrg)
      }
      navigate(isOrg ? '/org/feed' : '/feed')
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-cyan-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-kindr-primary font-bold text-2xl">
            <Heart className="w-8 h-8" />
            Kindr
          </div>
        </div>
        <p className="text-center text-slate-500 text-sm mb-6">Micro-volunteering for students & nonprofits</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {signUp && (
            <input
              type="text"
              placeholder={isOrg ? 'Organization name' : 'Your name'}
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5"
            required
          />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isOrg} onChange={e => setIsOrg(e.target.checked)} />
            I'm an organization
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-kindr-primary text-white font-medium hover:bg-kindr-secondary transition"
          >
            {signUp ? 'Sign up' : 'Log in'}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setSignUp(s => !s)}
          className="w-full mt-4 text-sm text-kindr-primary hover:underline"
        >
          {signUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  )
}
