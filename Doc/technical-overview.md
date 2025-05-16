# Technical Documentation

## Architecture

The application follows a client-side rendering approach using Next.js with React hooks for state management and data fetching. It implements a multi-layered caching strategy using Redis for server-side caching.

## Core Components

### Data Flow

```
User Interaction → React Component → Custom Hook → API Client → GitHub API
                                                 ↑
                                                 ↓
                                            Cache Layer
```

## Key Functions

### API Client

- **`fetchFromGitHub<T>`**: Fetches data from GitHub REST API with caching support.
  - Parameters: `endpoint` (API endpoint), `options` (caching options)
  - Returns: Promise with typed data from GitHub API

- **`fetchFromGitHubGraphQL`**: Fetches data from GitHub GraphQL API with caching support.
  - Parameters: `username` (GitHub username), `options` (caching options)
  - Returns: Promise with user profile data

### Caching System

- **`cacheData<T>`**: Caches data using the specified strategy.
  - Parameters: `key` (cache key), `data` (data to cache), `options` (caching options)

- **`getCachedData<T>`**: Retrieves cached data using the specified strategy.
  - Parameters: `key` (cache key), `options` (caching options)
  - Returns: Promise with cached data or null

### Custom Hooks

- **`useLeaderboard`**: Hook for fetching leaderboard data with caching.
  - Parameters: `location`, `sort`, `per_page`, `page`
  - Returns: Leaderboard data, loading state, error state, and refetch function

- **`useSearch`**: Hook for searching GitHub users.
  - Parameters: `query`, `per_page`, `page`, `autoSearch`
  - Returns: Search results, loading state, error state, and search function

- **`useRedisCache`**: Hook for managing Redis cache operations.
  - Returns: Functions for caching and retrieving data from Redis

## Pages

- **Home Page**: Landing page with links to main features
- **Leaderboard**: Displays top GitHub developers by location and sorting criteria
- **Search**: Allows users to search for GitHub users
- **User Profile**: Displays detailed information about a specific GitHub user

## Caching Strategy

The application implements a multi-layered caching approach:

1. **Redis Cache**: Server-side caching with configurable TTL
   - Leaderboard data: 12-hour TTL
   - User profiles: 24-hour TTL

## Error Handling

Error handling is implemented at the hook level, with appropriate error states and messages displayed to the user.



## Possible Upgrades
  - Adding Database For Saving UnCommon Data
  - Adding More Advanced Caching Strategy (Redis Cluster or Redis Sentinel)