"use client";

import { useState, useEffect } from "react";
import { format, subDays, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, getMonth, getYear, startOfMonth, isAfter, isBefore } from "date-fns";

interface ContributionDay {
  date: string; // ISO date string (e.g., "2025-09-13")
  count: number;
}

interface GitHubCalendarProps {
  data: ContributionDay[]; // Contribution data
  colors?: string[]; // Custom color scale (default: GitHub-like greens)
}

const GitHubCalendar = ({ data, colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"] }: GitHubCalendarProps) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const today = new Date();
  const startDate = subDays(today, 365); // Exactly one year back (365 days)
  const weeks = 53;

  // Process data prop
  useEffect(() => {
    setContributions(data.map((item) => ({ ...item, date: new Date(item.date).toISOString() })));
  }, [data]);

  // Get color based on contribution count
  const getColor = (count: number) => {
    if (count === 0) return colors[0];
    if (count === 1) return colors[1];
    if (count === 2) return colors[2];
    if (count === 3) return colors[3];
    return colors[4] || colors[colors.length - 1]; // Fallback to last color
  };

  // Render weeks
  const renderWeeks = () => {
    const weeksArray = [];
    let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });

    for (let i = 0; i < weeks; i++) {
      const weekDays = eachDayOfInterval({
        start: currentWeekStart,
        end: endOfWeek(currentWeekStart, { weekStartsOn: 0 }),
      });

      weeksArray.push(
        <div key={i} className="flex flex-col gap-1">
          {weekDays.map((day, index) => {
            const contribution = contributions.find((c) => isSameDay(new Date(c.date), day));
            const color = contribution ? getColor(contribution.count) : colors[0];

            return (
              <div
                key={index}
                className={`w-3 h-3 rounded-[4px]`}
                style={{ backgroundColor: color }}
                title={`${format(day, "PPP")}: ${contribution?.count || 0} contributions`}
              />
            );
          })}
        </div>
      );
      currentWeekStart = addDays(currentWeekStart, 7);
    }

    return weeksArray;
  };

  // Render month labels dynamically based on the actual calendar weeks
  const renderMonthLabels = () => {
    const monthLabels: Array<{ label: string; weekIndex: number }> = [];
    const calendarStart = startOfWeek(startDate, { weekStartsOn: 0 });
    let currentWeekStart = calendarStart;
    
    // Track which months we've already labeled
    const seenMonths = new Set<string>();
    
    // Iterate through all weeks to find where months start
    for (let weekIndex = 0; weekIndex < weeks; weekIndex++) {
      const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 0 });
      
      // Check each day of the week to see if it's the first day of a month
      const weekDays = eachDayOfInterval({
        start: currentWeekStart,
        end: weekEnd,
      });
      
      for (const day of weekDays) {
        // Check if this is the first day of a month
        if (isSameDay(day, startOfMonth(day))) {
          const monthKey = `${getYear(day)}-${getMonth(day)}`;
          
          // Only add label if we haven't seen this month yet
          if (!seenMonths.has(monthKey) && 
              (isAfter(day, startDate) || isSameDay(day, startDate)) &&
              (isBefore(day, today) || isSameDay(day, today))) {
            monthLabels.push({
              label: format(day, "MMM"),
              weekIndex: weekIndex,
            });
            seenMonths.add(monthKey);
            break; // Only one label per week
          }
        }
      }
      
      // Always ensure current month is shown on the last week if not already added
      if (weekIndex === weeks - 1) {
        const currentMonthKey = `${getYear(today)}-${getMonth(today)}`;
        if (!seenMonths.has(currentMonthKey)) {
          monthLabels.push({
            label: format(today, "MMM"),
            weekIndex: weekIndex,
          });
          seenMonths.add(currentMonthKey);
        }
      }
      
      currentWeekStart = addDays(currentWeekStart, 7);
    }
    
    // Sort by week index
    monthLabels.sort((a, b) => a.weekIndex - b.weekIndex);
    
    // Render labels positioned at their respective week indices
    // Each label should align with its corresponding week column
    // Week columns are w-3 (0.75rem) wide, with gap-1 (0.25rem) between them
    const labelElements = [];
    let currentLabelIndex = 0;
    
    for (let i = 0; i < weeks; i++) {
      if (currentLabelIndex < monthLabels.length && monthLabels[currentLabelIndex].weekIndex === i) {
        // Render the month label - align left within the week column width
        labelElements.push(
          <div key={i} className="text-xs text-gray-500 w-3 flex items-start">
            {monthLabels[currentLabelIndex].label}
          </div>
        );
        currentLabelIndex++;
      } else {
        // Add empty placeholder with same width as week column
        labelElements.push(
          <div key={i} className="w-3"></div>
        );
      }
    }
    
    return labelElements;
  };

  // Render day labels
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-4 border rounded-lg max-w-2xl overflow-x-auto ">
      <div className="flex">
        <div className="flex flex-col justify-between mt-5.5 mr-2">
          {dayLabels.map((day, index) => (
            <span key={index} className="text-xs text-gray-500 h-3">
              {day}
            </span>
          ))}
        </div>
        <div className="pr-2">
          <div className="flex gap-1 mb-2 ">{renderMonthLabels()}</div>
          <div className="flex gap-1 ">{renderWeeks()}</div>
        </div>
      </div>
      <div className="mt-4 justify-start flex gap-2 text-xs items-center">
        <span>Less</span>
        {colors.map((color, index) => (
          <div key={index} className="w-3 h-3 rounded-[4px]" style={{ backgroundColor: color }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export {GitHubCalendar};