"use server";

import db from "@/lib/db";

export default async function nextTweet(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      description: true,
      created_at: true,
      id: true,
    },
    skip: page * 1,
    take: 2,
    orderBy: {
      created_at: "asc",
    },
  });
  return tweets;
}
