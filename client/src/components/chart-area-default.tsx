// chart-area-default.tsx
import { Area, AreaChart, CartesianGrid } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartData } from "@/types/chart.types";

export const description = "A simple area chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;
// chart-area-default.tsx
type ChartProps = {
  chartData: ChartData[];
  startColor: string;
  stopColor: string;
  type: "linear" | "monotone" | "step" | "natural" | "basis";
  strokeColor?: string;
  gradientId?: string; // optional unique id
};

export function ChartAreaDefault({
  chartData,
  startColor,
  stopColor,
  type,
  gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`, // generate unique id
}: ChartProps) {
  return (
    <div className="w-full">
      <ChartContainer config={chartConfig}>
        <AreaChart width={500} height={300} data={chartData}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={startColor} stopOpacity={1} />
              <stop offset="60%" stopColor={stopColor} stopOpacity={1} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area dataKey="desktop" type={type} fill={`url(#${gradientId})`} />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
