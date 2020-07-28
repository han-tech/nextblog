import Teaser from './Teaser'
import Feature from './Feature'
import Grid from './Grid'
import Placeholder from './Placeholder'
import Slide from './Slide'
import Field from './Field'
import Form from './Form'

const Components = {
  'teaser': Teaser,
  'feature': Feature,
  'grid': Grid,
  'slide': Slide,
  'field': Field,
  'form': Form
}

const Component = ({blok}) => {
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    return <Component blok={blok}  key={blok._uid}/>
  }
  return <Placeholder componentName={blok.component}/>
}

export default Component