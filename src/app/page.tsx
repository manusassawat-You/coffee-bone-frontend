import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-orange-500 text-white min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-10 items-center px-6">
        {/* Text */}
        <div>
          <h1 className="text-5xl font-bold mb-6">
            สั่งกาแฟล่วงหน้า <br />
            ไม่ต้องรอคิว
          </h1>

          <p className="mb-6 text-lg">
            เลือกเมนูกาแฟ เลือกเมล็ดกาแฟตามใจชอบ กำหนดเวลารับ
            พร้อมชำระเงินออนไลน์
          </p>

          <div className="flex gap-4">
            <Link
              href="/menu"
              className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold"
            >
              ☕ สั่งกาแฟเลย
            </Link>
          </div>
        </div>

        {/* Image */}
        <div>
          <Link href="/menu">
            <Image
              src="/img-coffee.png"
              width={500}
              height={300}
              alt="coffee"
              className="rounded-xl shadow-lg"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
