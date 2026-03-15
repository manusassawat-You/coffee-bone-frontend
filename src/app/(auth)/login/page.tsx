import LoginForm from "@/components/features/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-100">
      {/* Logo */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-orange-600 flex items-center gap-2 justify-center">
          ☕ Coffee Bone
        </h1>

        <p className="text-gray-600 text-sm mt-2">
          สั่งกาแฟล่วงหน้า รับง่าย รวดเร็ว
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md w-420px p-8">
        <h2 className="text-lg font-semibold mb-1">เข้าสู่ระบบ</h2>

        <p className="text-gray-500 text-sm mb-6">
          กรอกอีเมลและรหัสผ่านเพื่อเข้าใช้งาน
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
