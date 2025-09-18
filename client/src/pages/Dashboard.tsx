import AccountsInformation from "@/components/accounts-information";
import { AppSidebar } from "@/components/app-sidebar";
import CardChart, { type ChartData } from "@/components/card-chart";
import CardChartDetaild from "@/components/card-chart-detaild";
import CardChartHistory from "@/components/card-chart-history";
import CryptoNews from "@/components/crypto-news";
import CurrencyCalculator from "@/components/currency-calculator";
import Downloads from "@/components/downloads";
import NavDashboard from "@/components/nav-dashboard";
import RefferToFriends from "@/components/reffer-to-friends";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

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
        <header className="bg-[#242424]">
          <NavDashboard />
        </header>
        <div className="w-full mt-5 px-5 mb-10">
          <div className=" border-1 p-3 mx-5 rounded-xl font-semibold">
            Crypto
          </div>
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 mt-5 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <CardChart
              chartData={chartData1}
              money={204}
              trend="up"
              trendRate={23}
            />
            <CardChart
              chartData={chartData2}
              money={1264}
              trend="up"
              trendRate={12}
            />
            <CardChart
              chartData={chartData3}
              money={8495}
              trend="down"
              trendRate={3}
            />
            <CardChart
              chartData={chartData4}
              money={729}
              trend="up"
              trendRate={9}
            />
          </div>
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 mt-5 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <CardChartDetaild />
            <CardChartHistory />
          </div>
          <div className="grid grid-cols-12 gap-5 mx-5 mt-5">
            <div className="col-span-5 border-2 p-3 rounded-sm">
              <AccountsInformation />
            </div>
            <div className="col-span-3 bg-[#242424] rounded-sm flex flex-col items-center justify-center">
              <RefferToFriends />
            </div>
            <div className="col-span-4 border-2 rounded-sm">
              <CurrencyCalculator />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-5 mx-5 mt-5">
            <div className="col-span-8 border-2 rounded-md p-7">
              <CryptoNews />
            </div>
            <div className="col-span-4">
              <Downloads />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
