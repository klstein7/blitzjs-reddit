import React from "react"
import PostVotes from "./PostVotes"
import { Story, Meta } from "@storybook/react/types-6-0"

type Props = React.ComponentProps<typeof PostVotes>

const csf: Meta = {
  title: "Components/PostVotes",
}

const Template: Story<Props> = (args) => <PostVotes {...args} />

export const c1 = Template.bind({})
c1.storyName = "default"

export default csf
