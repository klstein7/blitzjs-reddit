import React from "react"

import { BlitzPage, invokeWithMiddleware, useParams } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import { Post as PostType } from "db"
import { Box, Divider, Spacer, Stack, Text } from "@chakra-ui/react"
import Post from "app/core/components/Post/Post"

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
  post: PostType
  children: React.ReactNode
}

const PostDetail: BlitzPage = ({ post }: Props) => {
  console.log(post)
  return (
    <Stack bg="gray.900" p={3}>
      <Post post={post} />
      <Box bg="gray.800" p={3}>
        <Text>Comments</Text>
        <Divider variant="dashed" />
      </Box>
    </Stack>
  )
}

PostDetail.suppressFirstRenderFlicker = true
PostDetail.getLayout = (page) => <Layout title="Post Detail">{page}</Layout>

export default PostDetail
