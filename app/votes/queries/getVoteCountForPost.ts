import db from "db"

type GetVotesForPost = {
  postId: string
}

export default async function getVotesForPost({ postId }: GetVotesForPost) {
  const likes = await db.vote.findMany({ where: { postId, type: "like" } })
  const dislikes = await db.vote.findMany({ where: { postId, type: "dislike" } })
  return likes.length - dislikes.length
}
