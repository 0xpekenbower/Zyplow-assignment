const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

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