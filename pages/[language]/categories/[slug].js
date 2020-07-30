import React from 'react'
import Layout from '../../../components/layout'
import StoryblokService from '../../../utils/storyblok-service'
import SbEditable from 'storyblok-react'
import PostCard from '../../../components/PostCard'
import { Box, Stack, Heading, Text } from '@chakra-ui/core'

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

  render() {
    const { pageContent, language} = this.state
    const { blogPosts } = this.props
    const settingsContent = this.props.settings.data.story

    return (
      <Layout settings={settingsContent}>
        <SbEditable content={pageContent}>
          <Stack>
            <Box>
              <Heading>{pageContent.name}</Heading>
              <Text>{pageContent.description}</Text>
            </Box>
            <Heading>Posts in {pageContent.name}</Heading>
            {blogPosts.data.stories.map((blogPost, index) => {
              const { published_at, tag_list, full_slug, content: { name, intro, image, author, category }} = blogPost
              
              return (
                <PostCard key={index} post={{published_at:published_at, image:image, name:name, intro:intro, author:author, category:category, tag_list:tag_list, full_slug:full_slug}} index={index} language={language} />              
                )
              })
            }
          </Stack>
        </SbEditable>
      </Layout>
    )
  }
}