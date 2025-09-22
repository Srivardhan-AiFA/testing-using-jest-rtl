import type { AppDispatch, RootState } from "@/app/store";
import AccountsInformation from "@/components/accounts-information";
import { AppSidebar } from "@/components/app-sidebar";
import CardChart from "@/components/card-chart";
import CardChartDetaild from "@/components/card-chart-detaild";
import CardChartHistory from "@/components/card-chart-history";
import { ChartLineDots } from "@/components/chart-line-dots";
import CryptoNews from "@/components/crypto-news";
import CurrencyCalculator from "@/components/currency-calculator";
import Downloads from "@/components/downloads";
import NavDashboard from "@/components/nav-dashboard";
import RefferToFriends from "@/components/reffer-to-friends";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  getInitialData,
  getLastTransactions,
} from "@/features/accounts/accountsSlice";
import { getAllUsers } from "@/features/sevices/serviceSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export type ChartData = {
  month: string;
  desktop: number;
};

export type CardChartData = {
  displayName: string;
  trend: "up" | "down";
  trendRate: number;
  startColor: string;
  stopColor: string;
  type: "linear" | "natural" | "step";
  money: number;
  chartData: ChartData[];
};

export default function Dashboard() {
  const dispatch: AppDispatch = useDispatch();
  const initialData = useSelector<RootState, CardChartData[]>(
    // @ts-expect-error array to obj
    (state) => state.accounts.initialData
  );

  useEffect(() => {
    dispatch(getLastTransactions());
    dispatch(getAllUsers());
    dispatch(getInitialData());
  }, [dispatch]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-gradient-to-r from-blue-800 to-blue-400">
          <NavDashboard />
        </header>

        <div className="w-full mt-5 px-5 mb-10">
          <div className="border-1 p-3 mx-5 rounded-sm font-semibold">
            Crypto
          </div>

          <div className="grid grid-cols-4 mt-5 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {initialData?.slice(0, 3).map((item, index) => (
              <CardChart
                key={index}
                chartData={item.chartData}
                money={item.money}
                trend={item.trend}
                trendRate={item.trendRate}
                displayName={item.displayName}
                startColor={item.startColor}
                stopColor={item.stopColor}
                type={item.type}
              />
            ))}

            {initialData?.slice(3, 4).map((item, index) => (
              <ChartLineDots
                key={index}
                chartData={item.chartData}
                money={item.money}
                trend={item.trend}
                trendRate={item.trendRate}
                displayName={item.displayName}
                startColor={item.startColor}
                stopColor={item.stopColor}
                type={item.type}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 mt-5 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <CardChartDetaild />
            <CardChartHistory />
          </div>

          <div className="grid grid-cols-12 gap-5 mx-5 mt-5">
            <div className="col-span-5 border-2 p-3 rounded-sm">
              <AccountsInformation />
            </div>
            <div className="col-span-3 rounded-sm border-2 flex flex-col items-center justify-center bg-[#242424]">
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
