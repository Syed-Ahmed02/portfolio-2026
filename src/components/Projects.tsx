import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    title: "Project 1",
    description: "Project 1 description",
  },
  {
    title: "Project 2",
    description: "Project 2 description",
  },
  {
    title: "Project 3",
    description: "Project 3 description",
  },
  {
    title: "Project 4",
    description: "Project 4 description",
  },
  {
    title: "Project 5",
    description: "Project 5 description",
  },
  {
    title: "Project 6",
    description: "Project 6 description",
  },
];


export default function Projects() {
  return (
    <div className="max-w-2xl grid grid-cols-2 gap-4 space-y-6">
      {projects.map((project) => (
        <Card key={project.title} className="hover:bg-secondary transition-colors w-full">
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{project.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}