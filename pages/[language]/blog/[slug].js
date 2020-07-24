import React from 'react'
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
      published_at:props.page.data.story.published_at
    }
  }

  static async getInitialProps({ asPath, query }) {
    StoryblokService.setQuery(query)

    let [page, settings] = await Promise.all([
      StoryblokService.get(`cdn/stories${asPath}`, { resolve_relations: 'authors,categories' }),
      StoryblokService.get(`cdn/stories/${query.language}/settings`)
    ])
    return {
      page,
      settings
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
    const { pageContent, published_at } = this.state

    return (
      <Layout settings={settingsContent}>
        <SbEditable content={pageContent}>
          <div className="blog">
            <h1>{pageContent.name}</h1>
            <div  className="row">
                <span><FaCalendar size={18} /> {new Intl.DateTimeFormat("en-GB", {month: "long", day: "2-digit"}).format(new Date(published_at))} </span>
                {pageContent.authors && (
                  <span><FaUser size={18} /> {pageContent.authors.map(function(elem){return elem.name;}).join(", ")} </span>
                )} 
                {pageContent.categories && (
                  <span><FaTag size={18} /> {pageContent.categories.map(function(elem){return elem.name;}).join(", ")} </span>
                )}
            </div>
            <div dangerouslySetInnerHTML={this.body()} className="blog__body"></div>
          </div>
        </SbEditable>
        <style jsx>{`
          .blog {
            padding: 0 20px;
            max-width: 600px;
            margin: 40px auto 100px;
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