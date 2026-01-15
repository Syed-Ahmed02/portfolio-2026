import { useState, useEffect } from "react";
import { GitHubCalendar } from "./ui/git-hub-calendar";

interface ContributionDay {
  date: string;
  count: number;
}

export function GithubGraph() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/github-contributions');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch contributions: ${response.statusText}`);
        }

        const data: ContributionDay[] = await response.json();
        setContributions(data);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError(err instanceof Error ? err.message : 'Failed to load contributions');
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  return (
    <div className="flex flex-col gap-2 ">
      <h1 className="text-2xl font-bold">
        I ship a lot
      </h1>
      {loading && (
        <div className="text-sm text-gray-500">
          Loading contributions...
        </div>
      )}
      {error && (
        <div className="text-sm text-red-500">
          Error: {error}
        </div>
      )}
      {!loading && !error && (
        <GitHubCalendar data={contributions} />
      )}
    </div>
  );
}