'use server'

// Redis configuration state manager
// This file centralizes Redis configuration to prevent circular dependencies

export interface RedisConfig {
  url: string;
  isConnected: boolean;
  isEnabled: boolean;
}

// Store Redis configuration in memory for this session
let redisConfig: RedisConfig = {
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  isConnected: false,
  // Use ENABLE_REDIS environment variable
  isEnabled: process.env.ENABLE_REDIS === 'true'
};

/**
 * Get Redis configuration
 */
export async function getRedisConfig(): Promise<RedisConfig> {
  return redisConfig;
}

/**
 * Set Redis URL
 */
export async function setRedisUrl(url: string): Promise<boolean> {
  try {
    // Validate URL format
    if (!url.startsWith('redis://')) {
      console.error('Invalid Redis URL format. Must start with redis://');
      return false;
    }
    
    // Update in-memory configuration
    redisConfig.url = url;
    
    // Update process.env for the current process
    process.env.REDIS_URL = url;
    
    return true;
  } catch (error) {
    console.error('Error setting Redis URL:', error);
    return false;
  }
}

/**
 * Check if Redis is enabled
 */
export async function isRedisEnabled(): Promise<boolean> {
  return redisConfig.isEnabled;
}

/**
 * Toggle Redis enabled status
 */
export async function toggleRedisEnabled(enabled: boolean): Promise<boolean> {
  try {
    redisConfig.isEnabled = enabled;
    process.env.ENABLE_REDIS = enabled ? 'true' : 'false';
    return true;
  } catch (error) {
    console.error('Error toggling Redis enabled status:', error);
    return false;
  }
}

/**
 * Update Redis connection status
 */
export async function setRedisConnectionStatus(status: boolean): Promise<void> {
  redisConfig.isConnected = status;
}

/**
 * Reset Redis configuration to default
 */
export async function resetRedisConfig(): Promise<boolean> {
  try {
    const defaultUrl = 'redis://localhost:6379';
    redisConfig = {
      url: defaultUrl,
      isConnected: false,
      isEnabled: process.env.ENABLE_REDIS === 'true'
    };
    process.env.REDIS_URL = defaultUrl;
    return true;
  } catch (error) {
    console.error('Error resetting Redis config:', error);
    return false;
  }
} 