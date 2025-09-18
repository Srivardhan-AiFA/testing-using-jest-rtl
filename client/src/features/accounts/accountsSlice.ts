import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Transaction, TransactionState } from "../../types/user.type";

const initialState: TransactionState = {
  loading: false,
  error: null,
  transactions: [],
  message: "",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.transactions = [
          action.payload.transaction,
          ...state.transactions,
        ];
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });

    builder
      .addCase(getLastTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLastTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
      })
      .addCase(getLastTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { clearMessage } = transactionsSlice.actions;
export default transactionsSlice.reducer;

// Add a new transaction
export const addTransaction = createAsyncThunk<
  { message: string; transaction: Transaction },
  { friendName: string; amount: number },
  { rejectValue: string }
>(
  "transactions/addTransaction",
  async ({ friendName, amount }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/accounts/transactions/getPrevTransactions`,
        { friendName, amount },
        config
      );
      return res.data as { message: string; transaction: Transaction };
    } catch (error) {
      console.error(error);
      return rejectWithValue("Adding transaction failed");
    }
  }
);

type LastTransactionsResponse = {
  accountId: string;
  lastTransactions: Transaction[];
};

export const getLastTransactions = createAsyncThunk<
  { transactions: Transaction[] },
  void,
  { rejectValue: string }
>("transactions/getLastTransactions", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const res = await axios.get<LastTransactionsResponse>(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/accounts/transactions/getPrevTransactions`,
      config
    );

    return { transactions: res.data.lastTransactions };
  } catch (error) {
    console.error(error);
    return rejectWithValue("Fetching transactions failed");
  }
});
