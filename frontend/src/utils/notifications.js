// In-app notifications: could be replaced with Firestore listeners for real-time updates
const listeners = new Set()
let items = []

export function getNotifications() {
  return [...items]
}

export function addNotification(notification) {
  items = [{ id: Date.now(), ...notification }, ...items].slice(0, 50)
  listeners.forEach(fn => fn(getNotifications()))
}

export function subscribeToNotifications(callback) {
  listeners.add(callback)
  callback(getNotifications())
  return () => listeners.delete(callback)
}

export function clearNotification(id) {
  items = items.filter(n => n.id !== id)
  listeners.forEach(fn => fn(getNotifications()))
}
