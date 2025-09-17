import { AppSidebar } from "@/components/app-sidebar";
import { DropdownMenuCheckboxes } from "@/components/dropdown-custom";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell, Flag, MessageSquareText, Search } from "lucide-react";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header>
          <div className="flex h-16 shrink-0 items-center justify-between px-5 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <h2 className="outfit font-semibold tracking-wider">Crypto</h2>
              </div>
              <div className="flex items-center bg-gray-700 py-1 rounded-xs px-2">
                <Search size={15} />
                <input
                  type="text"
                  className="outline-0 border-0 pl-3 pr-1 text-sm py-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <DropdownMenuCheckboxes />
              <Flag size={15} />
              <Bell size={15} />
              <MessageSquareText size={15} />
            </div>
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
