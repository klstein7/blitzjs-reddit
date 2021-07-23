import { Box, Stack, Text } from "@chakra-ui/react"
import getRootCommentsForPost from "app/comments/queries/getRootCommentsForPost"
import { useQuery } from "blitz"
import React from "react"
import Comment from "../Comment/Comment"

type Props = {
  postId: string
}

const CommentList: React.FC<Props> = ({ postId }: Props) => {
  const [comments] = useQuery(getRootCommentsForPost, { postId })

  if (comments.length === 0) {
    return (
      <Box pt={3} pb={1}>
        <Text fontSize="sm" color="gray.300">
          No comments to show yet! Be the first to comment!
        </Text>
      </Box>
    )
  }

  return (
    <Stack direction="column">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Stack>
  )
}

export default CommentList
