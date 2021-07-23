import React from "react"
import Post from "./Post"
import { Story, Meta } from "@storybook/react/types-6-0"

type Props = React.ComponentProps<typeof Post>

const csf: Meta = {
  title: "Components/Post",
}

const Template: Story<Props> = (args) => <Post {...args} />

export const c1 = Template.bind({})
c1.storyName = "default"

export default csf
