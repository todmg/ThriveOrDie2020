import React from "react"
import { graphql } from "gatsby"
import HeroContainer from "./heroContainer"
import "../styles/layout.scss"
import "../styles/global.scss"
import HeaderMenu from "../components/headerMenu"
import ReleaseContainer from "../components/releaseContainer"
import InterviewContainer from "../components/interviewContainer"
import Footer from "../components/footerComponent"
import SeoComponent from "../components/seoComponent"

export default ({ data }) => {
  const post = data.artistsJson
  const postImg = data.allFile.edges[0].node.childImageSharp
  const releaseData = data.allReleasesJson.edges
  const interviewData = data.allMarkdownRemark.edges
  //console.log(post)
  //console.log(postImg)
  //console.log(releaseData)
  //console.log(interviewData)
  return (
    <div className="master-container">
      <SeoComponent isArtistPage={true} page={post.title} artistImg={postImg} artistObj={post} />
      <HeaderMenu></HeaderMenu>
      <div>
        <HeroContainer artistImg={postImg} artistObj={post}></HeroContainer>
      </div>
      <div className="releases-container">
        <h3>RELEASES</h3>
        <ReleaseContainer releasesData={releaseData} />
      </div>
      <div className="interviews-container">
        <h3>FEATURES & INTERVIEWS</h3>
        <InterviewContainer interviewData={interviewData} />
      </div>
      <Footer></Footer>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    artistsJson(fields: { slug: { eq: $slug } }) {
      bio
      title
      tags
      socials {
        email
        twitter
        soundcloud
        youtube
        bandcamp
        facebook
      }
      hometown
      artwork
    }
    allFile(
      filter: { name: { eq: $slug }, relativeDirectory: { eq: "artists" } }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(quality: 60) {
              src
              base64
              tracedSVG
            }
          }
          name
        }
      }
    }
    allReleasesJson(
      sort: { order: DESC, fields: date }
      filter: { tags: { eq: $slug } }
    ) {
      edges {
        node {
          artwork
          title
          artists
          date(formatString: "YYYY")
          id
          link
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: $slug } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            author
            artwork
            tags
          }
        }
      }
    }
  }
`
