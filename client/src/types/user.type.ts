export type User = {
  id: string;
  username: string;
  email: string;
  token: string;
  password?: string;

  error: string;
};

export type Note = {
  notes: SingleNote[];
  loading: boolean;
  error: string | null;
  users: getUsersType[];
};

export type SingleNote = {
  id: string;
  userId: string;
  content: string;
  role: "user" | "admin" | "moderator";
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type GetNotesResponse = {
  notes: SingleNote[];
};

export type NoteRBAC = {
  id: string;
  name: string;
  content: string;
  email: string;
};

export type getUsersType = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export type Role = {
  role: "user" | "admin" | "moderator";
};
