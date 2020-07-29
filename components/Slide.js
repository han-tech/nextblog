import SbEditable from 'storyblok-react'
import { Box, Image } from "@chakra-ui/core"

const Slide = ({blok}) => {
  return (
    <SbEditable content={blok}>
      <Box>
        <Image src={blok.image} />
      </Box>
    </SbEditable>
  )
}

export default Slide