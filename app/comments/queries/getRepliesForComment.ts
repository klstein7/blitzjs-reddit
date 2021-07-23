import db from "db"

type GetRepliesForComment = {
  parentId: string
}

export default async function getRepliesForComment({ parentId }: GetRepliesForComment) {
  return await db.comment.findMany({
    where: { parentId },
    include: { user: { select: { id: true, name: true, email: true } } },
  })
}
