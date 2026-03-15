"use client";

import { useState } from "react";
import { authService } from "@/lib/api/auth/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

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

      toast.success("สมัครสมาชิกสำเร็จ");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("สมัครสมาชิกไม่สำเร็จ");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">ชื่อผู้ใช้</label>
        <input
          type="text"
          placeholder="กรอกชื่อผู้ใช้"
          className="w-full border p-3 rounded bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">อีเมล</label>
        <input
          type="email"
          placeholder="example@email.com"
          className="w-full border p-3 rounded bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">รหัสผ่าน</label>
        <input
          type="password"
          placeholder="อย่างน้อย 6 ตัวอักษร"
          className="w-full border p-3 rounded bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
      >
        สมัครสมาชิก
      </button>

      <p className="text-center text-sm text-gray-600">
        มีบัญชีอยู่แล้ว?{" "}
        <Link href="/login" className="text-orange-500 hover:underline">
          เข้าสู่ระบบ
        </Link>
      </p>
    </form>
  );
}
