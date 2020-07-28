import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/layout'
import StoryblokService from '../../../utils/storyblok-service'
import { FaCalendar } from 'react-icons/fa'
import { FaTag } from 'react-icons/fa'
import { FaList } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
export default class extends React.Component {

  static async getInitialProps({ query }) {
    StoryblokService.setQuery(query)

    let [blogPosts, settings, language] = await Promise.all([
      StoryblokService.get('cdn/stories', {
        starts_with: `${query.language}/blog`,
        resolve_relations: 'author,category'
      }),
      StoryblokService.get(`cdn/stories/${query.language}/settings`),
      query.language
    ])

    return {
      blogPosts,
      settings, 
      language
    }
  }

  render() {
    const settingsContent = this.props.settings.data.story
    const { blogPosts, language } = this.props

    return (
      <Layout settings={settingsContent}>
        {blogPosts.data.stories.map((blogPost, index) => {
            const { published_at, tag_list, content: { name, intro, image, author, category }} = blogPost
            
            return (
              <div key={index} className="blog__overview">
                <Link href={'/' + blogPost.full_slug}>
                  <a className="blog__detail-link">
                    <div className="image">
                      <img src={image} />
                    </div>
                    <div className="title">
                      <h2>
                        {name}
                      </h2>
                    </div>
                    <div className="intro">
                      {intro}
                    </div>
                  </a>
                </Link>
                <div className="info">
                    <span><FaCalendar size={18} /> {new Intl.DateTimeFormat("en-GB", {month: "long",day: "2-digit"}).format(new Date(published_at))} </span>
                    {author && (
                      <span><FaUser size={18} /> <a href={`/${language}/authors/${author.slug}`}>{author.name}</a> </span>
                    )} 
                    {category && (
                      <span><FaList size={18} /> <a href={`/${language}/categories/${category.slug}`}>{category.name}</a> </span>
                    )}
                    {tag_list && (<span><FaTag size={18} /> 
                      {tag_list.map((tag) => {
                        return (
                          <span>
                            <Link href={`/${language}/tags/` + tag}>
                              <a className="blog__detail-link"> {tag} </a>
                            </Link>                    
                          </span>
                        )}
                    )}</span>
                  )} 
                  </div>
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
          .info {
            padding: 10px 0;
          }
          .title {
            padding: 10px 0;
          }
          .image {
            padding: 10px 0;
          }
        `}</style>
      </Layout>
    )
  }
}