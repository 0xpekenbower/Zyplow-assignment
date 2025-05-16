import {UserProfile, RepoSummary } from "@/types"
import { fetchFromGitHubGraphQL } from "../apiClient"
import { extractProfileAndRepos } from "../utils";

export interface ProfileResponse {
    profile: UserProfile;
    repos: RepoSummary[];
}

export async function getUserProfile(username: string): Promise<ProfileResponse> {
    try {
        const data = await fetchFromGitHubGraphQL(username);
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