/**
 * Tiny in-memory limiter: at most `max` submissions per `windowMs` per client.
 * It is per server process, which is fine for one instance. If the site is
 * ever scaled to several instances, move this to a shared store (e.g. Redis).
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, max = 5, windowMs = 10 * 60 * 1000, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  // Keep memory bounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return false;
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export function resetRateLimits() {
  hits.clear();
}
