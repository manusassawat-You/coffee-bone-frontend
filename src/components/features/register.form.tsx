"use client";

import { useState } from "react";
import { authService } from "@/lib/api/auth/auth.service";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authService.register({
        username,
        email,
        password,
      });

      alert("สมัครสมาชิกสำเร็จ");

      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Register failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <label>ชื่อผู้ใช้</label>
        <input
          type="text"
          className="w-full border p-3 rounded bg-gray-100"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label>อีเมล</label>
        <input
          type="email"
          className="w-full border p-3 rounded bg-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>รหัสผ่าน</label>
        <input
          type="password"
          className="w-full border p-3 rounded bg-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="w-full bg-orange-500 text-white py-3 rounded">
        สมัครสมาชิก
      </button>
    </form>
  );
}
