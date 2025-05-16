import { Leaderboard, LeaderboardUser, LeaderboardRequest } from "@/types"
import { fetchFromGitHub } from "../apiClient"

/**
 * Get the leaderboard from the GitHub API
 * @param req - The request object containing location, sort, (per_page, and page) Hardcoded for now
 * @returns The leaderboard object Type (Leaderboard) 
 */
export async function getLeaderboard(req: LeaderboardRequest): Promise<Leaderboard> {
    const endpoint = `/search/users?q=location:${req.location}&sort=${req.sort}&per_page=${req.per_page}&page=${req.page}`;
    
    try {
        const data = await fetchFromGitHub<Leaderboard>(endpoint);
        const leaderboardUsers: LeaderboardUser[] = data?.items?.map((user: LeaderboardUser, index: number) => ({
            id: user.id,
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            rank: index + 1
        })) || [];
        return {
            total_count: data?.total_count || 0,
            items: leaderboardUsers,
            location: req.location || "Unknown",
            sort: req.sort || "Unknown",
            source: "github" // Adding the required 'source' property Thinking About Redis Cache and Local Storage 
        };
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        throw error;
    }
}