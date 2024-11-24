"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function nextTweet(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      description: true,
      created_at: true,
      id: true,
      _count: {
        select: {
          comment: true,
          Like: true,
        },
      },
    },
    skip: page * 1,
    take: 2,
    orderBy: {
      created_at: "asc",
    },
  });
  return tweets;
}

const tweetSchema = z.object({
  tweet: z
    .string({
      required_error: "제목을 입력해주세요",
    })
    .min(1, "1자 이상")
    .max(20, "20자 이하"),
  description: z
    .string({
      required_error: "내용을 입력해주세요",
    })
    .min(1, "1자 이상")
    .max(200, "200자 이하"),
});

export async function uploadTweet(_: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
    description: formData.get("description"),
  };

  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    console.log(result.data);

    const tweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        description: result.data.description,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/tweets/${tweet.id}`);
  }
}
