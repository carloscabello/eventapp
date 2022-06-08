# Eventapp

*Eventapp* is a simple events web application. The _backend_ was built with [Node.js](https://nodejs.org/en/about/) using [Sequelize](https://sequelize.org/docs/v6/) and the [Express.js framework](https://expressjs.com/). The _frontend_ was built using the [React Native](https://reactnative.dev/docs/getting-started) framework. The application also connects to the [Eventbrite API](https://www.eventbrite.com/platform/api). 

The main goal of the app is to **list events in San Francisco, USA**.

Events are created previously at [Eventbrite](https://www.eventbrite.com/), then their corresponding IDs are stored. The events' information, including its tickets, is then retrived through the Eventbrite API and stored on a database. Then, all of this is presented to the user from the app *frontend*.

## Overview

### Requirements

#### FR1: Event listing

Unauthenticated users will be able to list of *Events* in San Francisco ordered by date.

#### FR2: Event filtering

Unauthenticated users will be able to filter *Events*, specifying if the want to include *physical* or *online* events. These should be implemented as two separate filters.

#### FR3: Event details

Unauthenticated users will be able to display information from an individual *Event* in a separate page. It should include a button to a *Tickets* page. It should include the following information:

* Image/Background
* Title
* Description
* Date

#### FR4: Tickets listing

Unauthenticated users will be able to list of *Tickets* associated to an event, show only free and paid tickets. with the following information:

* Name
* Price and currency (sorted descending)
* Description
* Ticket Status: Available or Sold Out

### Proposed architecture

The following general architecture is proposed:

1. **Client-server architecture**.
2. **Frontend** and **backend** independent developments.

#### Backend

1. **Mariadb** server is used as for the relational database server.
2. **Sequelize** is used as the object–relational mapping tool
3. **Node.js** application that exposes a RESTful API implemented in the **Express.js** framework.

#### Frontend

**React-native** based client to display interact with the application.

### Class diagram

```mermaid
classDiagram

class Event{
    String eventbriteId
    Date lastRetrievedAt
    
    String title
    Date startDate
    Date endDate
    String summary
    String description
    String imageUri
    EventStatus status
    Boolean isOnline
    }
    
 class TicketClass{
    String eventbriteId
    Date lastRetrieved
    
    String name
    String description
    Double price
    String currency
    Integer quantityTotal
    Integer quantitySold
    TicketType type
    Date salesStartDate
    Date salesEndDate
    / isSoldOut()
    }
    
Event "1" -- "*" TicketClass

class EventStatus{
    <<enumeration>>
    DRAFT
    LIVE
    STARTED
    ENDED
    COMPLETED
    CANCELED
}

class TicketType{
    <<enumeration>>
    PAID
    FREE
    DONATION
}
```

#### Sample events

These events' IDs are included in the `backend/seeders/202206071228-events-seder.js` to initialize the database with some events. No additional information is initialized so it can be retrieved through the Evenbrite API.

| Event name                   | Evenbrite ID |
| ---------------------------- | ------------ |
| Software Engineers' Gymkhana | 358418879517 |
| Eventapp Hackathon           | 358734282897 |
| 0 A.D. game tournament       | 358823900947 |
| Full-stack workshop          | 358819748527 |
| Single ticket Event          | 358751544527 |
| Round table discussion       | 358830420447 |
