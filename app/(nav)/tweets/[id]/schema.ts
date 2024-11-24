import { z } from "zod";

export const commentSchema = z.object({
  comment: z.string().min(1, "1자이상 필요"),
});

export type CommentType = z.infer<typeof commentSchema>;
