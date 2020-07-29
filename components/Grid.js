import Component from './index'
import SbEditable from 'storyblok-react'
import { SimpleGrid } from "@chakra-ui/core"

const Grid = ({blok}) => (
  <SbEditable content={blok}>
    <SimpleGrid columns={3}  spacing={10}>
      {blok.columns.map((blok) =>
        <Component blok={blok} key={blok._uid}/>
      )}
    </SimpleGrid>
  </SbEditable>
)

export default Grid