import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DataResponse, RepoSummary, UserProfile } from "@/types"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const VALID_LOCATIONS = ["Morocco", "France", "USA", "Spain", "Italy", "Germany", "Brazil", "Canada", "India", "China", "Japan"]
const VALID_SORTS = ["followers", "repositories"]
export function validateUserInput(per_page: number, page: number, location: string, sort: string) {
    if (per_page == 0 || per_page > 100)
        throw new Error("Invalid per_page value (max 100) (min 1)")
    if (page == 0 || page > 10)
        throw new Error("Invalid page value (max 10) (min 1)")
    if (!VALID_LOCATIONS.includes(location))
        throw new Error("Invalid location value (morocco or france are the only valid locations for this demo)")
    if (!VALID_SORTS.includes(sort))
        throw new Error("Invalid sort value (followers or repositories)")
}

/**
 * Extracts profile and repos from data Based on the DataResponse Type
 * @param data : DataResponse
 * @returns : { profile: UserProfile, repos: RepoSummary[] }
 */
export function extractProfileAndRepos(data: DataResponse): { profile: UserProfile, repos: RepoSummary[] } {
  const user = data.user; 
  const orgs = data.organizations || [];
  
  const profile = {
    login: user.login || '',
    name: user.name || '',
    url: user.url || '',
    avatarUrl: user.avatarUrl || '',
    bio: user.bio || '',
    company: user.company || '',
    location: user.location || '',
    email: user.email || '',
    websiteUrl: user.websiteUrl || '',
    twitterUsername: user.twitterUsername || '',
    pronouns: user.pronouns || '',
    createdAt: user.createdAt || '',
    updatedAt: user.updatedAt || '',
    followers: user.followers?.totalCount || 0,
    following: user.following?.totalCount || 0,
    organizations: orgs.map(org => ({
      login: org.login || '',
      name: org.name || '',
      avatarUrl: org.avatarUrl || '',
      url: org.url || '',
      description: org.description || '',
      websiteUrl: org.websiteUrl || ''
    }))
  };
  
  // Filter out null repositories before processing
  const owned = (data.repositories || []).filter(repo => repo !== null);
  const contributed = (data.repositoriesContributedTo || []).filter(repo => repo !== null);
  const allRepos = [...owned, ...contributed];
  
  let totalStars = 0;
  let totalForks = 0;
  const languageSizes: Record<string, number> = {};
  const licenseCounts: Record<string, number> = {};
  let totalLangSize = 0;
  const userLogin = user.login || '';
  
  const repoSummaries = allRepos.map(repo => {
    if (!repo) return null;
    
    const languages = repo.languages?.edges
      ? repo.languages.edges.map(edge => ({
          name: edge.node.name || '',
          size: edge.size || 0
        }))
      : [];
      
    return {
      name: repo.name || '',
      url: `https://github.com/${userLogin}/${repo.name || ''}`,
      stargazerCount: repo.stargazerCount || 0,
      forkCount: repo.forkCount || 0,
      licenseName: repo.licenseInfo?.name || '',
      languages
    };
  }).filter(Boolean) as RepoSummary[]; // Filter out any null values that might have been created (TODO: Optimize this)
  
  for (const repo of allRepos) {
    if (!repo) continue; // Skip null repositories
    
    totalStars += repo.stargazerCount || 0;
    totalForks += repo.forkCount || 0;
    
    if (repo.languages?.edges) {
      for (const edge of repo.languages.edges) {
        const langName = edge.node.name;
        languageSizes[langName] = (languageSizes[langName] || 0) + (edge.size || 0);
        totalLangSize += (edge.size || 0);
      }
    }
    
    if (repo.licenseInfo?.name) {
      licenseCounts[repo.licenseInfo.name] = (licenseCounts[repo.licenseInfo.name] || 0) + 1;
    } else {
      licenseCounts['None'] = (licenseCounts['None'] || 0) + 1;
    }
  }
  
  const languageBreakdown = Object.entries(languageSizes).map(([name, size]) => ({ name, size })).sort((a, b) => b.size - a.size);
  const licenseBreakdown = Object.entries(licenseCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  
  const profileWithOverview = {
    ...profile,
    overview: { 
      totalStars, 
      totalForks, 
      languageBreakdown, 
      licenseBreakdown, 
      totalLangSize 
    }
  } as UserProfile;
  
  return { profile: profileWithOverview, repos: repoSummaries };
}