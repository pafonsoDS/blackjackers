# Frontend Challenge

Unfortunately, this web application has several bugs. Can you fix them all and find what is causing the performance issues?

## Requirements

- Display a list of **valid sports events**, each showing the respective odds.
  - An event is considered valid if it includes:
    - an **ID**
    - the **name of both teams**
    - the **date of the event**
- Allow sorting of the event list:
  - by the **name of either team**
  - by **date**
- Support **filtering** of events by **team name**
- Include a **color picker** input to customize the **background color** of each event card
- Provide a **button** that opens a **"Work In Progress" modal**

## Project installation

> [!IMPORTANT]  
> You should have [node](https://nodejs.org/en) installed with at least `v22.17.0`.

1. Start by cloning the repository

2. Install dependencies:

   `npm ci`

3. Run the application dev server:

   `npm start`

## Mocks

Examples of the payload received by the service can be found at `src/mocks/data`

To apply the mock with a large data set on the `/api/events` payload, you can make the following change in the `src/mocks/handlers.js` file:

```js
// From
export const handlers = [
  http.get("/api/events", () => {
    return HttpResponse.json(events, { status: 200 });
  }),
];

// To
export const handlers = [
  http.get("/api/events", () => {
    return HttpResponse.json(eventsBigData, { status: 200 });
  }),
];
```


- `events` - has a list of 10 events
- `eventsBigData` - has a list of 100 events