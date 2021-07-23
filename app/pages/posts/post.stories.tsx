import React from "react"
import PostDetail from "./[id]"
import { Story, Meta } from "@storybook/react/types-6-0"

type Props = React.ComponentProps<typeof PostDetail>

const csf: Meta = {
  title: "Pages/post",
}

const Template: Story<Props> = (args) => <PostDetail {...args} />

export const c1 = Template.bind({})
c1.storyName = "default"

export default csf
