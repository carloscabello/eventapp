import React from 'react'
import { Box, Text, HStack, IconButton, Icon, StatusBar, Pressable, Button } from 'native-base'
import { Link, useNavigate } from 'react-router-dom'
import { MaterialIcons } from '@expo/vector-icons'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <Box marginBottom="2" shadow={5}>
      <HStack px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
        <HStack alignItems="center">
        <Button variant="unstyled" onPress={() => navigate('/')}>
        <Text color="#6200ee" fontSize="20" fontWeight="bold">
              Eventapp
            </Text>
        </Button>
        </HStack>
        <HStack>
          <IconButton icon={<Icon as={MaterialIcons} name="add" size="md" color="#6200ee" />} />
          <IconButton
            icon={<Icon as={MaterialIcons} name="favorite" size="md" color="#6200ee" />}
          />
          <IconButton
            icon={<Icon as={MaterialIcons} name="confirmation-number" size="md" color="#6200ee" />}
          />
          <IconButton
            icon={<Icon as={MaterialIcons} name="account-circle" size="md" color="#6200ee" />}
          />
        </HStack>
      </HStack>
    </Box>
  )
}
