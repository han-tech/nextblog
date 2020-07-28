import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/layout'
import StoryblokService from '../../../utils/storyblok-service'

export default class extends React.Component {

  static async getInitialProps({ query }) {
    StoryblokService.setQuery(query)

    let [blogPosts,settings] = await Promise.all([StoryblokService.get('cdn/stories', {
        version: 'draft', 
        starts_with: `${query.language}/blog`,
        resolve_relations: 'author,category'
      }),
      StoryblokService.get(`cdn/stories/${query.language}/settings`)
    ])
    const categories = blogPosts.data.stories.reduce((catsSoFar, { content, full_slug }) => {
        if (!catsSoFar[content.category.name]) 
            catsSoFar[content.category.name] = [];
        catsSoFar[content.category.name].push({name: content.name, full_slug: full_slug, intro: content.intro});
        return catsSoFar;
      }, {});
    return {
      categories,
      settings
    }
  }

  render() {
    const { categories } = this.props
    const settingsContent = this.props.settings.data.story

    return (
      <Layout settings={settingsContent}>
        <div>
            <h2>All Posts</h2>
        </div>
        {categories && Object.keys(categories).map((category, index) => {
            var posts = categories[category];
            return (
                <div key={index}>
                    <h3>{category}</h3>
                    {posts && posts.map((post, index)=>{
                        return (
                        <div key={index} className="blog__overview">
                            <Link href={'/' + post.full_slug}>
                            <a className="blog__detail-link">
                                <div className="title">
                                    <h3>
                                        {post.name}
                                    </h3>
                                </div>
                                <div className="intro">
                                    {post.intro}
                                </div>
                            </a>
                            </Link>
                        </div>
                        )
                    })}
                </div>
            )
        })
        }
        <style jsx>{`
          .blog__overview {
            padding: 0 10px;
            max-width: 600px;
            margin: 10px auto 10px;
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
        `}</style>
      </Layout>
    )
  }
}