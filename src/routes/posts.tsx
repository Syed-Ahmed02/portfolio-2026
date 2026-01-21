import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  component: RouteComponent,
})


function RouteComponent() {
  return (

    <div className="max-w-2xl mx-auto">

    </div>
  );
}
