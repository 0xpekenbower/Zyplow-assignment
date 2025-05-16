'use server'

import { 
  getRedisConfig as getConfig,
  setRedisUrl as setUrl,
  isRedisEnabled as isEnabled,
  toggleRedisEnabled as toggleEnabled,
  setRedisConnectionStatus as setConnectionStatus,
  resetRedisConfig as resetConfig
} from '../redis-config';

// Use the type from redis-config.ts
import type { RedisConfig } from '../redis-config';

// Re-export the functions with async wrappers for server actions
export async function getRedisConfig(): Promise<RedisConfig> {
  return getConfig();
}

export async function setRedisUrl(url: string): Promise<boolean> {
  return setUrl(url);
}

export async function isRedisEnabled(): Promise<boolean> {
  return isEnabled();
}

export async function toggleRedisEnabled(enabled: boolean): Promise<boolean> {
  return toggleEnabled(enabled);
}

export async function setRedisConnectionStatus(status: boolean): Promise<void> {
  setConnectionStatus(status);
}

export async function resetRedisConfig(): Promise<boolean> {
  return resetConfig();
} 