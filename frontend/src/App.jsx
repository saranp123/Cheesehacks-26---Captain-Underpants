import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import UserFeed from './user/UserFeed'
import OrgFeed from './organization/OrgFeed'
import Impact from './pages/Impact'
import ProfilePerson from './user/ProfilePerson'
import ProfileOrg from './organization/ProfileOrg'
import PostOpportunity from './organization/PostOpportunity'
import VolunteerProfileView from './organization/VolunteerProfileView'
import OpportunityDetailPage from './organization/OpportunityDetailPage'
import MessagingPage from './pages/MessagingPage'
import OrgMessagesPage from './organization/OrgMessagesPage'
import Login from './pages/Login'
import { useAuth } from './context/AuthContext'

function ProtectedRoute({ children, requireOrg }) {
  const { user, profile, loading } = useAuth()
  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  if (requireOrg && profile?.type !== 'organization') return <Navigate to="/feed" replace />
  if (requireOrg === false && profile?.type === 'organization') return <Navigate to="/org/feed" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/feed" replace />} />
        <Route path="feed" element={
          <ProtectedRoute requireOrg={false}>
            <UserFeed />
          </ProtectedRoute>
        } />
        <Route path="org/feed" element={
          <ProtectedRoute requireOrg>
            <OrgFeed />
          </ProtectedRoute>
        } />
        <Route path="impact" element={<ProtectedRoute><Impact /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute requireOrg={false}><ProfilePerson /></ProtectedRoute>} />
        <Route path="org/profile" element={<ProtectedRoute requireOrg><ProfileOrg /></ProtectedRoute>} />
        <Route path="post" element={
          <ProtectedRoute requireOrg>
            <PostOpportunity />
          </ProtectedRoute>
        } />
        <Route path="messages" element={<ProtectedRoute><MessagingPage /></ProtectedRoute>} />
        <Route path="org/messages" element={
          <ProtectedRoute requireOrg>
            <OrgMessagesPage />
          </ProtectedRoute>
        } />
        <Route path="volunteer/:id" element={<ProtectedRoute requireOrg><VolunteerProfileView /></ProtectedRoute>} />
        <Route path="org/opportunity/:id" element={<ProtectedRoute requireOrg><OpportunityDetailPage /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
  )
}
