import { fetchFromGitHub } from "../apiClient";
import { CacheStrategy } from "../cache";

export interface SearchResult {
  total_count: number;
  items: SearchUser[];
}

export interface SearchUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface SearchRequest {
  query: string;
  per_page?: number;
  page?: number;
  cacheStrategy?: CacheStrategy;
  cacheTime?: number;
  revalidate?: boolean;
}

/**
 * Search for GitHub users with caching support
 * @param request Search parameters including caching options
 * @returns Search results from GitHub API
 */
export async function searchUsers(request: SearchRequest): Promise<SearchResult> {
  const { 
    query, 
    per_page = 10, 
    page = 1,
    cacheStrategy = 'none',
    cacheTime,
    revalidate 
  } = request;
  
  if (!query) {
    throw new Error("Search query is required");
  }
  
  const endpoint = `/search/users?q=${encodeURIComponent(query)}&per_page=${per_page}&page=${page}`;
  return fetchFromGitHub<SearchResult>(endpoint, {
    cacheStrategy,
    cacheTime,
    revalidate
  });
} 