import React from "react"
import Navbar from "./Navbar"
import { Story, Meta } from "@storybook/react/types-6-0"

type Props = React.ComponentProps<typeof Navbar>

const csf: Meta = {
  title: "Components/Navbar",
}

const Template: Story<Props> = (args) => <Navbar {...args} />

export const c1 = Template.bind({})
c1.storyName = "default"

export default csf
