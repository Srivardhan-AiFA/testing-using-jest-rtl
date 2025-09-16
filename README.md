# googleCalendarIntegration

A full-stack MERN application that allows users to log in with Google, create calendar events, and invite multiple attendees. The backend integrates with Google Calendar API via OAuth 2.0, and the frontend provides a user-friendly interface for event scheduling.

---

## Features

- Google login using OAuth 2.0 (via Passport.js)
- JWT and session-based authentication
- Create events with:
  - Title
  - Description
  - Start and end time
  - Time zone
  - Multiple attendees
- Sends events to users’ Google Calendar
- Protected dashboard routes for authenticated users
- Responsive UI built with React + Vite

---

## Tech Stack

- **Frontend:** React, Vite, TypeScript, TailwindCSS
- **Backend:** Node.js, Express, TypeScript, Passport.js
- **Database:** MongoDB
- **Authentication:** Google OAuth 2.0, JWT, Express sessions
- **API Integration:** Google Calendar API
- **Other:** Axios for HTTP requests, Day.js for date handling

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB running locally or cloud instance
- Google Cloud Project with OAuth 2.0 credentials

---
