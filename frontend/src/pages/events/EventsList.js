import React, { useEffect, useState } from 'react'
import  {StyleSheet} from 'react-native'
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
import EventCard from '../../components/EventCard'
import { getAll } from '../../api/eventappMock'
// const EventCard = require('../../components/EventCard')
// import {  FlatList } from 'react-native'
const events = getAll()

export default function EventsList() {
  // const [data, setdata] = useState(events)
  const numColumns = useBreakpointValue({
    base: 2,
    md: 4
  })

  return (
    <Box maxWidth={1080} alignSelf="center" alignContent='center'>
      <FlatList
        data={events}
        numColumns={numColumns}
        key={numColumns}
        renderItem={EventCard}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={[styles.listColumn]}
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  listColumn: {
    // alignContent: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
  }
})
