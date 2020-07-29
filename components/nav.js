import Link from 'next/link'
import React from "react"
import { Box, Flex, Text, Image } from "@chakra-ui/core"

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);
const Nav = ({settings}) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
        {...settings}
      >     
        <Box m={2}>
          <Link href="/">
            <Image src="//a.storyblok.com/f/42016/1096x313/0353bf6654/logo2.png"  maxW='12em'/>
          </Link>
        </Box>
        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>
        <Box
          display={{ sm: show ? "block" : "none", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        >
          {settings && settings.content && settings.content.main_navi.map((navitem, index) =>
            <MenuItems key={index}>
              <Link href={navitem.link.cached_url}>
                <a>{navitem.name}</a>
              </Link>            
            </MenuItems>
          )}
        </Box>
        <Box
          display={{ sm: show ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <MenuItems>
            <Link href="/en/blog">
              <a>English</a>
            </Link>
          </MenuItems>
        </Box>    
        <Box
          display={{ sm: show ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <MenuItems>
            <Link href="/de/blog">
              <a>German</a>
            </Link>
          </MenuItems>
        </Box>        
    </Flex>
  )
}
export default Nav