"use client";

import { useState } from "react";
import { authService } from "@/lib/api/auth/auth.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function LoginForm() {
  const router = useRouter();
  const { loadUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authService.login({
        email,
        password,
      });
      loadUser();
      // ไม่ต้อง set token ซ้ำ เพราะ authService ทำแล้ว
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="text-sm text-gray-600">อีเมล</label>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full mt-1 p-3 rounded-md border bg-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">รหัสผ่าน</label>
        <input
          type="password"
          placeholder="********"
          className="w-full mt-1 p-3 rounded-md border bg-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold"
      >
        เข้าสู่ระบบ
      </button>
    </form>
  );
}
