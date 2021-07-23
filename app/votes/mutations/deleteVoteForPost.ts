import db from "db"
import { Ctx } from "blitz"

type DeleteVoteForPost = {
  id: string
}

export default async function deleteVoteForPost({ id }: DeleteVoteForPost, ctx: Ctx) {
  ctx.session.$authorize()
  const vote = await db.vote.delete({ where: { id } })
  return vote
}
