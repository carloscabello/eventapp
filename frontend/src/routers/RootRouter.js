import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../layout/Layout'
import EventsList from '../pages/events/EventsList'
import EventDetailedScreen from '../pages/events/EventDetailedScreen'
import TicketClassList from '../pages/ticketsClasses/TicketClassList'

export default function RootRouter() {
  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route index element={<EventsList />} />
        <Route exact path="event/:eventId" element={<EventDetailedScreen />} />
        <Route exact path="event/:eventId/tickets" element={<TicketClassList />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  )
}
