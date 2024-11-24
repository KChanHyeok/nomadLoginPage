import { formatToTimeAgo } from "@/lib/utils";
import { ChatBubbleLeftEllipsisIcon, HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface TweetListProps {
  tweet: string;
  description: string;
  created_at: Date;
  id: number;
  like_count: number;
  comments_count: number;
}

export default function ListTweets({ tweet, description, created_at, id, like_count, comments_count }: TweetListProps) {
  return (
    <Link className="flex flex-col p-5 bg-[#EFEFEF] rounded-3xl gap-3" href={`/tweets/${id}`}>
      <div>
        <h1 className="text-3xl font-semibold">{tweet}</h1>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row">
          <div className="flex flex-row items-center gap-1">
            <HeartIcon className="size-5 cursor-pointer " />
            <span>{like_count || 0}</span>
            <ChatBubbleLeftEllipsisIcon className="size-5" />
            <span>{comments_count || 0}</span>
          </div>
        </div>
        <span>{formatToTimeAgo(created_at.toString())}</span>
      </div>
    </Link>
  );
}
