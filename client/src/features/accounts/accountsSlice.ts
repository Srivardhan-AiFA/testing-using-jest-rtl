import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  InitialDataItem,
  LastTransactionsResponse,
  Transaction,
  TransactionState,
} from "../../types/user.type";

const initialState: TransactionState = {
  loading: false,
  error: null,
  transactions: [],
  message: "",
  initialData: [],
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
        state.transactions = action.payload.transactions;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })

      .addCase(getLastTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLastTransactions.fulfilled, (state, action) => {
        state.loading = false;

        state.transactions = [...action.payload.transactions];
      })

      .addCase(getLastTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })

      .addCase(getInitialData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInitialData.fulfilled, (state, action) => {
        state.loading = false;
        state.initialData = action.payload.initialData;
      })

      .addCase(getInitialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { clearMessage } = transactionsSlice.actions;
export default transactionsSlice.reducer;

export const addTransaction = createAsyncThunk<
  { message: string; transactions: Transaction[] },
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
        }/accounts/transactions/addNewAccount`,
        { friendName, amount },
        config
      );
      return res.data as { message: string; transactions: Transaction[] };
    } catch (error) {
      console.error(error);
      return rejectWithValue("Adding transaction failed");
    }
  }
);

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

export const getInitialData = createAsyncThunk<
  { initialData: InitialDataItem[] }, // return type
  void, // argument type
  { rejectValue: string } // reject type
>(
  "accounts/getInitialData", // sliceName/actionName
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No token found");
      }

      const res = await axios.get<InitialDataItem[]>(
        `${import.meta.env.VITE_BACKEND_URL}/accounts/getInitialData`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return { initialData: res.data };
    } catch (error) {
      console.error(error);
      return rejectWithValue("Fetching initial data failed");
    }
  }
);
