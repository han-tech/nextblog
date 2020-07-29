import React from 'react'
import Head from './head'
import Nav from './nav'
import StoryblokService from '../utils/storyblok-service'
import { Flex } from "@chakra-ui/core"
export default ({ children, settings = {} }) => (
  <>
    <Head />
    <Nav settings={settings} />
    <Flex m={5}>
      {children}
    </Flex>    
    {StoryblokService.bridge()}
  </>
)