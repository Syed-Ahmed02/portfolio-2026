import { GitHubCalendar } from "./ui/git-hub-calendar";

export function GithubGraph() {
    return (
        <div className="flex flex-col gap-2 ">
            <h1 className="text-2xl font-bold">
                I ship a lot
            </h1>
            <GitHubCalendar data={[]} />
        </div>
    )
}