import { Response } from "express";
import { AuthRequest } from "../types/user.type";
import { AccountModel } from "../models/account.model";
import { User } from "../models/users.model";
import mongoose from "mongoose";

export const getLastTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    const account = await AccountModel.findOne({
      userId: new mongoose.Types.ObjectId(userId as string),
    });
    console.log(account, userId);

    if (!account) {
      return res.status(200).json({
        lastTransactions: [],
      });
    }

    const lastTransactions = account.transactions
      .sort(
        (a, b) =>
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime()
      )
      .slice(0, 5);

    return res.status(200).json({
      accountId: account._id,
      lastTransactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    const { friendName, amount } = req.body;
    if (!friendName || !amount) {
      return res
        .status(400)
        .json({ message: "Friend name and amount are required" });
    }

    // safer: use email or _id instead of firstname
    const friend = await User.findOne({ firstname: friendName });
    if (!friend) {
      return res
        .status(404)
        .json({ message: "Friend not found in users database" });
    }

    const account = await AccountModel.findOneAndUpdate(
      { userId },
      {
        $push: {
          transactions: {
            friendName: friend.firstname,
            friendId: friend._id,
            amount,
            transactionDate: new Date(),
          },
        },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: "Transaction added successfully",
      transactions: account?.transactions,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
