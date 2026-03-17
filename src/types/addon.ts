import { apiFetch } from "@/lib/api/client";

export type Addon = {
  id: string;
  title: string;
  price: number;
  type: string;
};

export const addonService = {
  getAddons: () => apiFetch<Addon[]>("/addon"),
};
