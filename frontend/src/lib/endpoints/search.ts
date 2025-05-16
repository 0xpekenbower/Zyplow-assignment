import { fetchFromGitHub } from "../apiClient";

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
}

/**
 * Search for GitHub users
 * @param request Search parameters
 * @returns Search results from GitHub API
 */
export async function searchUsers(request: SearchRequest): Promise<SearchResult> {
  const { query, per_page = 10, page = 1 } = request;
  
  if (!query) {
    throw new Error("Search query is required");
  }
  
  const endpoint = `/search/users?q=${encodeURIComponent(query)}&per_page=${per_page}&page=${page}`;
  return fetchFromGitHub<SearchResult>(endpoint);
} 