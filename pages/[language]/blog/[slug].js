import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/layout'
import StoryblokService from '../../../utils/storyblok-service'
import SbEditable from 'storyblok-react'
import marked from 'marked'
import { FaCalendar } from 'react-icons/fa'
import { FaTag } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
export default class extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      pageContent: props.page.data.story.content,
      published_at:props.page.data.story.published_at,
      language:props.language
    }
  }

  static async getInitialProps({ asPath, query }) {
    StoryblokService.setQuery(query)

    let [page, settings, language] = await Promise.all([
      StoryblokService.get(`cdn/stories${asPath}`, { resolve_relations: 'author,category,related_posts' }),
      StoryblokService.get(`cdn/stories/${query.language}/settings`),
      query.language
    ])
    return {
      page,
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
    const settingsContent = this.props.settings.data.story
    const { pageContent, published_at, language } = this.state

    return (
      <Layout settings={settingsContent}>
        <SbEditable content={pageContent}>
          <div className="blog">
            <h1>{pageContent.name}</h1>
            <div className="info">
                <span><FaCalendar size={18} /> {new Intl.DateTimeFormat("en-GB", {month: "long", day: "2-digit"}).format(new Date(published_at))} </span>
                {pageContent.author && (
                  <span><FaUser size={18} /> <a href={`/${language}/authors/${pageContent.author.slug}`}>{pageContent.author.name}</a> </span>
                )} 
                {pageContent.category && (
                  <span><FaTag size={18} /> <a href={`/${language}/categories/${pageContent.category.slug}`}>{pageContent.category.name}</a> </span>
                )}
            </div>
            <div className="intro">
              {pageContent.intro}
            </div>
            <div className="image">
              <img src={pageContent.image} />
            </div>
            <div dangerouslySetInnerHTML={this.body()} className="blog__body"></div>
            <div className="related_posts">
              <h2>Related Posts</h2>
              {pageContent.related_posts && pageContent.related_posts.map((post) => {
                return (
                  <Link href={'/' + post.full_slug}>
                    <a className="blog__detail-link">
                      <div className="title">
                        <h3>
                          {post.name}
                        </h3>
                      </div>
                    </a>
                  </Link>                    
                )}
              )} 
            </div>
          </div>
        </SbEditable>
        <style jsx>{`
          .blog {
            padding: 0 20px;
            max-width: 600px;
            margin: 40px auto 100px;
          }
          .intro {
            padding: 10px 0;
          }
          .info {
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