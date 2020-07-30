import React from 'react'
import Layout from '../../../components/layout'
import StoryblokService from '../../../utils/storyblok-service'
import Link from 'next/link'
import { Box, Stack, Heading } from '@chakra-ui/core'

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
        <Stack>
          <Heading>Tags</Heading>
          {tags.data.tags && tags.data.tags.map((tag, index) => {
              const { name, taggings_count } = tag
              
              return (
                <Box m={2}>
                  <Link href={`/${language}/tags/` + name}>
                    <a className="blog__detail-link">
                      <Box>
                        <Heading>
                          {name} ({taggings_count})
                        </Heading>
                      </Box>
                    </a>
                  </Link>
                </Box>
                )
              }
            )
          }
       </Stack>
      </Layout>
    )
  }
}