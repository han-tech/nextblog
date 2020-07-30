import React from 'react'
import Layout from '../../../components/layout'
import StoryblokService from '../../../utils/storyblok-service'
import SbEditable from 'storyblok-react'
import marked from 'marked'
import PostCard from '../../../components/PostCard'
import Bio from '../../../components/Bio'

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
    let [blogPosts, settings, language] = await Promise.all([StoryblokService.get('cdn/stories', {
        version: 'draft', 
        resolve_relations: 'author,category',
        starts_with: `${query.language}/blog`,
        'filter_query[author][in]': page.data.story.uuid 
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
          <Bio name={pageContent.name} title={pageContent.title} avatar={pageContent.avatar} bio={pageContent.bio} /> 
          {blogPosts.data.stories.map((blogPost, index) => {
              const { published_at, tag_list, full_slug, content: { name, intro, image, author, category }} = blogPost
              
              return (
                <PostCard key={index} post={{published_at:published_at, image:image, name:name, intro:intro, author:author, category:category, tag_list:tag_list, full_slug:full_slug}} index={index} language={language} />              
                )
              }
            )
          }
        </SbEditable>
      </Layout>
    )
  }
}