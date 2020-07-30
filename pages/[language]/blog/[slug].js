import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/layout'
import StoryblokService from '../../../utils/storyblok-service'
import SbEditable from 'storyblok-react'
import marked from 'marked'
import { Box, Heading, Stack } from "@chakra-ui/core"
import PostCard from '../../../components/PostCard'

export default class extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      pageContent: props.page.data.story.content,
      published_at:props.page.data.story.published_at,
      tag_list:props.page.data.story.tag_list,
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
    const { pageContent, published_at, language, tag_list, full_slug } = this.state

    return (
      <Layout settings={settingsContent}>
        <SbEditable content={pageContent}>
          <Stack>
            <PostCard post={{published_at:published_at, image:pageContent.image, name:pageContent.name, intro:pageContent.intro, author:pageContent.author, category:pageContent.category, tag_list:tag_list, full_slug:full_slug}} index={0} language={language} />
            <Box dangerouslySetInnerHTML={this.body()}></Box>
            <Box className="related_posts">
              <Heading>Related Posts</Heading>
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
            </Box>
          </Stack>
        </SbEditable>
      </Layout>
    )
  }
}