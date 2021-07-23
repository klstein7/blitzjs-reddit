import React from "react"
import PostList from "./PostList"
import { Story, Meta } from "@storybook/react/types-6-0"

type Props = React.ComponentProps<typeof PostList>

const csf: Meta = {
  title: "Components/PostList",
}

const Template: Story<Props> = (args) => <PostList {...args} />

export const c1 = Template.bind({})
c1.storyName = "default"

export default csf
