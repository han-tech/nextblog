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
  constructor(props) {
    super(props)
    
    this.state = {
      pageContent: props.page.data.story.content,
      language:props.language
    }
  }

  static async getInitialProps({ asPath, query }) {
    StoryblokService.setQuery(query)

    let page = await StoryblokService.get(`cdn/stories${asPath}`);
    let [blogPosts,settings,language] = await Promise.all([StoryblokService.get('cdn/stories', {
        version: 'draft', 
        resolve_relations: 'author,category',
        starts_with: `${query.language}/blog`,
        'filter_query[category][in]': page.data.story.uuid 
      }),
      StoryblokService.get(`cdn/stories/${query.language}/settings`),
      query.language
    ])
    return {
      page,
      blogPosts,
      settings,
      language
    }
  }

  componentDidMount() {
    StoryblokService.initEditor(this)
  }

  body() {
    let rawMarkup = marked(this.state.pageContent.body)
    return { __html:  rawMarkup}
  }

  render() {
    const { pageContent, language} = this.state
    const { blogPosts } = this.props
    const settingsContent = this.props.settings.data.story

    return (
      <Layout settings={settingsContent}>
        <SbEditable content={pageContent}>
          <div className="blog">
            <h1>{pageContent.name}</h1>
          </div>
        </SbEditable>
        <div  className="posts">
          <h2>Posts</h2>
        </div>
        {blogPosts.data.stories.map((blogPost, index) => {
            const { published_at, content: { name, intro, image, author, category }} = blogPost
            
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
                      <span><FaTag size={18} /> <a href={`/${language}/categories/${category.slug}`}>{category.name}</a> </span>
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
          .posts {
            padding: 0 10px;
            max-width: 600px;
            margin: 10px auto 10px;
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