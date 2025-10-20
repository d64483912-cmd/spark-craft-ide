interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 }) {
    this.config = config;
  }

  check(key: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.limits.get(key);

    // Clean up expired entries
    if (entry && now > entry.resetTime) {
      this.limits.delete(key);
    }

    // Get or create entry
    const currentEntry = this.limits.get(key) || {
      count: 0,
      resetTime: now + this.config.windowMs,
    };

    // Check limit
    if (currentEntry.count >= this.config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: currentEntry.resetTime,
      };
    }

    // Increment counter
    currentEntry.count++;
    this.limits.set(key, currentEntry);

    return {
      allowed: true,
      remaining: this.config.maxRequests - currentEntry.count,
      resetTime: currentEntry.resetTime,
    };
  }

  reset(key: string): void {
    this.limits.delete(key);
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }
}

// Rate limiters for different operations
export const aiRequestLimiter = new RateLimiter({
  maxRequests: 20, // 20 AI requests
  windowMs: 60000, // per minute
});

export const fileOperationLimiter = new RateLimiter({
  maxRequests: 100, // 100 file operations
  windowMs: 60000, // per minute
});

export const collaborationLimiter = new RateLimiter({
  maxRequests: 60, // 60 collaboration messages
  windowMs: 60000, // per minute
});

// Cleanup expired entries every minute
setInterval(() => {
  aiRequestLimiter.cleanup();
  fileOperationLimiter.cleanup();
  collaborationLimiter.cleanup();
}, 60000);

export { RateLimiter };
