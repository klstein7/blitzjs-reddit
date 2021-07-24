import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  IconButton,
} from "@chakra-ui/react"
import deleteComment from "app/comments/mutations/deleteComment"
import getRepliesForComment from "app/comments/queries/getRepliesForComment"
import getRootCommentsForPost from "app/comments/queries/getRootCommentsForPost"
import { invalidateQuery, useMutation, useQuery } from "blitz"
import React, { useState } from "react"
import { FaTrash } from "react-icons/fa"

type Props = {
  commentId: string
  parentId: string | null
  postId: string
}

const DeleteCommentAlertDialog: React.FC<Props> = ({ commentId, parentId, postId }: Props) => {
  const [deleteCommentMutation] = useMutation(deleteComment)
  const [replies] = useQuery(getRepliesForComment, { parentId })

  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  const [loading, setLoading] = useState(false)

  return (
    <>
      <Button size="xs" variant="unstyled" onClick={() => setIsOpen(true)}>
        Delete
      </Button>
      {/* @ts-ignore */}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Comment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              {/* @ts-ignore */}
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                bg="blue.700"
                color="white"
                ml={3}
                isLoading={loading}
                isDisabled={loading}
                onClick={async () => {
                  setLoading(true)
                  await deleteCommentMutation({ commentId })
                  if (!parentId) {
                    await invalidateQuery(getRootCommentsForPost, { postId })
                  } else {
                    await invalidateQuery(getRepliesForComment, { parentId })
                  }
                  setLoading(false)
                  onClose()
                }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteCommentAlertDialog
