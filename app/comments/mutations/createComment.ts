import db from "db"
import { Ctx } from "blitz"

type CreateComment = {
  body: string
  postId: string
  parentId: string | undefined
}

export default async function createComment({ body, postId, parentId }: CreateComment, ctx: Ctx) {
  ctx.session.$authorize()
  const comment = await db.comment.create({
    data: { body, postId, parentId, userId: ctx.session.userId },
  })
  return comment
}
