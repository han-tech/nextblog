import SbEditable from 'storyblok-react'
import { Flex, Box } from "@chakra-ui/core"
const Field = ({blok}) => {
  const resizedIcon = function(iconImage) {
    if (typeof iconImage !== 'undefined') {
      return iconImage.replace('//img2.storyblok.com/80x80', '//a.storyblok.com')
    }
    return null
  }

  return (
    <SbEditable content={blok}>
      <Flex>
        <Heading>{blok.name}</Heading>
        <Box>
          {blok.type}
        </Box>
      </Flex>
    </SbEditable>
  )
}

export default Field