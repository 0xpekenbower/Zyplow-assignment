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


/** ---------------User Page----------------- **/

export interface Organization {
	login: string
	name: string
	avatarUrl: string
	url: string
	description: string
	websiteUrl: string
}
  
  export interface LanguageStat {
	name: string
	size: number
}
  
  export interface LicenseStat {
	name: string
	count: number
}

export interface RepoSummary {
	name: string
	url: string
	stargazerCount: number
	forkCount: number
	licenseName: string
	languages: LanguageStat[]
}

export interface ProfileOverview {
	totalStars: number
	totalForks: number
	languageBreakdown: LanguageStat[]
	licenseBreakdown: LicenseStat[]
	totalLangSize: number
}
export interface UserProfile {
	login: string
	name: string
	url: string
	avatarUrl: string
	bio: string
	company: string
	location: string
	email: string
	websiteUrl: string
	twitterUsername: string
	pronouns: string
	createdAt: string
	updatedAt: string
	followers: number
	following: number
	organizations: Organization[]
	overview: ProfileOverview
}

/**
 * GraphQL Query For User Profile
 * @ref : https://docs.github.com/en/graphql/reference/objects#user
 */
export const PROFILE_QUERY = `
query($login: String!) {
  user(login: $login) {
    login
    name
    url
    avatarUrl
    bio
    company
    location
    email
    websiteUrl
    twitterUsername
    pronouns
    createdAt
    updatedAt
    followers { totalCount }
    following { totalCount }
    organizations(first: 100) {
      nodes {
        login
        name
        avatarUrl
        url
        description
        websiteUrl
      }
    }
    repositories(first: 100, isFork: false) {
      nodes {
        name
        stargazerCount
        forkCount
        licenseInfo { name }
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges { size node { name } }
        }
      }
    }
    repositoriesContributedTo(first: 100) {
      nodes {
        name
        stargazerCount
        forkCount
        licenseInfo { name }
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges { size node { name } }
        }
      }
    }
  }
}`;


export interface UserDetailsType {
	login: string
	name: string
	url: string
	avatarUrl: string
	bio: string | null
	company: string | null
	location: string | null
	email: string | null
	websiteUrl: string | null
	twitterUsername: string | null
	pronouns: string | null
	createdAt: string
	updatedAt: string
	followers: { totalCount: number }
	following: { totalCount: number }
	organizations?: { nodes: OrganizationsType[] }
	repositories?: { nodes: RepositoryType[] }
	repositoriesContributedTo?: { nodes: RepositoryType[] }
}

export interface OrganizationsType {
	login: string | null
	name: string | null
	avatarUrl: string | null
	url: string | null
	description: string | null
	websiteUrl: string | null
}

export interface LanguageEdge {
	size: number
	node: {
		name: string
	}
}

export interface RepositoryType {
	name: string
	stargazerCount: number
	forkCount: number
	licenseInfo: { name: string } | null
	languages: {
		edges: LanguageEdge[]
	} | null
}

export interface DataResponse {
    user: UserDetailsType,
    organizations: OrganizationsType[],
    repositories: RepositoryType[],
    repositoriesContributedTo: RepositoryType[]
}