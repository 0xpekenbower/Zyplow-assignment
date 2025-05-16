'use server'

import { getRedisClient } from '../redis-client';
import { CACHE_TIMES } from '../cache';
import { Leaderboard } from '@/types';
import { ProfileResponse } from '../endpoints/UserProfile';

/**
 * Cache data in Redis
 */
export async function cacheDataInRedis<T>(key: string, data: T, expireTime?: number): Promise<boolean> {
  console.log(`Attempting to cache data in Redis with key: ${key}`);
  try {
    const redis = await getRedisClient();
    if (!redis) {
      console.error('Redis client not available');
      return false;
    }
    
    console.log(`Redis client obtained, saving data with key: ${key}`);
    const serializedData = JSON.stringify(data);
    console.log(`Data serialized, length: ${serializedData.length} characters`);
    
    await redis.set(key, serializedData);
    console.log(`Data successfully saved to Redis with key: ${key}`);
    
    if (expireTime) {
      await redis.expire(key, expireTime);
      console.log(`Expiration set for key: ${key}, TTL: ${expireTime} seconds`);
    }
    
    // Verify the data was saved
    const exists = await redis.exists(key);
    console.log(`Verification - Key ${key} exists in Redis: ${exists}`);
    
    return true;
  } catch (error) {
    console.error(`Redis caching error for key ${key}:`, error);
    return false;
  }
}

/**
 * Get cached data from Redis
 */
export async function getCachedDataFromRedis<T>(key: string): Promise<T | null> {
  console.log(`Attempting to retrieve data from Redis with key: ${key}`);
  try {
    const redis = await getRedisClient();
    if (!redis) {
      console.error('Redis client not available');
      return null;
    }
    
    console.log(`Redis client obtained, checking if key exists: ${key}`);
    const exists = await redis.exists(key);
    console.log(`Key ${key} exists in Redis: ${exists}`);
    
    const data = await redis.get(key);
    
    if (data) {
      console.log(`Data found in Redis for key: ${key}, length: ${data.length} characters`);
      const parsed = JSON.parse(data) as T;
      console.log(`Data successfully parsed from Redis for key: ${key}`);
      return parsed;
    }
    
    console.log(`No data found in Redis for key: ${key}`);
    return null;
  } catch (error) {
    console.error(`Redis retrieval error for key ${key}:`, error);
    return null;
  }
}

/**
 * Remove cached data from Redis
 */
export async function removeCachedDataFromRedis(key: string): Promise<boolean> {
  try {
    const redis = await getRedisClient();
    if (!redis) {
      console.error('Redis client not available');
      return false;
    }
    
    await redis.del(key);
    return true;
  } catch (error) {
    console.error('Redis removal error:', error);
    return false;
  }
}

/**
 * Get all keys matching a pattern
 */
export async function getKeysByPattern(pattern: string): Promise<string[]> {
  try {
    const redis = await getRedisClient();
    if (!redis) {
      console.error('Redis client not available');
      return [];
    }
    
    return await redis.keys(pattern);
  } catch (error) {
    console.error('Redis keys pattern error:', error);
    return [];
  }
}

/**
 * Flush all data from Redis
 */
export async function flushRedisData(): Promise<boolean> {
  try {
    const redis = await getRedisClient();
    if (!redis) {
      console.error('Redis client not available');
      return false;
    }
    
    await redis.flushAll();
    return true;
  } catch (error) {
    console.error('Redis flush error:', error);
    return false;
  }
}

/**
 * Cache leaderboard data with the appropriate TTL (12 hours)
 */
export async function cacheLeaderboardData(key: string, data: Leaderboard): Promise<boolean> {
  return cacheDataInRedis(key, data, CACHE_TIMES.LEADERBOARD);
}

/**
 * Cache user profile data with the appropriate TTL (24 hours)
 */
export async function cacheUserProfileData(key: string, data: ProfileResponse): Promise<boolean> {
  return cacheDataInRedis(key, data, CACHE_TIMES.USER_PROFILE);
} 