import { collection, doc, getDoc, getDocs, addDoc, updateDoc, query, where, orderBy } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'
import { PLACEHOLDER_TASKS } from '../data/placeholders'

export async function fetchTasks(filters = {}) {
  if (!isFirebaseConfigured) {
    let list = [...PLACEHOLDER_TASKS]
    if (filters.category) list = list.filter(t => t.category === filters.category)
    if (filters.organizationId) list = list.filter(t => t.organizationId === filters.organizationId)
    return list
  }
  let q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'))
  if (filters.organizationId) q = query(q, where('organizationId', '==', filters.organizationId))
  if (filters.category) q = query(q, where('category', '==', filters.category))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createTask(data) {
  if (!isFirebaseConfigured) {
    return { id: 'new-' + Date.now(), ...data, createdAt: new Date() }
  }
  const ref = await addDoc(collection(db, 'tasks'), {
    ...data,
    assigned_users: data.assigned_users || [],
    status: 'open',
    createdAt: new Date(),
  })
  return { id: ref.id, ...data, assigned_users: [], status: 'open', createdAt: new Date() }
}

export async function claimTask(taskId, userId) {
  if (!isFirebaseConfigured) {
    const t = PLACEHOLDER_TASKS.find(x => x.id === taskId)
    if (t) t.assigned_users = [...(t.assigned_users || []), userId]
    return
  }
  const ref = doc(db, 'tasks', taskId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  const assigned = [...(snap.data().assigned_users || []), userId]
  await updateDoc(ref, { assigned_users: assigned })
}

export async function completeTask(taskId, userId) {
  if (!isFirebaseConfigured) return
  const ref = doc(db, 'tasks', taskId)
  await updateDoc(ref, { status: 'completed' })
  // In real app: update user's completed_tasks and volunteer_hours in Firestore
}
