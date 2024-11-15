import { formatToTimeAgo } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface TweetListProps {
  tweet: string;
  description: string;
  created_at: Date;
  id: number;
}

export default function ListTweets({ tweet, description, created_at, id }: TweetListProps) {
  return (
    <Link className="flex flex-col p-5 bg-[#EFEFEF] rounded-3xl gap-3" href={`/tweets/${id}`}>
      <div>
        <h1 className="text-3xl font-semibold">{tweet}</h1>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <HeartIcon className="size-5 cursor-pointer z-1" />
          <span>0</span>
        </div>
        <span>{formatToTimeAgo(created_at.toString())}</span>
      </div>
    </Link>
  );
}
