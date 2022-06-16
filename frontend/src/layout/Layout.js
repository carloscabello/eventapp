import React, { useEffect, useState } from 'react'
// import { useColorModeValue, useToken } from 'native-base';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons'

import {
  Box,
  Center,
  CloseIcon,
  Divider,
  HamburgerIcon,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
  useColorModeValue,
  useBreakpointValue,
  useToken,
} from 'native-base'

import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'

import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const [lightBg, darkBg] = useToken('colors', ['coolGray.50', 'blueGray.900'], 'blueGray.900')
  const bgColor = useColorModeValue(lightBg, darkBg)
  const isTablet = useBreakpointValue({
    base: false,
    md: true,
  })
  const [isSlideOpen, setSlideOpen] = useState(false)

  return (
    <Box
      w="100%"
      h="100vh"
      justifyContent="space-between"
      _light={{
        bg: 'coolGray.50',
      }}
      _dark={{
        bg: 'blueGray.900',
      }}
      _web={
        {
          overflowX: 'hidden',
        }
      }>
      <Box>
        <Navbar />
        <Outlet />
      </Box>
      <Box w="100%">
        <Footer />
      </Box>
    </Box>
  )
}
