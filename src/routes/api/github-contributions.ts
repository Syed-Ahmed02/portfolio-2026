import { createFileRoute } from '@tanstack/react-router';

interface ContributionDay {
  date: string; // ISO date string
  count: number;
}

interface GitHubContributionsResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: Array<{
            contributionDays?: Array<{
              date: string;
              contributionCount: number;
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{
    message: string;
    type: string;
  }>;
}

export const Route = createFileRoute('/api/github-contributions')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const username = url.searchParams.get('username') || process.env.GITHUB_USERNAME;
          const token = process.env.GITHUB_TOKEN;

          if (!username) {
            return Response.json(
              { error: 'GitHub username is required. Provide it as a query parameter or set GITHUB_USERNAME environment variable.' },
              { status: 400 }
            );
          }

          // Calculate date range for the last year (exactly 365 days)
          const now = new Date();
          const oneYearAgo = new Date(now);
          oneYearAgo.setDate(oneYearAgo.getDate() - 365);
          const from = oneYearAgo.toISOString();
          const to = now.toISOString();

          // GraphQL query to fetch contributions
          const query = `
            query($username: String!, $from: DateTime!, $to: DateTime!) {
              user(login: $username) {
                contributionsCollection(from: $from, to: $to) {
                  contributionCalendar {
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
          `;

          // Prepare request headers
          const headers: HeadersInit = {
            'Content-Type': 'application/json',
          };

          // Add authorization header if token is provided
          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }

          // Fetch data from GitHub GraphQL API
          const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              query,
              variables: {
                username,
                from,
                to,
              },
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            return Response.json(
              { error: `GitHub API error: ${response.status} ${response.statusText}`, details: errorText },
              { status: response.status }
            );
          }

          const result: GitHubContributionsResponse = await response.json();

          // Handle GraphQL errors
          if (result.errors) {
            return Response.json(
              { error: 'GitHub API error', details: result.errors.map((e) => e.message).join(', ') },
              { status: 400 }
            );
          }

          // Handle user not found
          if (!result.data?.user) {
            return Response.json(
              { error: `User "${username}" not found on GitHub` },
              { status: 404 }
            );
          }

          // Transform the response to ContributionDay format and filter to only last year
          const contributions: ContributionDay[] = [];
          const weeks = result.data.user.contributionsCollection?.contributionCalendar?.weeks || [];

          // Calculate the exact one year ago date (365 days)
          const oneYearAgoTimestamp = oneYearAgo.getTime();
          const nowTimestamp = now.getTime();

          for (const week of weeks) {
            const days = week.contributionDays || [];
            for (const day of days) {
              const dayDate = new Date(day.date);
              const dayTimestamp = dayDate.getTime();

              // Only include contributions from the last year (within the date range)
              if (dayTimestamp >= oneYearAgoTimestamp && dayTimestamp <= nowTimestamp) {
                contributions.push({
                  date: day.date,
                  count: day.contributionCount,
                });
              }
            }
          }

          return Response.json(contributions);
        } catch (error) {
          console.error('Error fetching GitHub contributions:', error);
          return Response.json(
            { error: 'Failed to fetch GitHub contributions', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
          );
        }
      },
    },
  },
});
