import mongoose from "mongoose";
import { Account } from "../types/account.types";

const transactionSchema = new mongoose.Schema(
  {
    friendName: { type: String, required: true, trim: true },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // link to actual User
    amount: { type: Number, required: true, min: 0 },
    transactionDate: { type: Date, default: Date.now }, // auto timestamp
  },
  { _id: false }
);

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactions: { type: [transactionSchema], default: [] },
  },
  { timestamps: true }
);

export const AccountModel = mongoose.model<Account>("Accounts", accountSchema);
