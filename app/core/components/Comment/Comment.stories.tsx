import React from 'react'
import Comment from './Comment'
import { Story, Meta } from '@storybook/react/types-6-0'

type Props = React.ComponentProps<typeof Comment>

const csf: Meta = {
  title: 'Components/Comment',
}

const Template: Story<Props> = (args) => <Comment {...args} />

export const c1 = Template.bind({})
c1.storyName = 'default'

export default csf
