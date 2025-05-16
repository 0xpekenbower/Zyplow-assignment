
/** ----------------------------------- **/

/**
 * Leaderboard User Type (From GitHub API)
 * Each User Has This Data
 * @id : Unique ID From Response (i will use it as identifier to avoid use username case insensitive)
 * @login : Username
 * @avatar_url : User Avatar
 * @html_url : User Profile URL
 * @rank : User Rank (current rank in leaderboard)
 */
export interface LeaderboardUser {
	id: number
	login: string
	avatar_url: string
	html_url: string
	rank: number
}
/**
 * Leaderboard Type (From GitHub API)
 * @total_count : Total Count Of Users (100 per page, github rules)
 * @items : List Of Users
 * @location : Location Of Users
 * @sort : Sorting Type (followers or repositories or joined)
 * @source : Source Of Data (github or redis)
 * @doc : https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-users
 */
export interface Leaderboard {
	total_count: number
	items: LeaderboardUser[]
	location: string
	sort: string
	source: string
}

/**
 * Leaderboard Request Type
 * @location : Location Of Users
 * @sort : Sorting Type (followers or repositories or joined)
 * @per_page : Number Of Users Per Page
 * @page : Page Number
 */
export interface LeaderboardRequest {
	location?: string
	sort?: string
	per_page?: number
	page?: number
}
