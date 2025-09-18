import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Bell, Flag, MessageSquareText, Search } from "lucide-react";
import { DropdownMenuCheckboxes } from "./dropdown-custom";

export default function NavDashboard() {
  return (
    <div>
      <div className="flex h-13 shrink-0 items-center justify-between px-5 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-gray-100" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h2 className="outfit font-semibold tracking-wider text-gray-100">
              Crypto
            </h2>
          </div>
          <div className="flex items-center bg-blue-100 py-1 rounded-xs px-2">
            <Search size={15} />
            <input
              type="text"
              className="outline-0 border-0 pl-3 pr-1 text-sm py-1"
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <DropdownMenuCheckboxes />
          <Flag size={15} className="text-gray-100 cursor-pointer" />
          <Bell size={15} className="text-gray-100 cursor-pointer" />
          <MessageSquareText
            size={15}
            className="text-gray-100 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
