import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment integration, and admin dashboard.",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application built with Next.js and Firebase. Real-time updates, drag-and-drop functionality, and team collaboration features.",
  },
  {
    title: "Weather Dashboard",
    description: "Interactive weather dashboard using React and OpenWeatherMap API. Displays current conditions, forecasts, and location-based weather data with beautiful visualizations.",
  },
  {
    title: "Blog CMS",
    description: "Content management system for bloggers built with TypeScript and Prisma. Markdown support, SEO optimization, and a clean, intuitive writing interface.",
  },
  {
    title: "Social Media Analytics",
    description: "Analytics platform for tracking social media metrics. Built with Python, Flask, and D3.js. Real-time data visualization and comprehensive reporting tools.",
  },
  {
    title: "Fitness Tracker",
    description: "Mobile-first fitness tracking application with workout logging, progress charts, and personalized recommendations. Built with React Native and GraphQL.",
  },
];


export default function Projects() {
  return (
    <div className="max-w-2xl grid grid-cols-2 gap-4 space-y-6">

      {projects.map((project) => (

        <Card key={project.title} className="relative hover:bg-secondary bg-card shadow-2xl transition-colors w-full overflow-hidden">

          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={`https://picsum.photos/seed/${project.title}/400/300`}
              alt={project.title}
              className="w-full h-full object-cover px-4"
            />
          </div>
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