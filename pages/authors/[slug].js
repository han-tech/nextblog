import React from 'react'
import Layout from '../../components/layout'
import StoryblokService from '../../utils/storyblok-service'
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
      pageContent: props.page.data.story.content
    }
  }

  static async getInitialProps({ asPath, query }) {
    StoryblokService.setQuery(query)

    let page = await StoryblokService.get(`cdn/stories${asPath}`);
    let [englishBlogPosts,germanBlogPosts] = await Promise.all([StoryblokService.get('cdn/stories', {
        version: 'draft', 
        resolve_relations: 'author,category',
        starts_with: `en/blog`,
        'filter_query[author][in]': page.data.story.uuid 
      }),
      StoryblokService.get('cdn/stories', {
        version: 'draft', 
        resolve_relations: 'author,category',
        starts_with: `de/blog`,
        'filter_query[author][in]': page.data.story.uuid 
      })])
    var blogPosts = [].concat(englishBlogPosts.data.stories,germanBlogPosts.data.stories);
    return {
      page,
      blogPosts
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
    const { pageContent} = this.state
    const { blogPosts } = this.props

    return (
      <Layout>
        <SbEditable content={pageContent}>
          <div className="blog">
            <h1>{pageContent.name}</h1>
            <div className="title">
              {pageContent.title}
            </div>
            <div className="image">
              <img src={pageContent.avatar} />
            </div>
            <div className="bio">
              {pageContent.bio}
            </div>
          </div>
        </SbEditable>
        <div  className="posts">
          <h2>{pageContent.name}'s posts</h2>
        </div>
        {blogPosts.map((blogPost, index) => {
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
                      <span><FaUser size={18} /> <a href={`/authors/${author.slug}`}>{author.name}</a> </span>
                    )} 
                    {category && (
                      <span><FaTag size={18} /> <a href={`/categories/${category.slug}`}>{category.name}</a>  </span>
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