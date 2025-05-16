// Main cache implementation
// For Redis operations, i use server actions

import { 
  cacheDataInRedis, 
  getCachedDataFromRedis, 
  removeCachedDataFromRedis 
} from './actions/redis-actions';
import { isRedisEnabled } from './actions/redis-env-actions';

export type CacheStrategy = "redis" | "none";

export interface CacheOptions {
  cacheStrategy?: CacheStrategy;
  cacheTime?: number;
  revalidate?: boolean;
}

// Common cache key prefixes
export const CACHE_KEYS = {
  LEADERBOARD: "leaderboard:",
  USER_PROFILE: "user:"
};

// Default cache times
export const CACHE_TIMES = {
  LEADERBOARD: 43200, // 12 hours in seconds
  USER_PROFILE: 86400  // 24 hours in seconds
};

// Default cache options
const defaultOptions: CacheOptions = {
  cacheStrategy: 'redis', // Always use Redis by default
  cacheTime: 300, // 5 minutes
  revalidate: false
};

// Check if code is running on server or client
const isServer = typeof window === 'undefined';

// Cache strategy implementations removed as they were unused

/**
 * Cache data based on specified strategy
 */
export async function cacheData<T>(
  key: string, 
  data: T, 
  options: Partial<CacheOptions> = {}
): Promise<void> {
  const opts = { ...defaultOptions, ...options };
  
  switch (opts.cacheStrategy) {
    case 'redis':
      if (isServer) {
        const redisEnabled = await isRedisEnabled();
        if (!redisEnabled) {
          console.log('Redis is disabled, falling back to no cache');
          break;
        }        
        await cacheDataInRedis(key, data, opts.cacheTime);
      }
      break;
      
    case 'none':
    default:
      break;
  }
}

/**
 * Get cached data based on specified strategy
 */
export async function getCachedData<T>(
  key: string, 
  options: Partial<CacheOptions> = {}
): Promise<T | null> {
  const opts = { ...defaultOptions, ...options };
  
  switch (opts.cacheStrategy) {
    case 'redis':
      if (isServer) {
        const redisEnabled = await isRedisEnabled();
        if (!redisEnabled) {
          console.log('Redis is disabled, falling back to no cache');
          return null;
        }        
        return await getCachedDataFromRedis<T>(key);
      }
      break;
      
    case 'none':
    default:
      break;
  }
  
  return null;
}

/**
 * Remove cached data
 */
export async function removeCachedData(
  key: string, 
  options: Partial<CacheOptions> = {}
): Promise<void> {
  const opts = { ...defaultOptions, ...options };
  
  switch (opts.cacheStrategy) {
    case 'redis':
      if (isServer) {
        // Check if Redis is enabled
        const redisEnabled = await isRedisEnabled();
        if (!redisEnabled) {
          console.log('Redis is disabled, falling back to no cache');
          break;
        }
        
        // Use server action for Redis operations
        await removeCachedDataFromRedis(key);
      }
      break;
      
    case 'none':
    default:
      break;
  }
}

/**
 * Close Redis client connection
 */
export async function closeRedisConnection(): Promise<void> {
  if (isServer) {
    // If Container is not running, do nothing
    // TODO: ADD HEALTH CHECK IN DOCKER COMPOSE (USELESS NOW)
    const redisEnabled = await isRedisEnabled();
    if (!redisEnabled) {
      return;
    }
    
    try {
      const { closeRedisConnection: closeServerRedisConnection } = await import('./redis-client');
      await closeServerRedisConnection();
    } catch (error) {
      console.error('Failed to close Redis connection:', error);
    }
  }
} 