import { Ctx } from "blitz"
import db from "db"

type Input = {
  postId: string
}

export default async function getVoteForPostAndUser({ postId }: Input, ctx: Ctx) {
  if (ctx.session.userId) {
    return await db.vote.findFirst({ where: { postId, userId: ctx.session.userId } })
  } else {
    return null
  }
}
