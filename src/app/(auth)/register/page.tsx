import RegisterForm from "@/components/features/register.form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-100">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-orange-600">☕ Coffee Bone</h1>
        <p className="text-gray-600 text-sm mt-2">
          สมัครสมาชิกเพื่อเริ่มสั่งกาแฟ
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md w-420px p-8">
        <h2 className="text-lg font-semibold mb-6">สมัครสมาชิก</h2>

        <RegisterForm />
      </div>
    </div>
  );
}
