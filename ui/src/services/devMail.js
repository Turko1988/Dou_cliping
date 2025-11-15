const BASE = '/smtp/api'

async function handle(res) {
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || `HTTP ${res.status}`)
  }
  return res.json()
}

export async function listMessages() {
  const res = await fetch(`${BASE}/messages`)
  return handle(res)
}

export async function getMessage(id) {
  const res = await fetch(`${BASE}/messages/${id}`)
  return handle(res)
}

export function attachmentUrl(id, partIndex) {
  return `${BASE}/messages/${id}/part/${partIndex}/content`
}

export default { listMessages, getMessage, attachmentUrl }