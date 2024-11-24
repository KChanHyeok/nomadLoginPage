"use client";

import { dislikeTweet, likeTweet } from "@/app/(nav)/tweets/[id]/action";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

interface LikeButtonProps {
  countLike: number;
  tweetId: number;
  isLike: boolean;
}

export default function LikeButton({ countLike, isLike, tweetId }: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic({ countLike, isLike }, (previousState, payload) => {
    return {
      isLike: !previousState.isLike,
      countLike: previousState.isLike ? previousState.countLike - 1 : previousState.countLike + 1,
    };
  });
  const onClick = async () => {
    reducerFn(undefined);
    if (isLike) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };

  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center border border-opacity-20 h-7 p-0 border-black px-2 rounded-full gap-2"
    >
      {state.isLike ? <SolidHeartIcon className="size-5 text-pink-600" /> : <OutlineHeartIcon className="size-5" />}
      <span>{state.countLike}</span>
    </button>
  );
}
