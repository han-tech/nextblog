import SbEditable from 'storyblok-react'
import { Flex, Box } from "@chakra-ui/core"
const Field = ({blok}) => {
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