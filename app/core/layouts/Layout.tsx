import { ReactNode } from "react"
import { Head } from "blitz"
import { Box, Flex, Stack } from "@chakra-ui/react"
import Navbar from "../components/Navbar/Navbar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Stack direction="column">
      <Head>
        <title>{title || "redditish"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Flex justify="center">
        <Box maxWidth="7xl" w="100%">
          {children}
        </Box>
      </Flex>
    </Stack>
  )
}

export default Layout
