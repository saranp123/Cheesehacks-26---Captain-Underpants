import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '../firebase/config'
import { getPlaceholderUser, getPlaceholderOrg } from '../data/placeholders'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser && isFirebaseConfigured) {
        const profileSnap = await getDoc(doc(db, 'users', firebaseUser.uid))
        const orgSnap = await getDoc(doc(db, 'organizations', firebaseUser.uid))
        if (profileSnap.exists()) setProfile({ id: profileSnap.id, ...profileSnap.data() })
        else if (orgSnap.exists()) setProfile({ id: orgSnap.id, type: 'organization', ...orgSnap.data() })
        else setProfile(null)
      } else if (firebaseUser && !isFirebaseConfigured) {
        setProfile(getPlaceholderUser(firebaseUser.uid))
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const login = async (email, password, isOrg = false) => {
    if (!isFirebaseConfigured) {
      const uid = isOrg ? 'demo-org' : 'demo-user'
      setUser({ uid, email })
      setProfile(isOrg ? getPlaceholderOrg(uid) : getPlaceholderUser(uid))
      setLoading(false)
      return
    }
    const cred = await signInWithEmailAndPassword(auth, email, password)
    const profileSnap = await getDoc(doc(db, isOrg ? 'organizations' : 'users', cred.user.uid))
    if (profileSnap.exists()) setProfile({ id: profileSnap.id, ...profileSnap.data() })
    return cred
  }

  const signup = async (email, password, displayName, isOrg = false) => {
    if (!isFirebaseConfigured) {
      const uid = isOrg ? 'demo-org' : 'demo-user'
      setUser({ uid, email })
      setProfile(isOrg ? getPlaceholderOrg(uid) : getPlaceholderUser(uid))
      setLoading(false)
      return
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    const payload = isOrg
      ? { name: displayName, logo: '', posted_tasks: [], volunteers: [] }
      : { name: displayName, email, skills: [], completed_tasks: [], badges: [], volunteer_hours: 0 }
    await setDoc(doc(db, isOrg ? 'organizations' : 'users', cred.user.uid), payload)
    setProfile({ id: cred.user.uid, type: isOrg ? 'organization' : 'person', ...payload })
    return cred
  }

  const logout = async () => {
    if (isFirebaseConfigured) await signOut(auth)
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, signup, logout, isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
