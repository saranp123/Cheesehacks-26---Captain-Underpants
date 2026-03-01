import { useParams } from 'react-router-dom'
import OrganizationProfilePage from '../organization/OrganizationProfilePage'

/**
 * UserOrganizationProfilePage
 * 
 * Wrapper component that allows users to view organization profiles
 * by routing to the same OrganizationProfilePage component used by organizations themselves.
 * 
 * Maps user-side route /user/organization-profile/:orgId
 * to the shared OrganizationProfilePage component
 */
export default function UserOrganizationProfilePage() {
  const { orgId } = useParams()
  
  // Pass orgId to shared OrganizationProfilePage component
  return <OrganizationProfilePage orgId={orgId} />
}
