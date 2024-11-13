"use client";

import FormButton from "@/components/button";
import FormInput from "@/components/input";
import login from "./log-in/action";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function Home() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="flex flex-col items-center min-h-screen py-16 px-16 gap-4">
      <div>
        <span>환영합니다</span>
      </div>
      <Link
        className="w-full bg-[#D7D2CF] text-center p-2 rounded-full hover:bg-[#d0c3bc] duration-700"
        href={"/create-account"}
      >
        시작하기
      </Link>
      <Link
        className="w-full bg-[#D7D2CF] text-center p-2 rounded-full hover:bg-[#d0c3bc] duration-700"
        href={"/log-in"}
      >
        로그인
      </Link>
    </div>
  );
}
