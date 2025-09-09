export type User = {
  id: string;
  username: string;
  email: string;
  token: string;
  password?: string;

  error: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
};
