import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboardIcon, LogInIcon, UserPlus2Icon } from 'lucide-react';
import { type ComponentPropsWithoutRef } from 'react';
import { Button } from './ui/button';

export function HomeNavFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {}) {
  const { auth } = usePage<SharedData>().props;

  return (
    <SidebarGroup
      {...props}
      className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}
    >
      <SidebarGroupContent>
        <SidebarMenu>
          {auth?.user ? (
            <>
              {' '}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    className="group-data-[collapsible=icon]:gap-0"
                    asChild
                  >
                    <Link href="/dashboard">
                      <LayoutDashboardIcon />
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          ) : (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    className="group-data-[collapsible=icon]:gap-0"
                    asChild
                  >
                    <Link href="/login">
                      <LogInIcon />
                      <span>Login</span>
                    </Link>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    className="group-data-[collapsible=icon]:gap-0"
                    variant={'outline'}
                    asChild
                  >
                    <Link href="/register">
                      <UserPlus2Icon />
                      <span>Register</span>
                    </Link>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
