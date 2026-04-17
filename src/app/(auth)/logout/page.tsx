"use client";

import { useEffect } from "react";
import { authService } from "@/lib/api/auth/auth.service";

export default function LogoutPage() {
  useEffect(() => {
    authService.logout();
    window.location.href = "/login";
  }, []);

  return <p>Logging out...</p>;
}
