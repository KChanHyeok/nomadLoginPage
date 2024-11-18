import AddTweet from "@/components/add-tweet";
import TweetsList from "@/components/tweets-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getTweets() {
  const Tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      description: true,
      created_at: true,
    },
    take: 2,
    orderBy: {
      created_at: "asc",
    },
  });
  return Tweets;
}

export type initedTweets = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  const Tweets = await getTweets();
  return (
    <div>
      <AddTweet />
      <TweetsList initedTweets={Tweets} />
    </div>
  );
}
