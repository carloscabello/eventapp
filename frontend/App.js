import React from 'react'
import {
  Text,
  HStack,
  Center,
  Heading,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  Switch,
  VStack,
  Box,
  View,
} from 'native-base'
import NativeBaseIcon from './src/components/NativeBaseIcon'
import { Platform } from 'react-native'
//import Layout from "./src/screens/Layout";
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import RootRouter from './src/routers/RootRouter'
import Layout from './src/layout/Layout'

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

// extend the theme
export const theme = extendTheme({ config })

export default function App() {
  return (
    <NativeBaseProvider>
      <BrowserRouter>
        <RootRouter />
      </BrowserRouter>
    </NativeBaseProvider>
  )
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
        aria-label={colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'}
      />
      <Text>Light</Text>
    </HStack>
  )
}
