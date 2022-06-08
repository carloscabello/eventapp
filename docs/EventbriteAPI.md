# Eventbrite API reference

Relevant endpoints from the [Eventbrite API](https://www.eventbrite.com/platform/docs/introduction) for the Eventapp web application.

The [node-fetch](https://github.com/node-fetch/node-fetch/tree/2.x) module was used to send request to the EventbriteAPI.

## Events

The Event object represents an Eventbrite Event. An Event is owned by one [Organization](https://www.eventbrite.com/platform/api#/organization_object).

### Retrieve an Event

```
[GET] https://www.eventbriteapi.com/v3/events/event_id/
```

* `event_id`: Event ID from Eventbrite. It can be inferred from the Eventbrite event dashboard URL: `https://www.eventbrite.com/myevent?eid=event_id`.

Official documentation: [Retrieve an Event (Eventbrite API)](https://www.eventbrite.com/platform/api#/reference/event/retrieve/retrieve-an-event)

**Headers**

```
Authorization:Bearer PERSONAL_OAUTH_TOKEN
```

#### Response extract

```json
{
  "name": {
    "text": "Eventapp Hackathon",
    "html": "Eventapp Hackathon"
  },
  "description": {
    "text": "Fictional event taking place in San Francisco.",
    "html": "Fictional event taking place in San Francisco."
  },
  "url": "https://www.eventbrite.com/e/eventapp-hackathon-tickets-358734282897",
  "start": {
    "timezone": "America/Los_Angeles",
    "local": "2022-07-03T09:00:00",
    "utc": "2022-07-03T16:00:00Z"
  },
  "end": {
    "timezone": "America/Los_Angeles",
    "local": "2022-07-03T21:00:00",
    "utc": "2022-07-04T04:00:00Z"
  },
  "organization_id": "998521089203",
  "created": "2022-06-06T17:22:26Z",
  "changed": "2022-06-06T18:29:18Z",
  "capacity": 600,
  "status": "draft",
  "currency": "USD",
  "listed": true,
  "online_event": false,
  "is_free": false,
  "summary": "Fictional event taking place in San Francisco.",
  "logo_id": "298010109",
  "organizer_id": "48302143653",
  "id": "358734282897",
  "resource_uri": "https://www.eventbriteapi.com/v3/events/358734282897/",
  "logo": {
    "crop_mask": {
      "top_left": {
        "x": 0,
        "y": 0
      },
      "width": 1920,
      "height": 960
    },
    "original": {
      "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F298010109%2F589915361613%2F1%2Foriginal.20220606-172339?auto=format%2Ccompress&q=75&sharp=10&s=921016da0d367fbb9ceb2e19d756c7aa",
      "width": 1920,
      "height": 1271
    },
    "id": "298010109",
    "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F298010109%2F589915361613%2F1%2Foriginal.20220606-172339?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C1920%2C960&s=45eb332c819658814950ec8eb6f037b9",
    "aspect_ratio": "2",
    "edge_color": "#bab9ba",
    "edge_color_set": true
  }
}
```

## Ticket Classes

The Ticket Class object represents a possible ticket class (i.e. ticket type) for an [Event](https://www.eventbrite.com/platform/api#/event_object).

### List Ticket Classes by Event

```
[GET] https://www.eventbriteapi.com/v3/events/event_id/ticket_classes/
```

* `event_id`: Event ID from Eventbrite. It can be inferred from the Eventbrite event dashboard URL: `https://www.eventbrite.com/myevent?eid=event_id`.

Official documentation: [List Ticket Classes by Event (Eventbrite API)](https://www.eventbrite.com/platform/api#/reference/ticket-class/list/list-ticket-classes-by-event)

**Headers**

```
Authorization:Bearer PERSONAL_OAUTH_TOKEN
```

#### Response extract

```json
{
  "pagination": {
    "object_count": 3
  },
  "ticket_classes": [
    {
      "actual_cost": null,
      "actual_fee": {
        "display": "$1.90",
        "currency": "USD",
        "value": 190,
        "major_value": "1.90"
      },
      "cost": {
        "display": "$5.00",
        "currency": "USD",
        "value": 500,
        "major_value": "5.00"
      },
      "resource_uri": "https://www.eventbriteapi.com/v3/events/358418879517/ticket_classes/617868499/",
      "display_name": "Participation",
      "name": "Participation",
      "description": "Active participation in the gymkhana challenges.",
      "sorting": 1,
      "donation": false,
      "free": false,
      "minimum_quantity": 1,
      "maximum_quantity": 5,
      "on_sale_status": "AVAILABLE",
      "event_id": "358418879517",
      "id": "617868499",
      "capacity": 50,
      "quantity_total": 50,
      "quantity_sold": 0,
      "sales_start": "2022-06-06T17:07:25Z",
      "sales_end": "2022-07-02T02:00:00Z",
      "hidden": false,
      "hidden_currently": false,
      "include_fee": true,
    },
    {
        ...
    },
    ...
  ]
}
```

### Retrieve a Ticket Class

```
[GET] https://www.eventbriteapi.com/v3/events/event_id/ticket_classes/
```

* `event_id`: Event ID from Eventbrite. It can be inferred from the Eventbrite event dashboard URL: `https://www.eventbrite.com/myevent?eid=event_id`.
* `ticket_class_id`: Ticket Class ID from Eventbrite. It can be inferred from the Evenbrite event tickets dashboard URL: `https://www.eventbrite.com/manage/events/event_id/tickets/ticket_class_id`

Official documentation: [Retrieve a Ticket Class (Eventbrite API)](https://www.eventbrite.com/platform/api#/reference/ticket-class/retrieve/list-ticket-classes-by-event)

**Headers**

```
Authorization:Bearer PERSONAL_OAUTH_TOKEN
```

#### Response

```json
{
      "actual_cost": null,
      "actual_fee": {
        "display": "$1.90",
        "currency": "USD",
        "value": 190,
        "major_value": "1.90"
      },
      "cost": {
        "display": "$5.00",
        "currency": "USD",
        "value": 500,
        "major_value": "5.00"
      },
      "resource_uri": "https://www.eventbriteapi.com/v3/events/358418879517/ticket_classes/617868499/",
      "display_name": "Participation",
      "name": "Participation",
      "description": "Active participation in the gymkhana challenges.",
      "sorting": 1,
      "donation": false,
      "free": false,
      "minimum_quantity": 1,
      "maximum_quantity": 5,
      "on_sale_status": "AVAILABLE",
      "event_id": "358418879517",
      "id": "617868499",
      "capacity": 50,
      "quantity_total": 50,
      "quantity_sold": 0,
      "sales_start": "2022-06-06T17:07:25Z",
      "sales_end": "2022-07-02T02:00:00Z",
      "hidden": false,
      "hidden_currently": false,
      "include_fee": true,
}
```

