/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
    Badge
  } from 'native-base'

export default function ConditionalBadge(props) {
    const { isVisible, children } = props
    if (isVisible) {
      return (
        <Badge {...props}>
          {children}
        </Badge>
      )
    }
    return null
  }