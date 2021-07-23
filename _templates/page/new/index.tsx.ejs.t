---
to: app/pages/<%= h.changeCase.lower(name) %>/index.tsx
---
import React from 'react'

import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const <%= name %>: BlitzPage = () => {
    return (
    <div>
      <h2>{'<%= name %>'}</h2>
      <p>{'Find me in /app/core/page/<%= name %>/index.tsx'}</p>
    </div>
  )
}

<%= name %>.suppressFirstRenderFlicker = true
<%= name %>.getLayout = (page) => <Layout title="<%= name %>">{page}</Layout>

export default <%= name %>
