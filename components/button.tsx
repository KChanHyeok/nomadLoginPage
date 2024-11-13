"use client";
import { useFormStatus } from "react-dom";

export default function FormButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="border rounded-full w-full p-2 bg-[#D7D2CF]  text-center text-sm disabled:text-[#BBB4BC] transition-all active:scale-90"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
