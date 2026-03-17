"use client";

import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }, []);

  return <p>Logging out...</p>;
}
