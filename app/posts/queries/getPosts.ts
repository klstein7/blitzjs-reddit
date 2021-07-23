import db from "db"

export default async function getPosts() {
  return await db.post.findMany({
    include: { user: { select: { id: true, email: true, name: true } } },
  })
}
