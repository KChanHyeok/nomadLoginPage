"use client";

import FormButton from "@/components/button";
import FormInput from "@/components/input";
import { useFormState } from "react-dom";
import { createAccount } from "./action";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col items-center min-h-screen py-16 px-16 gap-10">
      <span className="text-2xl">회원가입</span>
      <form action={dispatch} className="flex flex-col gap-5">
        <FormInput name="username" type="text" placeholder="username" errors={state?.fieldErrors.username} />
        <FormInput name="email" type="eamil" placeholder="email" errors={state?.fieldErrors.email} />
        <FormInput name="password" type="password" placeholder="password" errors={state?.fieldErrors.password} />
        <FormInput
          name="confirm_password"
          type="password"
          placeholder="confirmPassword"
          errors={state?.fieldErrors.confirm_password}
        />
        <FormButton text="Create Account" />
      </form>
    </div>
  );
}
