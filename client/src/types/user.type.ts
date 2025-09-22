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
  notes: SingleNote[];
  loading: boolean;
  error: string | null;
  message: string;
  categories: string[];
  total: number;
  totalPages: number;
  currentPage: number;
};

export type GetNotesResponse = {
  notes: SingleNote[];
  total: number;
  totalPages: number;
  currentPage: number;
};
