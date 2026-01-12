import { NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuList } from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <div className="">
    <NavigationMenu className="bg-background">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resume</NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  );
}