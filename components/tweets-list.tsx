"use client";

import { initedTweets } from "@/app/page";
import ListTweets from "./list-tweets";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { nextTweet } from "@/app/action";

interface TweetsListProps {
  initedTweets: initedTweets;
}

export default function TweetsList({ initedTweets }: TweetsListProps) {
  const [tweets, setTweets] = useState(initedTweets);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const nextPage = async () => {
    const newtweets = await nextTweet(page + 2);
    if (newtweets.length !== 0) {
      setPage((prevPage) => prevPage + 2);
      setTweets(newtweets);
    } else {
      setIsLastPage(true);
    }
  };

  const backPage = async () => {
    setPage((prevPage) => prevPage - 2);
    const newteets = await nextTweet(page - 2);
    setTweets(newteets);
    setIsLastPage(false);
  };

  return (
    <div className="flex flex-col px-4 gap-4">
      <div className="flex justify-between">
        {page < 1 ? (
          <div></div>
        ) : (
          <ChevronLeftIcon
            onClick={backPage}
            className="size-10 bg-[#EFEFEF] rounded-xl hover:bg-[#d3d2d2] duration-700 cursor-pointer"
          />
        )}

        {isLastPage ? (
          <div></div>
        ) : (
          <ChevronRightIcon
            onClick={nextPage}
            className="size-10 bg-[#EFEFEF] rounded-xl hover:bg-[#d3d2d2] duration-700 cursor-pointer"
          />
        )}
      </div>
      {tweets.map((tweet) => (
        <ListTweets
          key={tweet.id}
          tweet={tweet.tweet}
          description={tweet.description}
          created_at={tweet.created_at}
          id={tweet.id}
          like_count={tweet._count.Like}
          comments_count={tweet._count.comment}
        />
      ))}
    </div>
  );
}
