export type User = {
  id: string;
  username: string;
  email: string;
  token: string;
  password?: string;

  error: string;
};

export type SingleNote = {
  _id: string;
  title: string;
  content: string;
  category: string;
  isFavorite: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type Note = {
  loading: boolean;
  error: string | null;
  notes: SingleNote[];
  message: string;
};

export type Transaction = {
  _id: string;
  friendName: string;
  friendId: string;
  amount: number;
  transactionDate: string;
};

export type TransactionState = {
  loading: boolean;
  error: string | null;
  transactions: Transaction[];
  message: string;
};
