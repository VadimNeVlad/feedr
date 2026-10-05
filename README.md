# FeedR

A responsive and accessible full stack blog web app.

## Backend connection

Copy `.env.example` to `.env` and set `VITE_BASE_URL` to the backend API URL, including `/api/`. For local Nest development the default is `http://localhost:3000/api/`. Allow the frontend origin in the backend's `CORS_ORIGINS`.

For production, set this variable before building. The `/api/` fallback requires a reverse proxy on the frontend origin; the SPA fallback in `vercel.json` does not proxy API requests to the backend.

Run `npm test` for frontend tests and `npm run test:integration` for real HTTP checks against the sibling backend checkout. See [integration/README.md](integration/README.md) for setup and coverage boundaries.

<!-- ## Preview -->

## Features

- Signin / Signup
- Create, update and delete posts, comments and tags
- Bookmark posts
- Filter for posts
- Follow / Unfollow users
- Infinite scrolling of posts
- View / Edit Profile
- Display, user's followers and following list
- Accessible components
- Fully responsive design
- Reading List

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- RTK Query
- MUI
- Framer Motion
- React Router
- React Hook Form

## Live

> Client: https://feedr-three.vercel.app

> Server: https://github.com/VadimNeVlad/feedr-server
