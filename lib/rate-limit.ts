const MAX_KEYS = 10_000
const SWEEP_INTERVAL_MS = 60_000

interface Entry {
  hits: number[]
  expiresAt: number
}

const store = new Map<string, Entry>()
let lastSweep = 0

function sweep(now: number) {
  for (const [key, entry] of store) {
    if (entry.expiresAt <= now) store.delete(key)
  }
  lastSweep = now
}

// In-memory, so it resets on restart and is per-instance on serverless hosts.
export function allowRequest(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  if (now - lastSweep >= SWEEP_INTERVAL_MS) sweep(now)

  const hits = (store.get(key)?.hits || []).filter((time) => now - time < windowMs)
  const allowed = hits.length < limit
  if (allowed) hits.push(now)

  // Re-inserting keeps the Map ordered from least to most recently used.
  store.delete(key)
  if (store.size >= MAX_KEYS) sweep(now)
  if (store.size >= MAX_KEYS) {
    const oldest = store.keys().next().value
    if (oldest !== undefined) store.delete(oldest)
  }
  store.set(key, { hits, expiresAt: (hits[hits.length - 1] ?? now) + windowMs })

  return allowed
}

export function rateLimitStoreSize() {
  return store.size
}

const processHits = new Map<string, number[]>()

// Process-wide counters live outside the store above, so key churn can't evict them.
// Only recorded while there is room, so each list stays at or under its limit.
export function allowProcessRequest(name: string, limit: number, windowMs: number) {
  const now = Date.now()
  const hits = (processHits.get(name) || []).filter((time) => now - time < windowMs)
  const allowed = hits.length < limit
  if (allowed) hits.push(now)
  processHits.set(name, hits)
  return allowed
}
