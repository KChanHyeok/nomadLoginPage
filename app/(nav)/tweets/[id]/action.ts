"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { comment } from "postcss";

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: Number(session.id),
      },
    });
    revalidateTag("tweet-detail");
  } catch (err) {}
}

export async function dislikeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: Number(session.id),
        },
      },
    });
    revalidateTag("tweet-detail");
  } catch (err) {}
}

export async function uploadComment(formData: FormData, tweetId: number) {
  const session = await getSession();
  try {
    await db.comment.create({
      data: {
        comment: formData.get("comment") + "",
        tweetId,
        userId: Number(session.id),
      },
    });
    revalidateTag("tweet-detail-comment");
  } catch (err) {}
}
