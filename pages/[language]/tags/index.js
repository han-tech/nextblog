import React from 'react'
import Layout from '../../../components/layout'
import StoryblokService from '../../../utils/storyblok-service'
import SbEditable from 'storyblok-react'
import marked from 'marked'
import Link from 'next/link'
import { FaCalendar } from 'react-icons/fa'
import { FaTag } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'

export default class extends React.Component {  
  static async getInitialProps({ query }) {
    StoryblokService.setQuery(query)

    let [tags, settings, language] = await Promise.all([
      StoryblokService.get(`cdn/tags`, {
        starts_with: `${query.language}/blog`
      }),
      StoryblokService.get(`cdn/stories/${query.language}/settings`),
      query.language
    ])
    return {
      tags,
      settings,
      language
    }
  }

  componentDidMount() {
    StoryblokService.initEditor(this)
  }

  render() {
    const settingsContent = this.props.settings.data.story
    const { tags, language } = this.props

    return (
      <Layout settings={settingsContent}>
        <div  className="posts">
          <h2>Tags</h2>
        </div>
        {tags.data.tags && tags.data.tags.map((tag, index) => {
            const { name, taggings_count } = tag
            
            return (
              <div key={index} className="blog__overview">
                <Link href={`/${language}/tags/` + name}>
                  <a className="blog__detail-link">
                    <div className="title">
                      <h2>
                        {name} ({taggings_count})
                      </h2>
                    </div>
                  </a>
                </Link>
              </div>
              )
            }
          )
        }
        <style jsx>{`
          .blog__overview {
            padding: 0 20px;
            max-width: 600px;
            margin: 40px auto 60px;
          }
          .blog__overview :global(img) {
            width: 100%;
            height: auto;
          }
          .blog__overview p {
            line-height: 1.6;
          }

          .blog__detail-link {
            color: #000;
          }
          .posts {
            padding: 0 10px;
            max-width: 600px;
            margin: 10px auto 10px;
          }
          .count {
            padding: 10px 0;
          }
          .title {
            padding: 10px 0;
          }
          .image {
            padding: 10px 0;
          }
          .blog {
            padding: 0 20px;
            max-width: 600px;
            margin: 40px auto 100px;
          }
          .bio {
            padding: 10px 0;
          }
          .title {
            padding: 10px 0;
          }
          .image {
            padding: 10px 0;
          }
          .blog :global(img) {
            width: 100%;
            height: auto;
          }

          .blog__body {
            line-height: 1.6;
          }
        `}</style>
      </Layout>
    )
  }
}