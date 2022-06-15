import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, Image, Text, HStack, Stack, Button } from 'native-base'

export default function eventCard({ item, index }) {
  return (
    <Box
      shadow={4}
      mx={{ base: 'auto', md: 0 }}
      width={{ base: '49%', md: '22%' }}
      //w="100%"
    >
      <Image
        height={130}
        source={{
          uri: item.imageUri,
        }}
        alt="NativeBase Card"
        style={{ aspectRatio: 2/1 }}
      />
      <Stack height={230} p={4} space={3}>
        <Link to={`/event/${item.id}`}>
          <Heading size="sm">{item.title}</Heading>
        </Link>

        <Text>{item.summary}</Text>
        <HStack space={4}>
          <Button variant="ghost" colorScheme="blue" p={0} minH={0}>
            SHARE
          </Button>
          <Button variant="ghost" colorScheme="blue" p={0} minH={0}>
            LEARN MORE
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}
