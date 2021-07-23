import React from 'react'
import DeleteCommentAlertDialog from './DeleteCommentAlertDialog'
import { Story, Meta } from '@storybook/react/types-6-0'

type Props = React.ComponentProps<typeof DeleteCommentAlertDialog>

const csf: Meta = {
  title: 'Components/DeleteCommentAlertDialog',
}

const Template: Story<Props> = (args) => <DeleteCommentAlertDialog {...args} />

export const c1 = Template.bind({})
c1.storyName = 'default'

export default csf
