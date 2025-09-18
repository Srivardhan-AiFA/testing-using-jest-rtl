// chart-area-linear.tsx
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";

export function ChartAreaLinear() {
  const chartData = [
    { day: "Day 1", desktop: 320 },
    { day: "Day 2", desktop: 145 },
    { day: "Day 3", desktop: 390 },
    { day: "Day 4", desktop: 510 },
    { day: "Day 5", desktop: 365 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full h-full">
      {" "}
      {/* FILL CARD HEIGHT */}
      <ChartContainer config={chartConfig} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.replace("Day ", "D")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="desktop"
              type="linear"
              fill="oklch(0.7 0.16 253.64)"
              fillOpacity={0.4}
              stroke="oklch(0.42 0.2 265.5)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
