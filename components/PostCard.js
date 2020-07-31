import React, { Children } from 'react'
import { FaCalendar } from 'react-icons/fa'
import { FaTag } from 'react-icons/fa'
import { FaList } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { Box, Heading, Text, Image, Stack, Link } from "@chakra-ui/core"

const PostCard = ({ post, index, language, children }) => (
    <Stack key={index} p={4} m="0 auto" width="100%" maxW="768px">
        <Link href={'/' + post.full_slug}>
            <Box mb={4} >
                <Image width={736} objectFit="width" src={post.image}  fallbackSrc="https://via.placeholder.com/600"  />
            </Box>
            <Box mb={4}>
                <Heading mb={4}>
                    {post.name}
                </Heading>
                <Text>
                    {post.intro}
                </Text>
            </Box>
        </Link>
        <Stack isInline={true}>
            <Stack isInline={true}><FaCalendar size={18} /><Box pl={1}> {new Intl.DateTimeFormat("en-GB", {month: "long",day: "2-digit"}).format(new Date(post.published_at))} </Box></Stack>
            {post.author && (
            <Stack isInline={true}><FaUser size={18} /> <Link pl={1} href={`/${language}/authors/${post.author.slug}`}> {post.author.name} </Link> </Stack>
            )} 
            {post.category && (
            <Stack isInline={true}><FaList size={18} /> <Link pl={1} href={`/${language}/categories/${post.category.slug}`}> {post.category.name} </Link> </Stack>
            )}
            {post.tag_list && (<Stack isInline={true}><FaTag size={18} /> 
            {post.tag_list.map((tag, index) => {
                return (
                <Stack isInline={true} key={index}>
                    <Link pl={1} href={`/${language}/tags/` + tag}> {tag} </Link>                    
                </Stack>
                )}
            )}</Stack>
        )} 
        </Stack>
        {children}
    </Stack>
)

export default PostCard