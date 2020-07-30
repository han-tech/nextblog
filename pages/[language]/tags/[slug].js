import React from 'react'
import Layout from '../../../components/layout'
import StoryblokService from '../../../utils/storyblok-service'
import PostCard from '../../../components/PostCard'
import { Stack, Heading } from '@chakra-ui/core'
export default class extends React.Component {
  static async getInitialProps({ asPath, query }) {
    StoryblokService.setQuery(query)
    console.log(asPath)
    let [blogPosts,settings, language, tag] = await Promise.all([StoryblokService.get('cdn/stories', {
        version: 'draft', 
        resolve_relations: 'author,category',
        starts_with: `${query.language}/blog`,
        with_tag: query.slug 
      }),
      StoryblokService.get(`cdn/stories/${query.language}/settings`),
      query.language,
      query.slug
    ])
    return {
      blogPosts,
      settings,
      language,
      tag
    }
  }

  componentDidMount() {
    StoryblokService.initEditor(this)
  }

  render() {
    const { blogPosts, language, tag } = this.props
    const settingsContent = this.props.settings.data.story

    return (
      <Layout settings={settingsContent}>
        <Stack>
          <Heading>Posts by {tag}</Heading>
          {blogPosts.data.stories.map((blogPost, index) => {
              const { published_at, tag_list, full_slug, content: { name, intro, image, author, category }} = blogPost
              
              return (
                <PostCard key={index} post={{published_at:published_at, image:image, name:name, intro:intro, author:author, category:category, tag_list:tag_list, full_slug:full_slug}} index={index} language={language} />              
                )
              }
            )
          }
        </Stack>
      </Layout>
    )
  }
}