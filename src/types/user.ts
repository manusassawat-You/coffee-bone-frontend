export type UserProfile = {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
};
