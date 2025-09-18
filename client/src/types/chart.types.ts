import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

export type ChartData = {
  month: string;
  desktop: number;
};

export type ChartAreaDefaultProps = {
  chartData: ChartData[];
  money: number;
  trend: string;
  trendRate: number;
  displayName: string;
};

export type ChartAreaDefaultPropsAreaOf = {
  chartData: ChartData[];
};

export type Checked = DropdownMenuCheckboxItemProps["checked"];
