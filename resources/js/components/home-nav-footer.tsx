import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { LogInIcon, UserPlus2Icon } from 'lucide-react';
import { type ComponentPropsWithoutRef } from 'react';
import { Button } from './ui/button';

export function HomeNavFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {}) {
  return (
    <SidebarGroup
      {...props}
      className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}
    >
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button className="group-data-[collapsible=icon]:gap-0" asChild>
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
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
