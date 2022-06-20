/* eslint-disable react-native/no-raw-text */
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Text, Box, VStack, Hidden, Image, Heading, HStack, Button } from 'native-base'
import { getDetail } from '../../api/eventappMock'
import { convertUTC2local } from '../../helpers/DateConverter'
import ConditionalBadge from '../../components/ConditionalBadge'

export default function EventDetailedScreen() {
  const navigate = useNavigate()
  const params = useParams()
  const event = getDetail(params.eventId)

  return (
    <Box>
      <Box
        width="100%"
        maxWidth={1080}
        alignSelf="center"
        marginTop={{ base: 0, md: 35 }}
        backgroundColor="white"
        rounded={{ base: 'none', md: 'xl' }}
        shadow={{ base: 0, md: 4 }}>
        <VStack>
          <Box
            flexDirection={{ base: 'column', md: 'row' }}
            minHeight={{ base: 0, md: 360 }}
            width="100%">
            <Box width={{ md: 720 }}>
              <Image
                source={{
                  uri: event.imageUri,
                }}
                height={{ base: 32, md: '100%' }}
                roundedTopLeft={{ base: 'none', md: 'xl' }}
              />
            </Box>
            <Box
              backgroundColor="white"
              rounded={{ base: 'none', md: 'xl' }}
              flexShrink="1"
              width="100%">
              <Box p={3} space={2} minWidth={32} height="100%" justifyContent="space-between">
                <VStack space={3}>
                  <Text color="#49475b" fontWeight="light" fontSize="xs">
                    ID: {event.id} | {event.eventbriteId}
                  </Text>
                  <Heading size="md" color="#14080e">
                    {event.title}
                  </Heading>
                  <Text>
                    Starting: <Text fontWeight="bold">{convertUTC2local(event.startDate)}</Text>
                  </Text>
                  <Text>
                    Ending: <Text fontWeight="bold">{convertUTC2local(event.endDate)}</Text>
                  </Text>
                  <HStack space={3} alignSelf='center'>
                    <Button backgroundColor='#05a565' size='lg' onPress={() => navigate(`/event/${event.id}/tickets`)}>Tickets</Button>
                  </HStack>
                </VStack>
                <Box>
                  <HStack space={3}>
                    <ConditionalBadge isVisible={event.isOnline} colorScheme="info" variant="solid">
                      Online
                    </ConditionalBadge>
                    <ConditionalBadge isVisible={event.status === 'draft'} variant="subtle">
                      Draft
                    </ConditionalBadge>
                  </HStack>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box p={3} space={2} flexShrink="1">
            <Text fontWeight="medium" color="gray">
              {event.description}
            </Text>
          </Box>
        </VStack>
      </Box>
      <Hidden till="sm">
        <Box width="100%" h={300} zIndex={-1} position="absolute" top={0}>
          <Image
            zIndex="-1"
            source={{
              uri: event.imageUri,
            }}
            alt="Alternate Text"
            w="100%"
            h={300}
            blurRadius={6}
          />
        </Box>
      </Hidden>
    </Box>
  )
}
