import { Box, Button, Divider, Flex, IconButton, Stack, Text } from "@chakra-ui/react"
import getRepliesForComment from "app/comments/queries/getRepliesForComment"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useQuery } from "blitz"
import { Comment as CommentType } from "db"
import React from "react"
import { FaTrash } from "react-icons/fa"
import AddCommentModal from "../AddCommentModal/AddCommentModal"
import DeleteCommentAlertDialog from "../DeleteCommentAlertDialog/DeleteCommentAlertDialog"

type Props = {
  comment: CommentType & { user: { id: number; email: string; name: string | null } }
}

const Comment: React.FC<Props> = ({ comment }: Props) => {
  const currentUser = useCurrentUser()
  const [replies] = useQuery(getRepliesForComment, { parentId: comment.id })

  return (
    <Box p={3} mt={3} border="1px" borderColor="gray.700" rounded="md">
      <Stack direction="row" align="flex-end">
        <Text fontSize="sm" color="gray.300">
          {comment.user.email}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {comment.createdAt.toUTCString()}
        </Text>
      </Stack>
      <Divider />
      <Text mt={1}>{comment.body}</Text>
      <Stack direction="row" align="flex-end">
        <AddCommentModal postId={comment.postId} parentId={comment.id} />
        {currentUser?.id === comment.userId && (
          <DeleteCommentAlertDialog
            commentId={comment.id}
            parentId={comment.parentId}
            postId={comment.postId}
          />
        )}
      </Stack>
      {replies.map((reply) => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </Box>
  )
}

export default Comment
