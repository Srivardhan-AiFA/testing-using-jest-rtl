// card-chart.tsx
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ChartAreaDefault } from "./chart-area-default";
import type { ChartData } from "@/types/chart.types";

export type CardChartProps = {
  chartData: ChartData[];
  money: number;
  trend: "up" | "down";
  trendRate: number;
  displayName: string;
  startColor: string;
  stopColor: string;
  type: "linear" | "monotone" | "step" | "natural" | "basis";
};

export default function CardChart({
  chartData,
  money,
  trend,
  trendRate,
  displayName,
  startColor,
  stopColor,
  type,
}: CardChartProps) {
  return (
    <div>
      <Card className="@container/card py-0">
        <CardHeader>
          <div className="flex items-center mt-5">
            <div>
              <p className="text-xs mb-1 font-medium text-gray-600">
                {displayName}
              </p>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
                ${money}
              </CardTitle>
            </div>
            <div>
              {trend === "up" ? (
                <div className="ml-2 font-semibold flex text-xs text-green-600">
                  {trendRate}%
                  <ChevronUp size={13} />
                </div>
              ) : (
                <div className="ml-2 font-semibold flex text-xs text-red-600">
                  {trendRate}%
                  <ChevronDown size={13} />
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardFooter className="px-0 w-full">
          <ChartAreaDefault
            chartData={chartData}
            startColor={startColor}
            stopColor={stopColor}
            type={type}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
