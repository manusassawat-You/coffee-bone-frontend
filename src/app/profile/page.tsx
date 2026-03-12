"use client";

import { useEffect, useState } from "react";
import { userService } from "@/lib/api/user/user.service";
import type { UserProfile } from "@/types/user";

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await userService.getProfile();
      setUser(data);
    };

    load();
  }, []);

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-3">
        <p>
          <b>Username:</b> {user.username}
        </p>

        <p>
          <b>Email:</b> {user.email}
        </p>

        <p>
          <b>Role:</b> {user.role}
        </p>

        <p>
          <b>Created:</b> {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
