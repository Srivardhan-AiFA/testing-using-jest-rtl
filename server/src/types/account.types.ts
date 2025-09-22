import mongoose from "mongoose";

export type Transaction = {
  userName: string;
  transactionDate: Date;
  amount: number;
};

export type Friend = {
  name: string;
  email: string;
  amount: number;
};

export type Account = {
  userId: mongoose.Types.ObjectId;
  name: string;
  transactions: Transaction[];
  friends: Friend[];
};

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
