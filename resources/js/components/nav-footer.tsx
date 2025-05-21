import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { FileCode2Icon } from 'lucide-react';
import { type ComponentPropsWithoutRef } from 'react';
import { Button } from './ui/button';

export function NavFooter({
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
                <Link href="/dashboard/scripts/new">
                  <FileCode2Icon />
                  <span>New Script</span>
                </Link>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
