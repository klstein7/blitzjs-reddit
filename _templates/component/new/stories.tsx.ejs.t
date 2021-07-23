---
to: app/core/components/<%= name %>/<%= name %>.stories.tsx
---
import React from 'react'
import <%= name %> from './<%= name %>'
import { Story, Meta } from '@storybook/react/types-6-0'

type Props = React.ComponentProps<typeof <%= name %>>

const csf: Meta = {
  title: 'Components/<%= name %>',
}

const Template: Story<Props> = (args) => <<%= name %> {...args} />

export const c1 = Template.bind({})
c1.storyName = 'default'

export default csf
