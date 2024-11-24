"use client";

import { uploadComment } from "@/app/(nav)/tweets/[id]/action";
import { initComment } from "@/app/(nav)/tweets/[id]/page";
import Comment from "@/components/comment";
import { useOptimistic, useRef } from "react";
import FormInput from "./input";
import { commentSchema } from "@/app/(nav)/tweets/[id]/schema";
import { useFormState } from "react-dom";

interface InitComment {
  initComment: initComment;
  tweetId: number;
}
[];

export default function CommentList({ initComment, tweetId }: InitComment) {
  const ref = useRef<HTMLFormElement>(null);
  const [state, reducerFn] = useOptimistic(initComment, (previousState: any[], payload) => {
    return [...previousState, ...[payload]];
  });
  const submitClick = async (prestate: any, formData: FormData) => {
    const data = {
      id: Number(0),
      comment: formData.get("comment"),
      created_at: new Date(),
    };

    const result = commentSchema.safeParse({ comment: data.comment });
    if (!result.success) {
      return result.error.flatten();
    }
    reducerFn(data);
    await uploadComment(formData, tweetId);
    ref.current?.reset();
  };

  const [status, action] = useFormState(submitClick, null);

  return (
    <div className="border-t mt-3 p-2 flex flex-col gap-4">
      <form ref={ref} action={action} className="flex flex-row w-full gap-3">
        <FormInput name="comment" type="text" errors={status?.fieldErrors.comment} />
        <button className="w-14 py-1 border rounded-xl hover:bg-neutral-400  hover:text-white transition-colors ">
          <span>게시</span>
        </button>
      </form>
      {state.map((comment) => {
        return <Comment key={comment.id} comment={comment.comment} created_at={comment.created_at} />;
      })}
    </div>
  );
}
