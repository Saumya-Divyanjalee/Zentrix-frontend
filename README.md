# Zentrix — AI-Powered Productivity Platform for Students

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen" alt="status">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="react">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="typescript">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwind-css&logoColor=white" alt="tailwind">
  <img src="https://img.shields.io/badge/deployed-Vercel-000000?logo=vercel&logoColor=white" alt="vercel">
</p>

**Live application:** [zentrix-frontend-weld.vercel.app](https://zentrix-frontend-weld.vercel.app/)

Zentrix is a full-stack productivity platform built for students who want to manage tasks, organize notes, and study smarter with the help of AI. It combines a task manager, a notes system, a calendar, productivity analytics, and a Google Gemini-powered AI assistant into a single, polished interface — built with React, TypeScript, Redux, and TailwindCSS on the frontend, backed by a Node.js, Express, and MongoDB API.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Available Scripts](#available-scripts)
- [Backend Repository](#backend-repository)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Features

- 🔐 **Secure authentication** — register and log in with JWT-based sessions, password hashing via bcrypt, and automatic token refresh
- ✅ **Smart task management** — create, edit, and track tasks with priorities, deadlines, and subject tags, with live progress tracking
- 📝 **Study notes** — write and organize notes by subject, with AI-generated summaries attached automatically
- 🤖 **AI Assistant** — Gemini-powered note summarizer, multiple-choice quiz generator, and personalized study planner
- 🗂️ **AI History** — a searchable archive of every past AI generation, so nothing is ever lost
- 📅 **Calendar view** — see every task deadline laid out across the month at a glance
- 📊 **Analytics dashboard** — visual breakdown of task completion, productivity score, and study activity over time
- 🖼️ **Profile management** — update your name and password, and upload a profile photo (stored via Cloudinary)
- 📱 **Fully responsive** — a collapsible mobile navigation drawer and adaptive layouts across every screen size
- ✨ **Polished UI/UX** — custom typography, smooth animations, and a consistent design system throughout

---

## Screenshots

 

### Landing Page
<img width="1918" height="902" alt="Screenshot 2026-06-20 134539" src="https://github.com/user-attachments/assets/8af35029-4546-433e-8d5d-c03ea376206f" />


### Login
<img width="1913" height="917" alt="Screenshot 2026-06-20 140052" src="https://github.com/user-attachments/assets/b997d936-e676-4a0d-8ad2-53c274db71aa" />


### Register
<img width="1918" height="907" alt="Screenshot 2026-06-20 134611" src="https://github.com/user-attachments/assets/84b3d82f-ae57-4362-afd5-6465b0e051e2" />


### Dashboard
<img width="1918" height="911" alt="Screenshot 2026-06-20 135734" src="https://github.com/user-attachments/assets/9d68cde8-7f10-4263-844b-8abdebea56ee" />


### Tasks
<img width="1918" height="907" alt="Screenshot 2026-06-20 135054" src="https://github.com/user-attachments/assets/e73508fc-40ad-4617-bd6f-5cffb07b3b3d" />


### Notes
<img width="1918" height="912" alt="Screenshot 2026-06-20 135247" src="https://github.com/user-attachments/assets/56a2f5ba-2dc0-422c-899d-e05bd14c242e" />


### AI Assistant
<img width="1918" height="911" alt="Screenshot 2026-06-20 135449" src="https://github.com/user-attachments/assets/a364ddf8-a79d-4599-9862-ac9b9b2452a9" />


### Analytics
<img width="1918" height="911" alt="Screenshot 2026-06-20 135514" src="https://github.com/user-attachments/assets/e6b848a0-11dd-48e2-ab03-30b53c50d86d" />


### Profile
<img width="1918" height="907" alt="Screenshot 2026-06-20 135553" src="https://github.com/user-attachments/assets/7108e4a2-1208-404d-82a2-3384fc7785ee" />


---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | TailwindCSS (custom design tokens) |
| State management | Redux Toolkit |
| Routing | React Router v6 |
| HTTP client | Axios (with auth interceptors) |
| Charts | Recharts |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/                   Redux store configuration
├── api/                   Axios instance with auth interceptors
├── features/              Feature-based modules
│   ├── auth/                Login, Register, auth slice
│   ├── tasks/                Task list, create/edit, filters
│   ├── notes/                Notes CRUD + AI summary display
│   ├── dashboard/            Dashboard, Calendar, Analytics
│   ├── ai/                   AI Assistant (summarize / quiz / study plan)
│   └── profile/               Profile view, photo upload, password change
├── components/
│   ├── layout/               Sidebar, MainLayout, ProtectedRoute
│   └── ui/                   Reusable UI — illustrations, MomentumRing, CountUp
├── hooks/                  Custom hooks (e.g. useInView for scroll reveals)
├── pages/                  Landing page, AI History, 404 page
├── routes/                 Route definitions
├── styles/                 Global CSS and design tokens
└── types/                  Shared TypeScript interfaces
```

---

## Getting Started

### Prerequisites
- Node.js 18 or later
- The [Zentrix backend](https://github.com/Saumya-Divyanjalee/Zentrix-Backend) running locally or deployed

### Installation

```bash
git clone https://github.com/Saumya-Divyanjalee/Zentrix-frontend.git
cd Zentrix-frontend
npm install
```

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Setup

The backend API base URL is configured in `src/api/axiosInstance.ts`:

```ts
baseURL: 'http://localhost:5000/api'   // points to your local backend during development
```

For production, this should point to the deployed backend, e.g.:

```ts
baseURL: 'https://zentrix-backend.vercel.app/api'
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Previews the production build locally |

---

## Backend Repository

This frontend connects to a separate Express and MongoDB API:

🔗 **[Zentrix-Backend](https://github.com/Saumya-Divyanjalee/Zentrix-Backend)**

The backend handles authentication (JWT with refresh tokens), role-based authorization, task and note CRUD, AI requests to Google Gemini, profile photo uploads via Cloudinary, and welcome emails via Nodemailer.

---

## Deployment

| Part | Platform | URL |
|---|---|---|
| Frontend | Vercel | [zentrix-frontend-weld.vercel.app](https://zentrix-frontend-weld.vercel.app/) |
| Backend | Vercel | [zentrix-backend.vercel.app](https://zentrix-backend.vercel.app/) |
| Database | MongoDB Atlas | — |

Both frontend and backend are connected to their respective GitHub repositories for continuous deployment — every push to `master` automatically triggers a rebuild and redeploy on Vercel.

---

## Roadmap

- [ ] Dark mode toggle
- [ ] Push notifications for upcoming deadlines
- [ ] Mobile app (React Native)

---

## Author

Built by **[Saumya Divyanjalee](https://github.com/Saumya-Divyanjalee)**

This project was built as the final coursework assignment for **ITS2020 — Rapid Application Development**, Graduate Diploma in Software Engineering.

---

## License

This project is built for educational and portfolio purposes.
