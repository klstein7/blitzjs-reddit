import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  FormControl,
  Input,
  FormErrorMessage,
  Stack,
  Textarea,
  Flex,
  Text,
} from "@chakra-ui/react"
import createComment from "app/comments/mutations/createComment"
import getRepliesForComment from "app/comments/queries/getRepliesForComment"
import getCommentsForPost from "app/comments/queries/getRootCommentsForPost"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createPost from "app/posts/mutations/createPost"
import getPosts from "app/posts/queries/getPosts"
import { invalidateQuery, useMutation } from "blitz"
import { Field, Form, Formik } from "formik"
import React from "react"
import { FaPlusSquare } from "react-icons/fa"

type Props = {
  postId: string
  parentId: string | undefined
}

const AddCommentModal: React.FC<Props> = ({ postId, parentId = undefined }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useCurrentUser()
  const [createCommentMutation] = useMutation(createComment)

  const handleOnSubmit = async (values, { resetForm }) => {
    await createCommentMutation({ ...values, postId, parentId })
    if (!parentId) {
      await invalidateQuery(getCommentsForPost, { postId })
    } else {
      await invalidateQuery(getRepliesForComment, { parentId })
    }
    resetForm()
    onClose()
  }

  return (
    <>
      {!parentId ? (
        <Button size="sm" variant="unstyled" isDisabled={!currentUser} onClick={onOpen}>
          <Stack direction="row" align="center">
            <FaPlusSquare />
            <Text>Comment</Text>
          </Stack>
        </Button>
      ) : (
        <Button
          color="gray.300"
          size="xs"
          variant="unstyled"
          isDisabled={!currentUser}
          mt={2}
          onClick={onOpen}
        >
          Reply
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box pb={2}>
              <Formik
                initialValues={{ body: "" }}
                validate={(values) => {
                  const errors: Partial<{ body: string }> = {}
                  if (values.body.trim().length === 0) {
                    errors.body = "Required"
                  }
                  return errors
                }}
                onSubmit={handleOnSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Stack>
                      <Field name="body">
                        {({ form, field }) => (
                          <FormControl isInvalid={form.touched.body && form.errors.body}>
                            <Textarea
                              id="body"
                              placeholder="Enter post body here..."
                              {...field}
                              height="150"
                            />
                            <FormErrorMessage>{form.errors.body}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Flex justify="flex-end" pt={3}>
                        <Button color="white" bg="blue.700" type="submit">
                          Submit
                        </Button>
                      </Flex>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddCommentModal
