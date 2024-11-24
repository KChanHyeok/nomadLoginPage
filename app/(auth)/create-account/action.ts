"use server";

import z from "zod";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

interface CreateForm {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

const passwordCheck = (data: CreateForm) => {
  return data.password === data.confirm_password;
};

const formSchema = z
  .object({
    username: z
      .string({
        required_error: "필수 입력사항입니다",
      })
      .min(3, { message: "3글자이상 입력해주세요" })
      .max(16)
      .trim(),
    email: z
      .string()
      .min(3, { message: "3글자이상 입력해주세요" })
      .email({ message: "이메일 방식으로 입력해주세요" })
      .toLowerCase()
      .trim(),
    password: z.string().min(3, { message: "3글자이상 입력해주세요" }).trim(),
    confirm_password: z.string().min(3, { message: "3글자이상 입력해주세요" }).trim(),
  })
  .refine(passwordCheck, {
    path: ["confirm_password"],
    message: "패스워드가 같지 않습니다",
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = formSchema.safeParse(data);
  if (result.success) {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    session.save();
    redirect("/profile");
  } else {
    return result.error.flatten();
  }
}
