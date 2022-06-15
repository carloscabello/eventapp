import React from 'react'
import { View, Text } from 'react-native'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Box } from 'native-base'

export default function TicketClassList() {
  const navigate = useNavigate()
  const params = useParams()
  const {eventId} = params
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Event Tickets. Id: {eventId}</Text>
    </View>
  )
}
