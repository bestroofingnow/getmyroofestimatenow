// Simple in-memory rate limiter
// For production with multiple instances, use Redis

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean every minute

export interface RateLimitConfig {
  maxRequests: number; // Maximum requests allowed
  windowMs: number; // Time window in milliseconds
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = identifier;

  let entry = rateLimitStore.get(key);

  // If no entry or window has expired, create new entry
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;

  // Check if over limit
  if (entry.count > config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

// Get client IP from request headers
export function getClientIP(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

// Rate limit configurations for different endpoints
export const RATE_LIMITS = {
  // Address autocomplete - more lenient (user typing)
  autocomplete: { maxRequests: 30, windowMs: 60000 }, // 30 req/min

  // Roof data - moderate (one per address)
  roofData: { maxRequests: 10, windowMs: 60000 }, // 10 req/min

  // Lead submission - strict (prevent spam)
  submitLead: { maxRequests: 5, windowMs: 60000 }, // 5 req/min

  // Geocode - moderate
  geocode: { maxRequests: 20, windowMs: 60000 }, // 20 req/min

  // Static map proxy - moderate
  staticMap: { maxRequests: 20, windowMs: 60000 }, // 20 req/min
};
