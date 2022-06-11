# Eventapp Endpoints

Endpoints available by the backend Eventapp API.

In the default `backend/.env.example` file, the backend app is deployed at port `3000`. 

```
APP_PORT=3000
```

So the base URL to send requests to the API would be the following if we are deploying at *localhost*: `http://localhost:3000`.

To check the application is properly running, we can send a request to the base url of the application:

```
[GET] http://localhost:3000/
```

We should receive the next response:

```html
Eventapp API. Check <a href="https://github.com/carloscabello/eventapp">Repository</a>
```

## Fetch

The *Fetch* endpoints **retrieve objects through the [Eventbrite API](https://www.eventbrite.com/platform/docs/introduction) and stores them in the database** for future use.

### Fetch all

Fetch all information for [Events](https://www.eventbrite.com/platform/api#/reference/event) already present in the database (including their [TicketClasses](https://www.eventbrite.com/platform/api#/reference/ticket-class)) and stores it in the database. This updates the date `retrievedAt` field.

For an *Event* to be fetched, at least the `event_id` from Eventbrite needs to be already known an stored.

```
[GET] /fetch/events
```

### Fetch new

Fetch all information for [Events](https://www.eventbrite.com/platform/api#/reference/event) that have not been fetched before (including their [TicketClasses](https://www.eventbrite.com/platform/api#/reference/ticket-class)) and stores it in the database. All the *Events* fetched would initially have *null* in their `retrievedAt` field but then the date would be updated.

If there is no event with *null* in their `retrievedAt` field, then no *Event* is fetched.

For an *Event* to be fetched, at least the `event_id` from Eventbrite needs to be known.

```
[GET] /fetch/events/new
```

### Fetch event

Fetch all information about an [Event](https://www.eventbrite.com/platform/api#/reference/event) (including their [TicketClasses](https://www.eventbrite.com/platform/api#/reference/ticket-class)) and stores it in the database. There is no need for the *Event* to exists in the database but the `event_id` corresponding to the Eventbrite ID should be correct.

The `event_id` could be either the Eventbrite ID or the internal database ID.

```
[GET] /fetch/events/{event_id}
```

## Events

### List

Lists all stored *Events*' information ordered by `startDate`. There is also two optional parameters to filter the list:

* `online`: *true*/*false* or *1*/*0*. If *true*, **only includes online *Events***.
* `physical`: *true*/*false* or *1*/*0*. If *true*, **only includes physical *Events***.

If no parameters are provided, it includes all events.

If both parameters are provided, both filters are applied using the `AND` operator. This means contradictory filters returns an empty list.

```
[GET] /events
[GET] /events?online=true
[GET] /events?physical=1
```

#### Response

```json
[
  {
    "id": 7,
    "eventbriteId": 362885629687,
    "retrievedAt": "2022-06-11T15:41:07.000Z",
    "title": "Online Language Exchange",
    "startDate": "2022-07-07T01:00:00.000Z",
    "endDate": "2022-07-07T03:00:00.000Z",
    "summary": "Fictional online event.",
    "description": "Fictional online event.",
    "imageUri": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F300674999%2F589915361613%2F1%2Foriginal.20220610-082527?auto=format%2Ccompress&q=75&sharp=10&s=c22ab6652421b052594b9edf66c7eef5",
    "status": "draft",
    "isOnline": true,
    "createdAt": "2022-06-10T08:50:43.000Z",
    "updatedAt": "2022-06-11T15:39:49.000Z"
  },
  {
    "id": 8,
    "eventbriteId": 362889611597,
    "retrievedAt": "2022-06-11T15:41:07.000Z",
    "title": "Online Minetest hangout",
    "startDate": "2022-07-24T02:00:00.000Z",
    "endDate": "2022-07-24T06:30:00.000Z",
    "summary": "Fictional online event.",
    "description": "Fictional online event.",
    "imageUri": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F300680809%2F589915361613%2F1%2Foriginal.20220610-083603?auto=format%2Ccompress&q=75&sharp=10&s=a9999ce9e6df7e5b58fa32409e7ad93f",
    "status": "draft",
    "isOnline": true,
    "createdAt": "2022-06-10T08:50:43.000Z",
    "updatedAt": "2022-06-11T15:39:49.000Z"
  },
]
```

### Get

Retrieve a single *Event*'s stored information with their corresponding list of *TicketClasses*. The *TicketClasses* are ordered by price descending.

The `event_id` could be either the Eventbrite ID or the internal database ID.

```
[GET] /events/{event_id}
```

#### Response

```json
{
  "id": 3,
  "eventbriteId": 358823900947,
  "retrievedAt": "2022-06-11T15:41:07.000Z",
  "title": "0 A.D. game tournament",
  "startDate": "2022-07-09T02:00:00.000Z",
  "endDate": "2022-07-09T05:00:00.000Z",
  "summary": "Fictional tournament  of A.D., the free and open-source real-time strategy video game. The tournament would take place in San Francisco.",
  "description": "Fictional tournament  of A.D., the free and open-source real-time strategy video game. The tournament would take place in San Francisco.",
  "imageUri": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F298060439%2F589915361613%2F1%2Foriginal.20220606-182907?auto=format%2Ccompress&q=75&sharp=10&s=1ed3fd8ff2cd6046c80feee951df7dc5",
  "status": "draft",
  "isOnline": false,
  "createdAt": "2022-06-10T08:50:43.000Z",
  "updatedAt": "2022-06-11T15:39:49.000Z",
  "ticketClasses": [
    {
      "id": 17,
      "eventbriteId": 618008459,
      "retrievedAt": "2022-06-11T15:41:08.000Z",
      "name": "Tournament participation",
      "description": null,
      "price": null,
      "currency": null,
      "quantityTotal": 20,
      "quantitySold": 0,
      "type": "free",
      "salesStartDate": "2022-06-06T07:00:00.000Z",
      "salesEndDate": "2022-07-09T02:00:00.000Z",
      "eventId": 3,
      "createdAt": "2022-06-10T09:25:29.000Z",
      "updatedAt": "2022-06-11T15:39:49.000Z",
      "EventId": 3
    }
  ]
}
```

## Tickets

The [Ticket Class](https://www.eventbrite.com/platform/api#/reference/ticket-class) represents a possible ticket class (i.e. ticket type) for an [Event](https://www.eventbrite.com/platform/api#/event_object). 

### List

 Lists all stored *TicketClasses* corressponding to a single event, ordered by price descending.

The `event_id` could be either the Eventbrite ID or the internal database ID.

```
[GET] /events/{event_id}/tickets
```

#### Response

```json
[
  {
    "id": 22,
    "eventbriteId": 617868499,
    "retrievedAt": "2022-06-11T15:41:08.000Z",
    "name": "Participation",
    "description": "Active participation in the gymkhana challenges.",
    "price": 5,
    "currency": "USD",
    "quantityTotal": 50,
    "quantitySold": 0,
    "type": "paid",
    "salesStartDate": "2022-06-06T17:07:25.000Z",
    "salesEndDate": "2022-07-02T02:00:00.000Z",
    "eventId": 1,
    "createdAt": "2022-06-10T09:25:29.000Z",
    "updatedAt": "2022-06-11T15:39:49.000Z",
    "EventId": 1
  },
  {
    "id": 23,
    "eventbriteId": 617870739,
    "retrievedAt": "2022-06-11T15:41:08.000Z",
    "name": "Spectator",
    "description": "Attend the event as an spectator. Seats will be available.",
    "price": 1.8,
    "currency": "USD",
    "quantityTotal": 100,
    "quantitySold": 0,
    "type": "paid",
    "salesStartDate": "2022-06-06T07:00:00.000Z",
    "salesEndDate": "2022-07-02T02:00:00.000Z",
    "eventId": 1,
    "createdAt": "2022-06-10T09:25:29.000Z",
    "updatedAt": "2022-06-11T15:39:49.000Z",
    "EventId": 1
  },
  {
    "id": 24,
    "eventbriteId": 617872149,
    "retrievedAt": "2022-06-11T15:41:08.000Z",
    "name": "Online",
    "description": "Watch the online streaming of the event.",
    "price": null,
    "currency": null,
    "quantityTotal": 1000,
    "quantitySold": 0,
    "type": "free",
    "salesStartDate": "2022-06-06T07:00:00.000Z",
    "salesEndDate": "2022-07-02T02:00:00.000Z",
    "eventId": 1,
    "createdAt": "2022-06-10T09:25:29.000Z",
    "updatedAt": "2022-06-11T15:39:49.000Z",
    "EventId": 1
  }
]
```