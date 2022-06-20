import React, { useState } from 'react'
import { Text, Box, VStack, Heading, HStack } from 'native-base'
import ConditionalBadge from './ConditionalBadge'
import { convertUTC2local } from '../helpers/DateConverter'

export default function TicketClassItem({ item, index }) {
  return (
    <Box
      borderBottomWidth="1"
      width="100%"
      maxWidth={1080}
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      pl="4"
      pr="5"
      py="2">
      <HStack space={3}>
        <VStack paddingX="5" width="100%">
          <Heading
            size="sm"
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800"
            bold>
            {item.name}{' '}
            <ConditionalBadge
              isVisible={item.type === 'free'}
              colorScheme="success"
              variant="solid"
              fontSize="xs">
              Free
            </ConditionalBadge>
            <ConditionalBadge
              isVisible={item.type === 'paid'}
              colorScheme="warning"
              variant="subtle"
              fontSize="xs">
              Paid
            </ConditionalBadge>
          </Heading>
          <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              {item.description}
            </Text>

          <Text>
            {item.price ? 'Price: ' : ''}
            <Text bold>{item.price ? `${item.price} ${item.currency} ` : ''}</Text>(
            {item.quantitySold} from {item.quantityTotal} sold)
          </Text>
          <Text color="#49475b" fontWeight="light" fontSize="xs">
            Available from: {convertUTC2local(item.salesStartDate)}
          </Text>
          <Text color="#49475b" fontWeight="light" fontSize="xs">
            Available up to: {convertUTC2local(item.salesEndDate)}
          </Text>
        </VStack>
      </HStack>
    </Box>
  )
}
