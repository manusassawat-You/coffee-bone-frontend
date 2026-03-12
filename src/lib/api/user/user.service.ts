import { apiFetch } from "../client";
import type { UserProfile } from "@/types/user";

export const userService = {
  getProfile: () => apiFetch<UserProfile>("/users/profile"),
};
