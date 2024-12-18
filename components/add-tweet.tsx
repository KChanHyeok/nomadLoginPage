"use client";

import { useFormState } from "react-dom";
import { uploadTweet } from "../app/action";
import Input from "../components/input";
import Button from "../components/button";

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <div className="p-4">
      <form action={action} className="flex flex-col gap-4 p-5 rounded-3xl border">
        <Input name="tweet" placeholder="title" errors={state?.fieldErrors.tweet} />
        <Input name="description" placeholder="description" errors={state?.fieldErrors.description} />
        <Button text="게시하기" />
      </form>
    </div>
  );
}
