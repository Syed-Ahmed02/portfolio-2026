"use client";

import { useState, useEffect } from "react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  type Activity,
} from "./ui/git-hub-calendar";
import { cn } from "@/lib/utils";

export function GithubGraph() {
  const [contributions, setContributions] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/github-contributions");

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error ||
              `Failed to fetch contributions: ${response.statusText}`
          );
        }

        const data = await response.json();
        setContributions(data.contributions || data);
      } catch (err) {
        console.error("Error fetching GitHub contributions:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load contributions"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">I ship a lot</h1>
        <div className="text-sm text-gray-500">Loading contributions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">I ship a lot</h1>
        <div className="text-sm text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (contributions.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">I ship a lot</h1>
        <div className="text-sm text-gray-500">No contributions found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">I ship a lot</h1>
      <ContributionGraph data={contributions}>
        <ContributionGraphCalendar>
          {({ activity, dayIndex, weekIndex }) => (
            <ContributionGraphBlock
              activity={activity}
              className={cn(
                'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
                'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
                'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
                'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
                'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
              )}
              dayIndex={dayIndex}
              weekIndex={weekIndex}
            />
          )}
        </ContributionGraphCalendar>
        <ContributionGraphFooter />
      </ContributionGraph>
    </div>
  );
}
