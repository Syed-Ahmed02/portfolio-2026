import { createFileRoute } from "@tanstack/react-router";

interface GitHubContributionsResponse {
  contributions: Array<{
    date: string;
    count: number;
    level: number;
  }>;
  total: {
    [year: string]: number;
  };
}

export const Route = createFileRoute("/api/github-contributions")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const username =
            url.searchParams.get("username") ||
            process.env.GITHUB_USERNAME ||
            "haydenbleasel";

          const apiUrl = new URL(
            `/v4/${username}`,
            "https://github-contributions-api.jogruber.de"
          );

          const response = await fetch(apiUrl.toString());

          if (!response.ok) {
            return Response.json(
              {
                error: `GitHub contributions API error: ${response.status} ${response.statusText}`,
              },
              { status: response.status }
            );
          }

          const data = (await response.json()) as GitHubContributionsResponse;

          // Calculate date 365 days ago and today
          const now = new Date();
          const oneYearAgo = new Date(now);
          oneYearAgo.setDate(oneYearAgo.getDate() - 365);
          const oneYearAgoISO = oneYearAgo.toISOString().split("T")[0]; // YYYY-MM-DD format
          const todayISO = now.toISOString().split("T")[0]; // YYYY-MM-DD format

          // Filter contributions to only include the last year up to today
          const lastYearContributions = data.contributions.filter((contribution) => {
            return contribution.date >= oneYearAgoISO && contribution.date <= todayISO;
          });

          // Calculate total for the last year
          const total = lastYearContributions.reduce(
            (sum, contribution) => sum + contribution.count,
            0
          );

          return Response.json({
            contributions: lastYearContributions,
            total,
          });
        } catch (error) {
          console.error("Error fetching GitHub contributions:", error);
          return Response.json(
            {
              error: "Failed to fetch GitHub contributions",
              details:
                error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
          );
        }
      },
    },
  },
});
