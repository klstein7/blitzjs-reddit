import { Box, IconButton, Stack, Text } from "@chakra-ui/react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createVoteForPost from "app/votes/mutations/createVoteForPost"
import deleteVoteForPost from "app/votes/mutations/deleteVoteForPost"
import updateVoteForPost from "app/votes/mutations/updateVoteForPost"
import getVoteCountForPost from "app/votes/queries/getVoteCountForPost"
import getVoteForPostAndUser from "app/votes/queries/getVoteForPostAndUser"
import { useMutation, useQuery } from "blitz"
import React from "react"
import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

type Props = {
  postId: string
}

const PostVotes: React.FC<Props> = ({ postId }: Props) => {
  const [loading, setLoading] = useState(false)
  const currentUser = useCurrentUser()
  const [voteCount, { refetch: voteCountRefresh }] = useQuery(getVoteCountForPost, { postId })
  const [userVote, { refetch: userVoteRefetch }] = useQuery(getVoteForPostAndUser, { postId })

  const [createVoteForPostMutation] = useMutation(createVoteForPost)
  const [deleteVoteForPostMutation] = useMutation(deleteVoteForPost)
  const [updateVoteForPostMutation] = useMutation(updateVoteForPost)

  return (
    <Stack direction="column" maxW="10%" align="center" justify="center" px={2}>
      <IconButton
        isDisabled={loading || !currentUser}
        variant="ghost"
        aria-label="Upvote"
        size="xs"
        color={userVote?.type === "like" ? "red.300" : undefined}
        icon={<FaChevronUp />}
        onClick={async () => {
          setLoading(true)
          if (!userVote) {
            await createVoteForPostMutation({ type: "like", postId })
            await voteCountRefresh()
            await userVoteRefetch()
          } else if (userVote.type === "like") {
            await deleteVoteForPostMutation({ id: userVote.id })
            await voteCountRefresh()
            await userVoteRefetch()
          } else if (userVote.type === "dislike") {
            await updateVoteForPostMutation({ id: userVote.id, type: "like" })
            await voteCountRefresh()
            await userVoteRefetch()
          }
          setLoading(false)
        }}
      />
      <Text fontSize="sm" color="gray.300">
        {voteCount}
      </Text>
      <IconButton
        isDisabled={loading || !currentUser}
        variant="ghost"
        aria-label="Upvote"
        size="xs"
        color={userVote?.type === "dislike" ? "blue.300" : undefined}
        icon={<FaChevronDown />}
        onClick={async () => {
          setLoading(true)
          if (!userVote) {
            await createVoteForPostMutation({ type: "dislike", postId })
            await voteCountRefresh()
            await userVoteRefetch()
          } else if (userVote.type === "dislike") {
            await deleteVoteForPostMutation({ id: userVote.id })
            await voteCountRefresh()
            await userVoteRefetch()
          } else if (userVote.type === "like") {
            await updateVoteForPostMutation({ id: userVote.id, type: "dislike" })
            await voteCountRefresh()
            await userVoteRefetch()
          }
          setLoading(false)
        }}
      />
    </Stack>
  )
}

export default PostVotes
