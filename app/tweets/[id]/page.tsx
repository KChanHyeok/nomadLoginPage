import db from "@/lib/db";
import { HeartIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";

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
    },
  });
  return tweet;
}

export default async function TweetsDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweets(id);
  return (
    <div className="p-4">
      <div className="min-h-screen bg-[#EFEFEF] rounded-3xl">
        <div className="flex flex-col gap-10 p-4   ">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-4xl">{tweet?.tweet}</span>
              <div className="flex flex-row items-center border border-opacity-20 h-7 p-0 border-black px-2 rounded-full gap-2">
                <HeartIcon className="size-5" />
                <span>0</span>
              </div>
            </div>
            <p className="text-sm">{tweet?.user.username}</p>
          </div>
        </div>
        <p className="border-t border-gray-300 p-3">{tweet?.description}</p>
      </div>
    </div>
  );
}
