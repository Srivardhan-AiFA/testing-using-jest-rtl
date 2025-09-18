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
