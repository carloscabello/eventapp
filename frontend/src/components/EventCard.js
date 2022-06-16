import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import  {StyleSheet} from 'react-native'
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Stack,
  Button,
  Badge,
  ZStack,
  VStack,
  Pressable
} from 'native-base'
import { convertUTC2local } from '../helpers/DateConverter'

export default function eventCard({ item, index }) {
  return (
    <Box
      shadow={4}
      mx={{ base: 'auto', md: 0 }}
      width={{ base: '49%', md: '22%' }}
      // w="100%"
    >
      <Image
        height={130}
        source={{
          uri: item.imageUri,
        }}
        alt="NativeBase Card"
        style={{ aspectRatio: 2 / 1 }}
      />

      <VStack>
        <Box height={230} justifyContent="space-between">
          <Box>
            <VStack padding={4} space={3}>
              <Link to={`/event/${item.id}`}>
                <Heading size="sm">{item.title}</Heading>
              </Link>
              <Text fontWeight="bold" color="#05a565">
                {convertUTC2local(item.startDate)}
              </Text>
              <Text height={45}>
                {item.summary.substring(0, 79).concat(item.summary.length > 80 ? '...' : '')}
              </Text>
            </VStack>
          </Box>

          <Box padding={4} space={3} alignItems="end">
            <HStack>
              <ConditionalOnlineBadge isEventOnline={item.isOnline} />
            </HStack>
          </Box>
        </Box>
      </VStack>
    </Box>
  )
}

function ConditionalOnlineBadge(props) {
  const { isEventOnline } = props
  if (isEventOnline) {
    return (
      // eslint-disable-next-line react-native/no-raw-text
      <Badge colorScheme="info" variant="solid">
        Online
      </Badge>
    )
  }
  return null
}
