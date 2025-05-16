import { create } from 'zustand';

const isDevelopment = process.env.NODE_ENV === 'development';

interface MetricsState {
  isDevelopment: boolean;
  apiRequests: number;
  rateLimit: {
    limit: number;
    remaining: number;
    reset: number; // Unix timestamp
    used: number;
  };
  redisSize: number;
  incrementApiRequests: () => void;
  updateRateLimit: (limit: number, remaining: number, reset: number, used: number) => void;
  updateRedisSize: (size: number) => void;
}

export const useMetricsStore = create<MetricsState>((set) => ({
  // Initial state
  isDevelopment,
  apiRequests: 0,
  rateLimit: {
    limit: 0,
    remaining: 0,
    reset: 0,
    used: 0
  },
  redisSize: 0,
  
  incrementApiRequests: () => {
    if (!isDevelopment) return;
    
    set((state: MetricsState) => ({ 
      apiRequests: state.apiRequests + 1 
    }));
  },
  
  updateRateLimit: (limit: number, remaining: number, reset: number, used: number) => {
    if (!isDevelopment) return;
    
    set(() => ({ 
      rateLimit: { limit, remaining, reset, used } 
    }));
  },
  
  updateRedisSize: (size: number) => {
    if (!isDevelopment) return;
    
    set(() => ({ 
      redisSize: size 
    }));
  },
}));
