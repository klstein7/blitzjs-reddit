import { BlitzPage, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Box, Center, CircularProgress } from "@chakra-ui/react"
import getPosts from "app/posts/queries/getPosts"
import { Post } from "db"
import { ReactNode, Suspense } from "react"
import PostList from "app/core/components/PostList/PostList"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  const [posts] = useQuery(getPosts, undefined)

  return <PostList posts={posts} />
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
