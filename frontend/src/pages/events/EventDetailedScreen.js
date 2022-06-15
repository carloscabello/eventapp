import React from 'react'
import { Text } from 'react-native'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Box, VStack, Image } from 'native-base'
import { getDetail } from '../../api/eventappMock'

export default function EventDetailedScreen() {
  const navigate = useNavigate()
  const params = useParams()
  const event = getDetail(params.eventId)

  return (
    <Box>
      <VStack w="100%" h={300}>
        <Image
          //position="absolute"
          zIndex="-1"
          source={{
            uri: event.imageUri,
          }}
          alt="Alternate Text"
          w="100%"
          h={300}
        />
      </VStack>
      <VStack>
        <Text>Event details. Id: {event.id}</Text>
        <Link to={`/event/${event.id}/tickets`}>
          <Text size="sm">Event Tickets</Text>
        </Link>
      </VStack>
    </Box>
  )
}
