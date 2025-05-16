'use server'

import { createClient } from 'redis';
import { getRedisConfig, setRedisConnectionStatus, isRedisEnabled } from './redis-config';
import { useMetricsStore } from './store/metrics';

// AM forcing the client to be null to prevent circular dependencies
let redisClient: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
  // First check if Redis is enabled
  const enabled = await isRedisEnabled();
  if (!enabled) {
    console.log('Redis is disabled by configuration');
    return null;
  }

  if (!redisClient) {
    try {
      // Get Redis configuration from our server state
      const config = await getRedisConfig();
      const redisUrl = config.url;
      
      console.log(`Connecting to Redis at ${redisUrl}...`);
      
      redisClient = createClient({
        url: redisUrl
      });
      
      redisClient.on('error', async (err) => {
        console.error('Redis Client Error:', err);
        await setRedisConnectionStatus(false);
      });
      
      redisClient.on('connect', async () => {
        console.log('Redis client connected');
        await setRedisConnectionStatus(true);
      });
      
      redisClient.on('end', async () => {
        console.log('Redis connection closed');
        await setRedisConnectionStatus(false);
      });
      
      await redisClient.connect();
      console.log(`Redis connected to ${redisUrl}`);
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      await setRedisConnectionStatus(false);
      return null;
    }
  }
  
  return redisClient;
}

export async function closeRedisConnection() {
  if (redisClient) {
    try {
      await redisClient.quit();
      redisClient = null;
      console.log('Redis connection closed');
      await setRedisConnectionStatus(false);
    } catch (error) {
      console.error('Error closing Redis connection:', error);
    }
  }
}

/**
 * Get Redis memory usage information
 * @returns Memory usage in bytes or null if Redis is not available
 */
export async function getRedisMemoryInfo(): Promise<number | null> {
  try {
    const client = await getRedisClient();
    if (!client) return null;
    
    // Get memory info using the INFO command
    const info = await client.info('memory');
    const usedMemoryMatch = info.match(/used_memory:(\d+)/);
    
    if (usedMemoryMatch && usedMemoryMatch[1]) {
      const memoryUsage = parseInt(usedMemoryMatch[1]);
      
      // Update the metrics store with Redis size
      useMetricsStore.getState().updateRedisSize(memoryUsage);
      
      return memoryUsage;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting Redis memory info:', error);
    return null;
  }
} 