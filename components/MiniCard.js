import React from 'react'

import { Box, Heading, Text, Image, Flex, Link } from "@chakra-ui/core"

const MiniCard = ({ post, index }) => (
    <Flex key={index} p={4} width="100%" maxW="390px">
        <Link href={'/' + post.full_slug}>
            <Box mb={2} >
                <Image width={367} objectFit="width" src={post.content.image}  fallbackSrc="https://via.placeholder.com/600"  />
            </Box>
            <Box mb={2}>
                <Heading mb={2}>
                    {post.name}
                </Heading>
                <Text>
                    {post.content.intro}
                </Text>
            </Box>
        </Link>
    </Flex>
)

export default MiniCard