import React from 'react'
import { Box, Divider, HStack, Icon, Link, Text, VStack, Image, Pressable } from 'native-base'
import { Entypo, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons'

export default function Footer() {
  return (
    <Box bg="#49475b" py="5" w="100%" px={{ base: 2 }} mt="4" alignItems="center">
      <VStack w={{ base: '95%', md: '95%', lg: '80%', xl: '80%' }} maxWidth={1080}>
        <HStack
          mb={{ base: 5, md: 8 }}
          alignItems={{ base: 'flex-start', md: 'center' }}
          // justifyContent="space-between"
          flexDirection={{ base: 'column', md: 'row' }}>
          <Text color="lightgray" fontSize="20" fontWeight="bold">
            Eventapp
          </Text>
        </HStack>
        <HStack mr="16" flexDirection={{ base: 'column', lg: 'row' }} space="lg">
          <VStack width={{ base: '95%', md: '95%', lg: '60%', xl: '60%' }} space={2}>
            <Text color="white">
              Eventapp is a simple events web application. The main goal of the app is to list
              events in San Francisco, USA.
            </Text>
            <Text color="white">
              The backend was built with Node.js using Sequelize and the Express.js framework. The
              frontend was built using the React Native framework. The application also connects to
              the Eventbrite API.
            </Text>
          </VStack>
          <VStack width={{ base: '95%', md: '95%', lg: '40%', xl: '40%' }} space={2} py={{ base: '5', lg: '0', }}>
            <Text color="white">
              {/* eslint-disable-next-line react-native/no-raw-text */}
              <Icon as={MaterialIcons} name="code" color="white" /> with{' '}
              <Icon as={MaterialIcons} name="favorite" color="white" /> by{' '}
              <Link href="https://carloscabello.net/" isExternal>
                <Text underline>Carlos Manuel Cabello</Text>
              </Link>
            </Text>
            <Link href="https://github.com/carloscabello/eventapp" isExternal>
              <Text color="white" underline>
                Source code
              </Text>
            </Link>
          </VStack>
        </HStack>
        <Divider marginY="2" width="100%" bg="coolGray.400" />
        <HStack marginY="2">
          {/* eslint-disable-next-line react-native/no-raw-text */}
          <Text fontSize="xs" fontWeight="light" lineHeight="16" color="white">
            Eventapp code is licensed under the <Link href="https://creativecommons.org/publicdomain/zero/1.0/" isExternal><Text underline>Creative Commons Zero v1.0 Universal</Text></Link>.
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}
