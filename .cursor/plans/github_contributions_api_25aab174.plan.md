---
name: GitHub Contributions API
overview: Create an API route to fetch GitHub contributions for the last year using GitHub's GraphQL API, and update the GithubGraph component to fetch and display the data.
todos:
  - id: create-api-route
    content: Create API route at src/routes/api/github-contributions.ts with GitHub GraphQL query
    status: pending
  - id: update-github-component
    content: Update GithubGraph.tsx to fetch contributions data from API and handle loading/error states
    status: pending
  - id: add-env-docs
    content: Document required environment variables in plan
    status: pending
---

# GitHub Contributions API Implementation

## Overview

Create an API route that fetches GitHub contribution data for the last year using GitHub's GraphQL API, and integrate it with the existing `GithubGraph` component.

## Architecture

The implementation will follow this flow:

```
GithubGraph Component
  ↓ (on mount)
API Route: /api/github-contributions
  ↓ (GraphQL query)
GitHub GraphQL API
  ↓ (returns contribution data)
Transform to ContributionDay format
  ↓
Update GithubGraph with data
```

## Implementation Details

### 1. API Route: `src/routes/api/github-contributions.ts`

Create a new API route that:

- Accepts an optional `username` query parameter (defaults to env variable)
- Uses GitHub GraphQL API with Personal Access Token from environment
- Fetches contributions for the last year using the `contributionsCollection` query
- Transforms the response to match `ContributionDay[]` format expected by the calendar component
- Returns data in format: `{ date: string (ISO), count: number }[]`

**Key GraphQL Query:**

```graphql
query {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
```

### 2. Update `src/components/GithubGraph.tsx`

Modify the component to:

- Add state management for loading and contributions data
- Fetch data from `/api/github-contributions` on component mount
- Handle loading and error states
- Pass fetched data to `GitHubCalendar` component

### 3. Environment Variables Required

Users will need to add to their `.env` file:

- `GITHUB_USERNAME` - Your GitHub username
- `GITHUB_TOKEN` - GitHub Personal Access Token (optional but recommended)

## Files to Modify/Create

1. **Create:** `src/routes/api/github-contributions.ts` - New API route
2. **Modify:** `src/components/GithubGraph.tsx` - Add data fetching logic

## Error Handling

- Handle missing environment variables
- Handle GitHub API rate limiting
- Handle invalid usernames
- Handle network errors

## GitHub Token Setup

Users need to create a GitHub Personal Access Token with `read:user` scope:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `read:user` permission
3. Add to `.env` as `GITHUB_TOKEN`