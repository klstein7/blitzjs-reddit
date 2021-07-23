import { Stack } from "@chakra-ui/react"
import { Post as PostType } from "db"
import React from "react"
import Post from "../Post/Post"

type Props = {
  posts: Array<PostType>
}

const PostList: React.FC<Props> = ({ posts }: Props) => {
  return (
    <Stack bg="gray.900" p={3}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Stack>
  )
}

export default PostList
