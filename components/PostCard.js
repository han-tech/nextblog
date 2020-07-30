import React from 'react'
import { FaCalendar } from 'react-icons/fa'
import { FaTag } from 'react-icons/fa'
import { FaList } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { Box, Heading, Text, Image, Stack } from "@chakra-ui/core"
import Link from 'next/link'

const PostCard = ({ post, index, language }) => (
    <Box key={index} m={1} maxW="600px">
        <Link href={'/' + post.full_slug}>
            <a>
                <Box>
                <Image src={post.image} />
                </Box>
                <Box>
                <Heading>
                    {post.name}
                </Heading>
                <Text>
                    {post.intro}
                </Text>
                </Box>
            </a>
        </Link>
        <Stack isInline={true}>
            {/* <Stack isInline={true}><FaCalendar size={18} /><span> {new Intl.DateTimeFormat("en-GB", {month: "long",day: "2-digit"}).format(new Date(post.published_at))} </span></Stack> */}
            {post.author && (
            <Stack isInline={true}><FaUser size={18} /> <a href={`/${language}/authors/${post.author.slug}`}> {post.author.name} </a> </Stack>
            )} 
            {post.category && (
            <Stack isInline={true}><FaList size={18} /> <a href={`/${language}/categories/${post.category.slug}`}> {post.category.name} </a> </Stack>
            )}
            {post.tag_list && (<Stack isInline={true}><FaTag size={18} /> 
            {post.tag_list.map((tag) => {
                return (
                <Stack isInline={true}>
                    <Link href={`/${language}/tags/` + tag}>
                    <a> {tag} </a>
                    </Link>                    
                </Stack>
                )}
            )}</Stack>
        )} 
        </Stack>
    </Box>
)

export default PostCard