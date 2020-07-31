import React from 'react'
import Head from './head'
import Nav from './nav'
import StoryblokService from '../utils/storyblok-service'
import { Box } from "@chakra-ui/core"
export default ({ children, settings = {} }) => (
  <>
    <Head />
    <Nav settings={settings} />
    <Box alignItems="center" margin="auto" width={{ sm: 'full', md: '80em' }} minH="100vh">
      {children}
    </Box>    
    {StoryblokService.bridge()}
  </>
)