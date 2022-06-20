import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  VStack,
} from 'native-base'
import { convertUTC2local } from '../helpers/DateConverter'
import ConditionalBadge from './ConditionalBadge'

export default function EventCard({ item, index }) {
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
        alt="Event image"
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
              <ConditionalBadge isVisible={item.isOnline} colorScheme="info" variant="solid">
                Online
              </ConditionalBadge>
            </HStack>
          </Box>
        </Box>
      </VStack>
    </Box>
  )
}
