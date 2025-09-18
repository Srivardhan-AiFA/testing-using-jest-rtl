import { Area, AreaChart, CartesianGrid } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartAreaDefaultPropsAreaOf } from "@/types/chart.types";

export const description = "A simple area chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaDefault({ chartData }: ChartAreaDefaultPropsAreaOf) {
  return (
    <div className="w-full">
      <ChartContainer config={chartConfig}>
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="oklch(0.7 0.16 253.64)"
            fillOpacity={0.4}
            stroke="oklch(0.42 0.2 265.5)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
