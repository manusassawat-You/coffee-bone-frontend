"use client";

type Props = {
  onSelect: (time: string) => void;
};

export default function PickupTime({ onSelect }: Props) {
  return (
    <div className="mt-4">
      <label className="block mb-2 font-medium">เลือกเวลารับกาแฟ</label>

      <input
        type="time"
        step="900"
        className="border rounded-lg p-3 w-full"
        onChange={(e) => onSelect(e.target.value)}
      />
    </div>
  );
}
