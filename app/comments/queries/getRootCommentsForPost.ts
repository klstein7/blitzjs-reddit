import db from "db"

type GetCommentsForPost = {
  postId: string
}

export default async function getCommentsForPost({ postId }: GetCommentsForPost) {
  return await db.comment.findMany({
    where: { postId, parent: null },
    include: { user: { select: { id: true, name: true, email: true } } },
  })
}
