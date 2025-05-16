import { PROFILE_QUERY, DataResponse } from "@/types"
import { CacheStrategy, cacheData, getCachedData } from "./cache";
import { useMetricsStore } from "./store/metrics";
const GITHUB_API_URL = "https://api.github.com";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

interface FetchOptions {
  cacheStrategy?: CacheStrategy;
  cacheTime?: number; // in seconds
  revalidate?: boolean;
}

// Default options for caching
const defaultOptions: FetchOptions = {
  cacheStrategy: 'none',
  cacheTime: 3600, // 1 hour
  revalidate: false,
};

/**
 * Fetch Data From GitHub API with caching support
 * @param endpoint : GitHub API Endpoint
 * @param options : Caching options
 * @returns : Data From GitHub API
 */
export async function fetchFromGitHub<T>(
  endpoint: string, 
  options: FetchOptions = {}
): Promise<T> {
  const opts = { ...defaultOptions, ...options };
  const url = `${GITHUB_API_URL}${endpoint}`;
  const cacheKey = `github_rest_${endpoint}`;
  
  // Try to get data from cache if not revalidating
  if (!opts.revalidate && opts.cacheStrategy !== 'none') {
    const cachedData = await getCachedData<T>(cacheKey, {
      cacheStrategy: opts.cacheStrategy,
    });
    
    if (cachedData) {
      return cachedData;
    }
  }
  
  // If no cached data or revalidating, fetch from API
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not set");
  }
  
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Authorization': `Bearer ${GITHUB_TOKEN}`
  };
  
  const response = await fetch(url, { headers });
  useMetricsStore.getState().incrementApiRequests();
  trackRateLimits(response);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json() as T;
  if (opts.cacheStrategy !== 'none') {
    await cacheData(cacheKey, data, {
      cacheStrategy: opts.cacheStrategy,
      cacheTime: opts.cacheTime,
    });
  }
  
  return data;
}

/**
 * Fetch Data From GitHub GraphQL API with caching support
 * @param username : GitHub username
 * @param options : Caching options
 * @returns : Data From GitHub GraphQL API
 */
export async function fetchFromGitHubGraphQL(
  username: string,
  options: FetchOptions = {}
): Promise<DataResponse> {
  const opts = { ...defaultOptions, ...options };
  const cacheKey = `github_graphql_${username}`;
  
  // Try to get data from cache if not revalidating
  if (!opts.revalidate && opts.cacheStrategy !== 'none') {
    const cachedData = await getCachedData<DataResponse>(cacheKey, {
      cacheStrategy: opts.cacheStrategy,
    });
    
    if (cachedData) {
      return cachedData;
    }
  }
  
  // If no cached data or revalidating, fetch from API
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${GITHUB_TOKEN}`
  }
  
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: PROFILE_QUERY, variables: { login: username } })
  });
  
  useMetricsStore.getState().incrementApiRequests();
  trackRateLimits(response);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`GraphQL error: ${data.errors[0].message}`);
  }
  
  const result = {
    user: data.data.user,
    organizations: data.data.user.organizations?.nodes || [],
    repositories: data.data.user.repositories?.nodes || [],
    repositoriesContributedTo: data.data.user.repositoriesContributedTo?.nodes || []
  };
  
  if (opts.cacheStrategy !== 'none') {
    await cacheData(cacheKey, result, {
      cacheStrategy: opts.cacheStrategy,
      cacheTime: opts.cacheTime,
    });
  }
  
  return result;
}

/**
 * Extract and track rate limit information from GitHub API response headers
 * @param response - The fetch response object
 */
function trackRateLimits(response: Response) {
  const limit = parseInt(response.headers.get('x-ratelimit-limit') || '0');
  const remaining = parseInt(response.headers.get('x-ratelimit-remaining') || '0');
  const reset = parseInt(response.headers.get('x-ratelimit-reset') || '0');
  const used = parseInt(response.headers.get('x-ratelimit-used') || '0');
  
  if (limit && remaining && reset) {
    useMetricsStore.getState().updateRateLimit(limit, remaining, reset, used);
  }
}