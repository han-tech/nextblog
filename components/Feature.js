import SbEditable from 'storyblok-react'
import { Box, Stack, Image, Heading, Text } from "@chakra-ui/core"

const Feature = ({blok}) => {
  const resizedIcon = function(iconImage) {
    if (typeof iconImage !== 'undefined') {
      return iconImage.replace('//img2.storyblok.com/80x80', '//a.storyblok.com')
    }
    return null
  }

  return (
    <SbEditable content={blok}>
      <Stack align="center" justify="center" >
        <Box>
          <Image src={resizedIcon(blok.icon)} width="80px"></Image>
        </Box>
        <Box p={5} w="100%" textAlign="center">
          <Heading fontSize="xl">{blok.name}</Heading>
          <Text mt={4}>{blok.description}</Text>
        </Box>
      </Stack>
    </SbEditable>
  )
}

export default Feature