import { Ctx } from "blitz"
import db from "db"

type DeleteComment = {
  commentId: string
}

export default async function deleteComment({ commentId }: DeleteComment, ctx: Ctx) {
  ctx.session.$authorize()

  const comment = await db.comment.findFirst({ where: { id: commentId } })

  if (ctx.session.userId === comment?.userId) {
    return await db.comment.update({
      where: { id: commentId },
      data: { body: "This comment was deleted." },
    })
  }
}
