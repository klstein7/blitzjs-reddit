import db from "db"

type GetPost = {
  postId: string
}

export default async function getPost({ postId }: GetPost) {
  return await db.post.findFirst({
    where: { id: postId },
    include: {
      user: { select: { id: true, email: true, name: true } },
      _count: { select: { comments: true } },
    },
  })
}
