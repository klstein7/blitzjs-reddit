---
to: app/core/components/<%= name %>/<%= name %>.tsx
---
import React from 'react'

type Props = {}

const <%= name %>: React.FC<Props> = (props) => {
    return (
    <div>
      <h2>{'<%= name %>'}</h2>
      <p>{'Find me in /app/core/components/<%= name %>/<%= name %>.tsx'}</p>
    </div>
  )
}

export default <%= name %>
