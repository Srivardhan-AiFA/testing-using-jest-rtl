"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartPoint = {
  month: string;
  desktop: number;
};

interface ChartLineDotsProps {
  chartData: ChartPoint[];
  money: number;
  trend: "up" | "down";
  trendRate: number;
  displayName: string;
  startColor: string;
  stopColor: string;
  type: string;
}

export function ChartLineDots({
  chartData,
  money,
  trend,
  trendRate,
  displayName,
}: ChartLineDotsProps) {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
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

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{ fill: "var(--color-desktop)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="px-0 w-full"></CardFooter>
    </Card>
  );
}
