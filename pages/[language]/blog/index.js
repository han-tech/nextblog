import React from 'react'
import Layout from '../../../components/layout'
import StoryblokService from '../../../utils/storyblok-service'
import PostCard from '../../../components/PostCard'

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
            const { published_at, tag_list, full_slug, content: { name, intro, image, author, category }} = blogPost
            
            return (
              <PostCard key={index} post={{published_at:published_at, image:image, name:name, intro:intro, author:author, category:category, tag_list:tag_list, full_slug:full_slug}} index={index} language={language} />              
              )
            }
          )
        }       
      </Layout>
    )
  }
}