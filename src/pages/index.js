import React from "react"
import { Link, graphql } from "gatsby"

export default props => (
  <div>
    <h1>{props.data.site.siteMetadata.title}</h1>
    <p>{props.data.site.siteMetadata.description}</p>
    {props.data.site.siteMetadata.features.map(f => (
      <div key={f.id}>
        <h2>{f.name}</h2>
        <p>{f.description}</p>
      </div>
    ))}
    <Link to="/products">Check Our Products</Link>
  </div>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        features {
          id
          name
          description
        }
      }
    }
  }
`
