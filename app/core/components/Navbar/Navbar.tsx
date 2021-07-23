import { Box, Button, Flex, Spacer, Stack, Text } from "@chakra-ui/react"
import { FaGithub, FaRedditAlien } from "react-icons/fa"
import React from "react"
import { Link, Routes, useMutation } from "blitz"
import CreatePostModal from "../CreatePostModal/CreatePostModal"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "../../../auth/mutations/logout"

type Props = {}

const Navbar: React.FC<Props> = (props) => {
  const [logoutMutation] = useMutation(logout)
  const currentUser = useCurrentUser()

  return (
    <Stack w="100%" direction="row" bg="gray.900" p={2} px={3} align="center">
      <Link href={Routes.Home()}>
        <Flex align="center" cursor="pointer">
          <FaRedditAlien size={20} />
          <Text fontWeight={600} fontSize="lg" ml={2}>
            redditish
          </Text>
        </Flex>
      </Link>
      <Spacer />
      <CreatePostModal />
      {!currentUser ? (
        <Link href="/api/auth/github">
          <Button size="sm" bg="purple.700" color="white" leftIcon={<FaGithub />}>
            Login
          </Button>
        </Link>
      ) : (
        <Button
          size="sm"
          bg="purple.700"
          color="white"
          leftIcon={<FaGithub />}
          onClick={async () => await logoutMutation()}
        >
          Logout
        </Button>
      )}
    </Stack>
  )
}

export default Navbar
