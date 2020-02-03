import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import HeaderMenu from "../components/headerMenu"

export default ({ data }) => (
  <div className="master-container">
    <HeaderMenu></HeaderMenu>
    {/* consider using two layouts at this point */}
    <Layout>
      <div>Hello world!</div>
    </Layout>
  </div>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
