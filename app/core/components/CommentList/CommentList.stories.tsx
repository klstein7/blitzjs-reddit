import React from 'react'
import CommentList from './CommentList'
import { Story, Meta } from '@storybook/react/types-6-0'

type Props = React.ComponentProps<typeof CommentList>

const csf: Meta = {
  title: 'Components/CommentList',
}

const Template: Story<Props> = (args) => <CommentList {...args} />

export const c1 = Template.bind({})
c1.storyName = 'default'

export default csf
