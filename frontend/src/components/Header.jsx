import { Link, useNavigate } from 'react-router-dom'
import { Heart, LayoutDashboard, BarChart3, User, Building2, LogOut, MessageCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import NotificationBell from './NotificationBell'

export default function Header() {
  const { user, profile, logout } = useAuth()
  const navigate = useNavigate()
  const isOrg = profile?.type === 'organization'

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-14">
          <Link to={isOrg ? '/org/feed' : '/feed'} className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-kindr-primary" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-kindr-primary">Kindr</span>
              <span className="text-slate-400 hidden sm:inline">|</span>
              <span className="text-slate-500 text-xs sm:text-sm font-normal hidden sm:inline">
                Small Acts. Sustainable Impact.
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-4">
            {isOrg ? (
              <>
                <Link to="/org/feed" className="text-slate-600 hover:text-kindr-primary flex items-center gap-1">
                  <LayoutDashboard size={18} /> Feed
                </Link>
                <Link to="/post" className="text-slate-600 hover:text-kindr-primary flex items-center gap-1">
                  Post
                </Link>
                <Link to="/org/profile" className="text-slate-600 hover:text-kindr-primary flex items-center gap-1">
                  <Building2 size={18} /> Profile
                </Link>
                <Link to="/org/messages" className="text-slate-600 hover:text-kindr-primary flex items-center gap-1">
                  <MessageCircle size={18} /> Messages
                </Link>
                <NotificationBell />
              </>
            ) : (
              <>
                <Link to="/feed" className="text-slate-600 hover:text-kindr-primary flex items-center gap-1">
                  <LayoutDashboard size={18} /> Feed
                </Link>
                <Link to="/impact" className="text-slate-600 hover:text-kindr-primary flex items-center gap-1">
                  <BarChart3 size={18} /> Impact
                </Link>
                <Link to="/profile/full" className="text-slate-600 hover:text-kindr-primary flex items-center gap-1">
                  <User size={18} /> Profile
                </Link>
                <Link to="/messages" className="text-slate-600 hover:text-kindr-primary flex items-center gap-1">
                  <MessageCircle size={18} /> Messages
                </Link>
                <NotificationBell />
              </>
            )}
            <button onClick={handleLogout} className="text-slate-500 hover:text-red-500 flex items-center gap-1" title="Log out">
              <LogOut size={18} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
