import { NavMain } from '@/components/nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Code2Icon, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';
import { HomeNavFooter } from './home-nav-footer';

const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: LayoutGrid,
  },
  {
    title: 'Scripts',
    href: '/scripts',
    icon: Code2Icon,
  },
];

export function HomeAppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <HomeNavFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
