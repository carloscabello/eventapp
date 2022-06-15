import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Center,
  Image,
  FlatList,
  Pressable,
  useBreakpointValue,
  VStack,
  Heading,
  Text,
  HStack,
  Stack,
  useColorModeValue,
} from 'native-base'
import eventCard from '../../components/EventCard'
import { getAll } from '../../api/eventappMock'
// const EventCard = require('../../components/EventCard')
// import {  FlatList } from 'react-native'
const events = getAll()

export default function EventsList() {
  // const [data, setdata] = useState(events)
  const noColumn = useBreakpointValue({
    base: 2,
    md: 4,
  })

  return (
    <FlatList
      data={events}
      // w="90%"
      // mx="4"
      // mt="8"
      numColumns={noColumn}
      renderItem={eventCard}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Box w="10" h="10" />}
      columnWrapperStyle={{
        justifyContent: 'space-evenly',
      }}
    />
  )
}
