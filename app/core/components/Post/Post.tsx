import { Box, Flex, Progress, Spacer, Stack, Text } from "@chakra-ui/react"
import { Link, Routes } from "blitz"
import { Post as PostType } from "db"
import React, { Suspense } from "react"
import { FaComment, FaCommentAlt, FaComments } from "react-icons/fa"
import PostVotes from "../PostVotes/PostVotes"

type Props = {
  post: PostType
}

const Post: React.FC<Props> = ({ post }: Props) => {
  console.log(post.createdAt)
  return (
    <Stack
      direction="row"
      border="1px"
      borderColor="gray.700"
      rounded="md"
      bg="gray.800"
      p={3}
      align="center"
    >
      <Suspense fallback={<Progress isIndeterminate />}>
        <PostVotes postId={post.id} />
      </Suspense>
      <Stack w="100%" direction="column">
        <Box>
          <Text fontSize="lg" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="sm" color="gray.400">
            {post.url}
          </Text>
        </Box>
        <Spacer />
        <Stack w="100%" direction="row" align="center">
          <Flex align="center">
            <FaCommentAlt size={10} />
            <Text fontSize="xs" color="gray.400" ml={2}>
              <Link href={Routes.PostDetail({ id: post.id })}>0 comments</Link>
            </Text>
          </Flex>
          <Spacer />
          <Flex align="center">
            <Text fontSize="xs" color="gray.300">
              Posted by {post.user.email}
            </Text>
            <Text fontSize="xs" color="gray.400" ml={1}>
              | {post.createdAt.toUTCString()}
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Post
