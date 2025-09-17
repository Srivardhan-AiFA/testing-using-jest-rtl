import { AppSidebar } from "@/components/app-sidebar";
import CardChart, { type ChartData } from "@/components/card-chart";
import CardChartDetaild from "@/components/card-chart-detaild";
import CardChartHistory from "@/components/card-chart-history";
import { DropdownMenuCheckboxes } from "@/components/dropdown-custom";
import TableCustom from "@/components/table-custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Bell,
  CreditCard,
  Flag,
  MessageSquareText,
  PlusCircle,
  Search,
} from "lucide-react";

export default function Dashboard() {
  const chartData1: ChartData[] = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartData2: ChartData[] = [
    { month: "January", desktop: 129 },
    { month: "February", desktop: 222 },
    { month: "March", desktop: 98 },
    { month: "April", desktop: 187 },
    { month: "May", desktop: 154 },
    { month: "June", desktop: 276 },
  ];

  const chartData3: ChartData[] = [
    { month: "January", desktop: 310 },
    { month: "February", desktop: 144 },
    { month: "March", desktop: 201 },
    { month: "April", desktop: 89 },
    { month: "May", desktop: 260 },
    { month: "June", desktop: 178 },
  ];

  const chartData4: ChartData[] = [
    { month: "January", desktop: 75 },
    { month: "February", desktop: 132 },
    { month: "March", desktop: 199 },
    { month: "April", desktop: 310 },
    { month: "May", desktop: 245 },
    { month: "June", desktop: 158 },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-gray-900">
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
        </header>
        <div className="w-full mt-5 px-5 mb-10">
          <div className=" border-1 p-3 mx-5 rounded-xl font-semibold">
            Crypto
          </div>
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 mt-5 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <CardChart chartData={chartData1} />
            <CardChart chartData={chartData2} />
            <CardChart chartData={chartData3} />
            <CardChart chartData={chartData4} />
          </div>
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 mt-5 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <CardChartDetaild />
            <CardChartHistory />
          </div>
          <div className="grid grid-cols-12 gap-5 mx-5 mt-5">
            <div className="col-span-5 border-2 p-3 rounded-sm">
              <div className="flex justify-between mt-5">
                <h5 className="text-sm font-semibold">Send Money to</h5>
                <p className="flex items-center text-blue-900">
                  <PlusCircle size={15} />{" "}
                  <p className="text-xs cursor-pointer">Add New Wallet</p>
                </p>
              </div>
              <div>
                <TableCustom />
              </div>
            </div>
            <div className="col-span-3 bg-[#242424] rounded-sm flex flex-col items-center justify-center">
              <div>
                <CreditCard size={60} className="text-gray-200 mb-3" />
              </div>
              <div className="flex items-center flex-col">
                <h6 className="mb-5 text-lg font-semibold text-gray-200">
                  Refer and Get Reward
                </h6>
                <p className="mb-5 text-center text-xs max-w-3/5 font-semibold text-gray-200">
                  Refer us to your friends and earn bonus when they join.
                </p>
                <Button
                  variant="default"
                  className="bg-orange-400 rounded-xs mt-3 text-xs cursor-pointer hover:bg-orange-400"
                >
                  Invite Friends
                </Button>
              </div>
            </div>
            <div className="col-span-4 border-2 rounded-sm">
              <div className="p-4">
                <h6 className="text-sm font-semibold mb-2">
                  Currency Calculator
                </h6>
                <span className="text-xs text-gray-500 font-semibold">
                  1,87 BTC equals
                </span>
                <p className="text-blue-800 font-bold text-2xl mt-1">
                  11466.78 USD
                </p>
                <p className="text-xs text-gray-500">@ 1 BTC - 6718.72 USD</p>
              </div>
              <div className="flex gap-2 justify-around mt-5">
                <Input
                  type="text"
                  className="max-w-26 outline-0"
                  placeholder="From"
                />
                <Input
                  type="text"
                  className="max-w-26 outline-0"
                  placeholder="To"
                />
                <Input
                  type="text"
                  className="max-w-26 outline-0"
                  placeholder="Amount"
                />
              </div>
              <Button
                variant="default"
                className="bg-blue-900 rounded-sm mt-3 ml-2 text-xs cursor-pointer hover:bg-blue-800"
              >
                Calculate
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
