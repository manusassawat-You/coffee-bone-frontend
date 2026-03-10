import { apiFetch } from "../client";

export const addonService = {
  getAddons: () => apiFetch("/addon"),
};
