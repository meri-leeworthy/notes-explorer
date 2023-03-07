"use client";
import { useRouter } from "next/navigation";
export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="px-4 no-underline py-2 text-xl font-title hover:border-black border-transparent border-2 rounded-[50%] sligoil-micro-ss04">
      ← Back
    </button>
  );
}
