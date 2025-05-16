import {UserProfile, RepoSummary } from "@/types"
import { fetchFromGitHubGraphQL } from "../apiClient"
import { extractProfileAndRepos } from "../utils";
import { CacheStrategy } from "../cache";

export interface ProfileResponse {
    profile: UserProfile;
    repos: RepoSummary[];
}

interface GetUserProfileOptions {
    cacheStrategy?: CacheStrategy;
    cacheTime?: number;
    revalidate?: boolean;
}

export async function getUserProfile(
    username: string,
    options: GetUserProfileOptions = {}
): Promise<ProfileResponse> {
    try {
        // Use the caching options when fetching data
        const data = await fetchFromGitHubGraphQL(username, {
            cacheStrategy: options.cacheStrategy,
            cacheTime: options.cacheTime,
            revalidate: options.revalidate
        });
        
        if (!data) {
            throw new Error("No data returned from GitHub GraphQL API");
        }
        
        const result = extractProfileAndRepos(data);
        return result;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}