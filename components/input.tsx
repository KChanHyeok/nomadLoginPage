"use client";

import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
  svg?: React.ReactNode;
}

export default function FormInput({
  name,
  svg,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`${
          errors.length > 0 ? "border-red-500 ring-red-500" : ""
        } flex flex-row p-2 w-full focus-within:ring-[1.5px] border-[1.5px] ring-[#DCD8D8] ring-offset-2 rounded-full  px-1 `}
      >
        <div className="px-2 flex self-center">{svg}</div>
        <input name={name} className="focus:outline-none  bg-transparent pr-5 autofill:bg-none mr-3" {...rest} />
      </div>
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 text-sm font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
