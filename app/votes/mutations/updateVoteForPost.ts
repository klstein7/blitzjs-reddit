import db from "db"

type UpdateVotForPost = {
  id: string
  type: string
}

export default async function updateVoteForPost({ id, type }: UpdateVotForPost) {
  await db.vote.update({ where: { id }, data: { type } })
}
