'use client';

import { CACHE_KEYS } from '../lib/cache';
import { 
  getCachedDataFromRedis,
  cacheLeaderboardData,
  cacheUserProfileData,
  removeCachedDataFromRedis
} from '../lib/actions/redis-actions';
import { Leaderboard } from '@/types';
import { ProfileResponse } from '../lib/endpoints/UserProfile';

/**
 * Hook for managing Redis cache operations
 * This is used on the client side to interact with Redis via server actions
 */
export function useRedisCache() {
  /**
   * Generate a cache key for the leaderboard based on parameters
   */
  const getLeaderboardCacheKey = (location: string, sort: string, per_page: number, page: number) => {
    return `${CACHE_KEYS.LEADERBOARD}${location}:${sort}:${per_page}:${page}`;
  };

  /**
   * Generate a cache key for a user profile
   */
  const getUserProfileCacheKey = (username: string) => {
    return `${CACHE_KEYS.USER_PROFILE}${username}`;
  };

  /**
   * Get cached leaderboard data or null if not cached
   */
  const getCachedLeaderboard = async (location: string, sort: string, per_page: number, page: number) => {
    const cacheKey = getLeaderboardCacheKey(location, sort, per_page, page);
    return getCachedDataFromRedis<Leaderboard>(cacheKey);
  };

  /**
   * Cache leaderboard data with 12 hour TTL
   */
  const cacheLeaderboard = async (location: string, sort: string, per_page: number, page: number, data: Leaderboard) => {
    const cacheKey = getLeaderboardCacheKey(location, sort, per_page, page);
    return cacheLeaderboardData(cacheKey, data);
  };

  /**
   * Get cached user profile data or null if not cached
   */
  const getCachedUserProfile = async (username: string) => {
    const cacheKey = getUserProfileCacheKey(username);
    return getCachedDataFromRedis<ProfileResponse>(cacheKey);
  };

  /**
   * Cache user profile data with 24 hour TTL
   */
  const cacheUserProfile = async (username: string, data: ProfileResponse) => {
    const cacheKey = getUserProfileCacheKey(username);
    return cacheUserProfileData(cacheKey, data);
  };

  /**
   * Clear cached leaderboard data
   */
  const clearCachedLeaderboard = async (location: string, sort: string, per_page: number, page: number) => {
    const cacheKey = getLeaderboardCacheKey(location, sort, per_page, page);
    return removeCachedDataFromRedis(cacheKey);
  };

  /**
   * Clear cached user profile data
   */
  const clearCachedUserProfile = async (username: string) => {
    const cacheKey = getUserProfileCacheKey(username);
    return removeCachedDataFromRedis(cacheKey);
  };

  return {
    getLeaderboardCacheKey,
    getUserProfileCacheKey,
    getCachedLeaderboard,
    cacheLeaderboard,
    getCachedUserProfile,
    cacheUserProfile,
    clearCachedLeaderboard,
    clearCachedUserProfile
  };
} 