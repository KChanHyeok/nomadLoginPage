import LikeButton from "@/components/like-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import CommentList from "@/components/comment-list";
import { unstable_cache as NextCache } from "next/cache";
import { Prisma } from "@prisma/client";

async function getTweets(id: number) {
  const tweet = await db.tweet.findUnique({
    where: { id },
    select: {
      tweet: true,
      description: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          Like: true,
        },
      },
    },
  });
  return tweet;
}

async function getComments(id: number) {
  const comments = await db.comment.findMany({
    where: { tweetId: id },
    select: {
      id: true,
      comment: true,
      created_at: true,
    },
  });
  return comments;
}

const cachedComments = NextCache(getComments, ["Tweet-detail"], {
  revalidate: 60,
  tags: ["tweet-detail-comment"],
});

const cachedTweets = NextCache(getTweets, ["Tweet-detail"], {
  tags: ["tweet-detail"],
});

async function getIsLike(id: number) {
  const session = await getSession();
  const isLike = await db.like.findUnique({
    where: {
      id: {
        tweetId: id,
        userId: Number(session.id),
      },
    },
  });
  return Boolean(isLike);
}

export type initComment = Prisma.PromiseReturnType<typeof getComments>;

export default async function TweetsDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await cachedTweets(id);
  const comments = await cachedComments(id);

  const isLike = await getIsLike(id);
  return (
    <div className="p-4">
      <div className="flex flex-col gap-10 p-4 bg-[#EFEFEF] rounded-3xl ">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-4xl">{tweet?.tweet}</span>
            <LikeButton countLike={tweet?._count.Like!} isLike={isLike!} tweetId={id} />
          </div>
          <p className="text-sm">{tweet?.user.username}</p>
          <p className=" border-gray-300 p-3">{tweet?.description}</p>
        </div>
      </div>
      <CommentList initComment={comments} tweetId={id} />
    </div>
  );
}
