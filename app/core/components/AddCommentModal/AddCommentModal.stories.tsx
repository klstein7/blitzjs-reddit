import React from 'react'
import AddCommentModal from './AddCommentModal'
import { Story, Meta } from '@storybook/react/types-6-0'

type Props = React.ComponentProps<typeof AddCommentModal>

const csf: Meta = {
  title: 'Components/AddCommentModal',
}

const Template: Story<Props> = (args) => <AddCommentModal {...args} />

export const c1 = Template.bind({})
c1.storyName = 'default'

export default csf
