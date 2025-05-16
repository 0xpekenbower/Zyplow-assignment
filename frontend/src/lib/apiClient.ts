const GITHUB_API_URL = "https://api.github.com";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
import { PROFILE_QUERY, DataResponse } from "@/types"



/**
 * Fetch Data From GitHub API
 * @param endpoint : GitHub API Endpoint
 * @returns : Data From GitHub API
 * TODO: Optimize This Function (Throttling, Rate Limiting, etc)
 * @ref : https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
 */
export async function fetchFromGitHub<T>(endpoint: string): Promise<T> {
  const url = `${GITHUB_API_URL}${endpoint}`;
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not set");
  }
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Authorization': `Bearer ${GITHUB_TOKEN}`
  };
	const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
	console.log(response);
  return response.json() as Promise<T>;
}

/**
 * Fetch Data From GitHub GraphQL API
 * @param query : GitHub GraphQL Query
 * @returns : Data From GitHub GraphQL API
 */
export async function fetchFromGitHubGraphQL(username: string): Promise<DataResponse> {
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
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	
	const data = await response.json();
	
	if (data.errors) {
		throw new Error(`GraphQL error: ${data.errors[0].message}`);
	}
	
	return {
		user: data.data.user,
		organizations: data.data.user.organizations?.nodes || [],
		repositories: data.data.user.repositories?.nodes || [],
		repositoriesContributedTo: data.data.user.repositoriesContributedTo?.nodes || []
	};
}