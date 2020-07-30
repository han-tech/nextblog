import React from 'react'
import Head from './head'
import Nav from './nav'
import StoryblokService from '../utils/storyblok-service'
import { Stack } from "@chakra-ui/core"
export default ({ children, settings = {} }) => (
  <>
    <Head />
    <Nav settings={settings} />
    <Stack m={5}>
      {children}
    </Stack>    
    {StoryblokService.bridge()}
  </>
)