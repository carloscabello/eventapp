import React from 'react'
import {
  NativeBaseProvider,
  extendTheme,
} from 'native-base'
import { BrowserRouter } from 'react-router-dom'
import RootRouter from './src/routers/RootRouter'

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
