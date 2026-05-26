# SynapseX Events

**Tagline:** Your Event. Your Journey. Powered by AI.

## Problem Statement Chosen

**DevFusion 2.0 — Problem Statement 3**
**EventSphere — End-to-End Event Management & Ticketing Platform**

---

## Project Overview

SynapseX Events is an AI-powered event management and ticketing platform designed to make event participation more personalized and useful for attendees.

Most event platforms mainly focus on registration and ticket booking. However, many attendees struggle to find events that are relevant to their interests, career goals, or skill level.

To solve this problem, we built SynapseX Events — a platform that combines event management with personalized event recommendations and an AI-assisted event journey.

In addition to core event management functionalities such as event creation, booking, QR-based ticketing, and organizer dashboards, the platform helps attendees discover events that match their interests and goals.

---

## Problem We Identified

Traditional event platforms are mostly transactional.

A user typically:

* Registers for an event
* Attends the event
* Leaves

There is very little personalization or guidance.

As students and hackathon participants ourselves, we noticed that many people attend events without knowing:

* Which sessions are relevant to them
* Which events align with their goals
* How to maximize networking opportunities
* Which event provides the best value for their interests

This motivated us to build SynapseX Events.

---

## Our Solution

SynapseX Events transforms traditional event booking into a more personalized experience.

Instead of only booking tickets, users receive:

* Personalized event recommendations
* Event match scoring
* Smart event discovery
* Curated event journey suggestions
* Interactive and immersive event experience

Our objective is to make event participation more meaningful and personalized.

---

## Key Innovations and USP

### 1. AI Event Journey

Unlike traditional event platforms, SynapseX Events suggests a personalized event journey based on:

* User interests
* Skill level
* Career goals
* Networking preferences

For example:

**Goal:** Internship opportunities

Suggested event journey:

* Resume Workshop
* AI Networking Session
* Startup Meetup
* Career Guidance Panel

This helps users spend time on sessions that are more relevant to them.

---

### 2. Event Match Score

Every event includes a match score to show how relevant the event is for a user based on their preferences.

This helps attendees discover events more efficiently.

---

### 3. Immersive User Experience

Instead of a traditional event website design, SynapseX Events uses:

* Dynamic background videos
* Futuristic dark theme
* Glassmorphism UI
* Smooth transitions and animations

The goal was to create a modern and engaging experience.

---

### 4. Smart Event Discovery

Users can discover events based on relevance rather than browsing generic event listings.

---

## How Our Project Differs From Existing Event Platforms

| Traditional Event Platforms   | SynapseX Events                  |
| ----------------------------- | -------------------------------- |
| Basic event listing           | Personalized recommendations     |
| Generic discovery             | AI-assisted event journey        |
| Simple ticket booking         | Event match scoring              |
| Static interface              | Immersive futuristic experience  |
| Same experience for all users | Personalized attendee experience |

Our platform focuses not only on event management but also on event personalization.

---

## Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Framer Motion

### Backend / Authentication

* Firebase Authentication

### Database

* Firebase Firestore

### Storage

* Firebase Storage

### Payment Integration

* Razorpay Test Mode

### QR Ticket Generation

* QR Code Library

### Deployment

* Vercel

---

## Features Implemented

### User Features

* User Authentication (Login / Sign Up)
* Personalized Dashboard
* Browse Events
* Event Details Page
* Wishlist
* Ticket Booking
* QR-Based Ticket Generation
* AI Event Recommendation
* Event Match Score
* Personalized Event Journey

### Organizer Features

* Create Events
* Edit Events
* Delete Events
* View Registrations
* Event Management Dashboard
* Basic Analytics

### UI Features

* Dynamic Cinematic Video Backgrounds
* Futuristic Dark Theme
* Responsive Design
* Smooth Page Transitions

---

## Local Setup Instructions

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

### 2. Move to Project Folder

```bash
cd synapsex-events
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Firebase

Create a `.env` file in the root directory and add:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Run the Project

```bash
npm run dev
```

---

## Live Deployment

Live Website:
[Add deployed link here]

---

## GitHub Repository

Repository Link:
[Add GitHub link here]

---

## Team Members

### Sri Desiyan V

**Role:** Full Stack Development, UI/UX Design, AI Recommendation Logic, Project Architecture

### TEAM_CIT_CHENNAI

**Role:** [Role Here]

---

## Known Bugs / Limitations

We believe transparency is important during evaluation.

Current limitations:

* AI recommendation currently uses scoring logic instead of a trained machine learning model.
* Some organizer analytics are simplified for MVP delivery.
* Razorpay integration is implemented in sandbox/test mode.
* Some minor mobile responsiveness refinements may still be required for specific devices.

Possible future improvements:

* ML-based recommendation engine
* Smart networking suggestions
* Calendar synchronization
* Real-time attendee engagement system

---

## Hackathon Rule Compliance

We have strictly followed the rules and guidelines provided for the hackathon.

Our development approach included:

* Building the project incrementally
* Maintaining proper commit history
* Using sandbox payment integrations
* Creating an original solution
* Following the selected problem statement requirements

The project was built specifically for this hackathon and is not a reused or recycled submission.

---

## Future Scope

Future improvements may include:

* AI networking recommendations
* Real-time attendee engagement
* Smart schedule optimization
* Calendar integrations
* Venue navigation assistance
* Crowd and participation insights

---

## Final Note

We believe events should not only be attended but experienced in a smarter and more personalized way.

SynapseX Events aims to make event participation more meaningful through personalization and intelligent recommendations.
