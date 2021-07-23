import db from "db"
import { Ctx } from "blitz"

type CreateVoteForPost = {
  postId: string
  type: string
}

export default async function createVoteForPost({ type, postId }: CreateVoteForPost, ctx: Ctx) {
  ctx.session.$authorize()
  const vote = await db.vote.create({ data: { type, postId, userId: ctx.session.userId } })
  return vote
}
