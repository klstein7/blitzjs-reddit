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
} from "@chakra-ui/react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createPost from "app/posts/mutations/createPost"
import getPosts from "app/posts/queries/getPosts"
import { invalidateQuery, useMutation } from "blitz"
import { Field, Form, Formik } from "formik"
import React from "react"
import { useState } from "react"
import { FaPlusSquare } from "react-icons/fa"

type Props = {}

const CreatePostModal: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useCurrentUser()
  const [createPostMutation] = useMutation(createPost)
  const [loading, setLoading] = useState(false)

  const handleOnSubmit = async (values, { resetForm }) => {
    setLoading(true)
    await createPostMutation(values)
    await invalidateQuery(getPosts)
    resetForm()
    onClose()
    setLoading(false)
  }

  return (
    <>
      <Button
        size="sm"
        color="white"
        bg="blue.700"
        leftIcon={<FaPlusSquare />}
        isDisabled={!currentUser}
        onClick={onOpen}
      >
        Create Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box pb={2}>
              <Formik
                initialValues={{ title: "", url: "", body: "" }}
                validate={(values) => {
                  const errors: Partial<{ title: string; url: string; body: string }> = {}
                  if (values.title.trim().length === 0) {
                    errors.title = "Required"
                  }
                  return errors
                }}
                onSubmit={handleOnSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Stack>
                      <Field name="title">
                        {({ form, field }) => (
                          <FormControl isInvalid={form.touched.title && form.errors.title}>
                            <Input id="title" placeholder="Title" {...field} />
                            <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="url">
                        {({ form, field }) => (
                          <FormControl isInvalid={form.touched.url && form.errors.url}>
                            <Input id="url" placeholder="Url" {...field} />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="body">
                        {({ form, field }) => (
                          <FormControl isInvalid={form.touched.body && form.errors.body}>
                            <Textarea
                              id="body"
                              placeholder="Enter post body here..."
                              {...field}
                              height="150"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Flex justify="flex-end" pt={3}>
                        <Button
                          color="white"
                          bg="blue.700"
                          type="submit"
                          isLoading={loading}
                          isDisabled={!currentUser || loading}
                        >
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

export default CreatePostModal
