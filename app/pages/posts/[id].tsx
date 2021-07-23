import React from "react"

import { BlitzPage, invokeWithMiddleware, useParams } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import { Post as PostType } from "db"
import { Box, Divider, Spacer, Stack, Text } from "@chakra-ui/react"
import Post from "app/core/components/Post/Post"
import CommentList from "app/core/components/CommentList/CommentList"
import AddCommentModal from "app/core/components/AddCommentModal/AddCommentModal"

export const getServerSideProps = async ({ params, req, res }) => {
  const post = await invokeWithMiddleware(getPost, { postId: params.id }, { req, res })
  console.log(post)
  return {
    props: {
      post,
    },
  }
}

type Props = {
  post: PostType & { _count: { comments: number } }
  children: React.ReactNode
}

const PostDetail: BlitzPage = ({ post }: Props) => {
  return (
    <Stack bg="gray.900" p={3}>
      <Post post={post} />
      <Box bg="gray.800" p={3}>
        <Stack direction="row">
          <Text>Comments</Text>
          <Spacer />
          <AddCommentModal postId={post.id} parentId={undefined} />
        </Stack>
        <Divider variant="dashed" />
        <CommentList postId={post.id} />
      </Box>
    </Stack>
  )
}

PostDetail.suppressFirstRenderFlicker = true
PostDetail.getLayout = (page) => <Layout title="Post Detail">{page}</Layout>

export default PostDetail
