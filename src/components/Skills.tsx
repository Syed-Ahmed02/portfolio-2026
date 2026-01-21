import { Badge } from "@/components/ui/badge";
import {
  Atom,
  Braces,
  Code,
  Container,
  Database,
  Server,
} from "lucide-react";

type Skill = {
  label: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const skills: Skill[] = [
  { label: "React", Icon: Atom },
  { label: "Next.js", Icon: Code },
  { label: "TypeScript", Icon: Braces },
  { label: "Node.js", Icon: Server },
  { label: "Python", Icon: Code },
  { label: "Go", Icon: Code },
  { label: "Postgres", Icon: Database },
  { label: "Docker", Icon: Container },
  { label: "Kubernetes", Icon: Container },
  { label: "Java", Icon: Code },
  { label: "C++", Icon: Code },
];

export function Skills() {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Skills</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map(({ label, Icon }) => (
          <Badge
            key={label}
            variant="outline"
            className="h-8 px-3 text-xs bg-background/40"
          >
            {Icon ? (
              <Icon
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
            ) : null}
            <span>{label}</span>
          </Badge>
        ))}
      </div>
    </section>
  );
}

