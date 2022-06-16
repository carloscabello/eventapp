/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
    Badge, Hidden
  } from 'native-base'

export default function ConditionalBadge(props) {
    const { isVisible, children } = props
    if (isVisible) {
      return (
        // eslint-disable-next-line react-native/no-raw-text
        <Badge {...props}>
          {children}
        </Badge>
      )
    }
    return null
  }