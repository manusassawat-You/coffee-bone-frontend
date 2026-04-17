"use client";

import { useState } from "react";
import { authService } from "@/lib/api/auth/auth.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import toast from "react-hot-toast";

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

      await loadUser();
      router.refresh();

      toast.success("เข้าสู่ระบบสำเร็จ");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="text-sm text-gray-600">อีเมล</label>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full mt-1 p-3 rounded-md border bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">รหัสผ่าน</label>
        <input
          type="password"
          placeholder="********"
          className="w-full mt-1 p-3 rounded-md border bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold transition"
      >
        เข้าสู่ระบบ
      </button>

      <p className="text-center text-sm text-gray-600">
        ยังไม่มีบัญชี?{" "}
        <Link href="/register" className="text-orange-500 hover:underline">
          สมัครสมาชิก
        </Link>
      </p>
    </form>
  );
}
