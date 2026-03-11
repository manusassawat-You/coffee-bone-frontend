"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { orderService } from "@/lib/api/order/order.service";
import PickupTime from "@/components/pickup/pickup-time";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();

  const [pickupTime, setPickupTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"QR" | "CASH">("QR");

  const checkout = async () => {
    if (!pickupTime) {
      toast.error("กรุณาเลือกเวลารับกาแฟ");
      return;
    }

    try {
      const isoTime = new Date(`2024-01-01T${pickupTime}:00`).toISOString();

      await orderService.checkout({
        pickupTime: isoTime,
        paymentMethod,
      });

      toast.success("สั่งสำเร็จ");

      router.push("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Checkout ไม่สำเร็จ");
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* เวลา */}
      <h2 className="font-semibold mb-2">เลือกเวลารับกาแฟ</h2>
      <PickupTime onSelect={setPickupTime} />

      {/* วิธีจ่ายเงิน */}
      <div className="mt-8">
        <h2 className="font-semibold mb-3">วิธีชำระเงิน</h2>

        <div className="space-y-3">
          <div
            onClick={() => setPaymentMethod("QR")}
            className={`border p-4 rounded-lg cursor-pointer flex justify-between ${
              paymentMethod === "QR" ? "border-orange-500 bg-orange-50" : ""
            }`}
          >
            <div>
              <div className="font-medium">QR Code (PromptPay)</div>
              <div className="text-sm text-gray-500">สแกนจ่ายผ่านแอปธนาคาร</div>
            </div>

            <input type="radio" checked={paymentMethod === "QR"} readOnly />
          </div>

          <div
            onClick={() => setPaymentMethod("CASH")}
            className={`border p-4 rounded-lg cursor-pointer flex justify-between ${
              paymentMethod === "CASH" ? "border-orange-500 bg-orange-50" : ""
            }`}
          >
            <div>
              <div className="font-medium">เงินสด</div>
              <div className="text-sm text-gray-500">ชำระเงินเมื่อรับกาแฟ</div>
            </div>

            <input type="radio" checked={paymentMethod === "CASH"} readOnly />
          </div>
        </div>
      </div>

      {/* ปุ่ม */}
      <button
        onClick={checkout}
        className="mt-8 w-full bg-orange-500 text-white py-3 rounded-lg"
      >
        ยืนยันการสั่ง
      </button>
    </div>
  );
}
