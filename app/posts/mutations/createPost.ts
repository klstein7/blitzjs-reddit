import db from "db"
import { Ctx } from "blitz"

type CreatePost = {
  title: string
  url: string | null
  body: string | null
}

export default async function createPost({ title, url, body }: CreatePost, ctx: Ctx) {
  ctx.session.$authorize()
  const post = await db.post.create({ data: { title, url, body, userId: ctx.session.userId } })
  return post
}
