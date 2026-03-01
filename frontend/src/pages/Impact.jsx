import { useAuth } from '../context/AuthContext'
import OrgImpactPage from '../organization/OrgImpactPage'
import PersonImpactPage from '../user/PersonImpactPage'

export default function Impact() {
  const { profile } = useAuth()
  const isOrg = profile?.type === 'organization'
  return isOrg ? <OrgImpactPage /> : <PersonImpactPage />
}
