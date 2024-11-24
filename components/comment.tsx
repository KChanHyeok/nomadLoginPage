"use client";

import { formatToTimeAgo } from "@/lib/utils";

interface CommentProps {
  comment: string;
  created_at: Date;
}

export default function Comment({ comment, created_at }: CommentProps) {
  return (
    <div className="flex justify-between">
      <span>{comment}</span>
      <span>{formatToTimeAgo(created_at!.toString())}</span>
    </div>
  );
}
