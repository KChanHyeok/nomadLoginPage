"use server";

import db from "@/lib/db";
import z from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

interface IcheckEmail {
  email: string;
  username: string;
  password: string;
}

const checkEmail = async (data: IcheckEmail) => {
  const user = await db.user.findUnique({
    where: { email: data.email, username: data.username },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z
  .object({
    email: z
      .string({
        required_error: "필수 입력사항입니다.",
      })
      .email()
      .toLowerCase()
      .trim(),
    username: z.string({ required_error: "필수 입력사항입니다." }).trim(),
    password: z.string({ required_error: "필수 입력사항입니다." }).trim(),
  })
  .refine(checkEmail, {
    path: ["email", "username"],
    message: "아이디가 존재하지 않습니다",
  });

export default async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
      username: result.data.username,
    },
    select: {
      id: true,
      password: true,
    },
  });
  const check = await bcrypt.compare(result.data.password, user?.password ?? "");
  if (check) {
    const session = await getSession();
    session.id = user?.id;
    await session.save();
    redirect("/");
  } else {
    return {
      fieldErrors: {
        password: ["패스워드오류"],
        username: [],
        email: [],
      },
    };
  }
}
