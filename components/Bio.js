import React from 'react'
import { Heading, Text, Image, Stack } from "@chakra-ui/core"
import Link from 'next/link'

const Bio = ({ name, title, avatar, bio }) => (
    <Stack>
        <Heading>{name}</Heading>
        <Text>
            {title}
        </Text>
        <Image src={avatar} />
        <Text>
            {bio}
        </Text>
    </Stack>
)

export default Bio