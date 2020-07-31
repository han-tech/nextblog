import React from 'react'
import Layout from '../../../components/layout'
import StoryblokService from '../../../utils/storyblok-service'
import { Heading, Stack,Box,Text, Link } from '@chakra-ui/core'

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
        <Stack>
          <Heading>All Posts group by categories</Heading>
          {categories && Object.keys(categories).map((category, index) => {
            var posts = categories[category];
            return (
              <Stack key={index}>
                  <Heading>{category}</Heading>
                  {posts && posts.map((post, index)=>{
                      return (
                      <Box key={index} m={3}>
                          <Link href={'/' + post.full_slug}>
                            <Box>
                                <Heading>
                                  {post.name}
                                </Heading>
                                <Text>
                                  {post.intro}
                                </Text>
                            </Box>                                  
                          </Link>
                      </Box>
                      )
                  })}
              </Stack>
            )
          })
          }
        </Stack>
      </Layout>
    )
  }
}