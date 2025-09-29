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

export interface SingleNote {
  id: string;
  userId: string;
  content: string;
  name: string;
  role: Role;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type GetNotesResponse = {
  notes: SingleNote[];
};

export type NoteRBAC = {
  id: string;
  name: string;
  content: string;
  email: string;
};

export interface getUsersType {
  id: string;
  username: string;
  email: string;
  role: Role;
}

export type Role = "user" | "admin" | "moderator";
