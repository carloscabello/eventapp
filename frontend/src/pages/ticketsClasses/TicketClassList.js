import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FlatList, Box, Heading, Text } from 'native-base'
import { getDetail, getTickets } from '../../api/eventappMock'
import TicketClassItem from '../../components/TicketClassItem'
import { convertUTC2local } from '../../helpers/DateConverter'

export default function TicketClassList() {
  const params = useParams()

  const event = getDetail(params.eventId)
  const ticketList = getTickets(params.eventId)
  return (
    <Box maxWidth={1080} alignSelf="center" alignContent="center">
      <Box paddingY={10} paddingX={5}>
        <Text color="#49475b" fontWeight="light" fontSize="xs">
          ID: {event.id} | {event.eventbriteId}
        </Text>
        <Link to={`/event/${event.id}`}>
          <Heading>{event.title}</Heading>
        </Link>
        <Text fontWeight="bold" color="#05a565">
          {convertUTC2local(event.startDate)}
        </Text>
      </Box>
      <Box>
        <FlatList
          data={ticketList}
          renderItem={TicketClassItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Box>
    </Box>
  )
}
