# AI-Powered Smart Workout Plan Generator

## Overview
A modern full-stack fitness web application that generates customizable workout plans, provides progress tracking, AI-generated fitness insights (via Gemini API), recovery recommendations, streak tracking, achievements, and smart analytics dashboards.

This application was designed with a futuristic, premium UI featuring dark themes, glowing effects, and glassmorphism. It uses a robust backend to manage users, workouts, and analytics while providing smooth animations via Framer Motion on the frontend.

## Features
- **Authentication**: Secure login/registration using Laravel Sanctum with dynamic forms for fitness profile setup.
- **AI Fitness Coach**: Gemini AI integration to generate workout insights, recovery advice, and difficulty prediction (gracefully falls back if API key is missing).
- **Workout Generator**: Algorithm matching user inputs (Goal, Intensity, Duration, Type) with predefined templates, dynamically scaling to meet constraints.
- **Progress Tracking & Streaks**: Log completed workouts and calories burned while building a consistency streak.
- **Gamification**: Unlock automatic achievements (e.g. First Workout, 7 Day Streak) and evolve fitness avatar level dynamically (+500 XP per logged workout) with dynamic leveling.
- **Dashboard**: Smart analytics utilizing Recharts to provide dynamic statistics, charts, and activity tracking, switching seamlessly between mock Live Telemetry and real SQL Database Telemetry.
- **Nutrition, Hydration & Sleep Tracker**: Persist daily calorie & macronutrient goals, log water consumption with an interactive liquid beaker animation, and track sleep hygiene hours directly in your database.

## Tech Stack
- **Backend**: Laravel 12, Sanctum, SQLite / MySQL, Gemini API Service
- **Frontend**: React (Vite), Tailwind CSS v4, Axios, React Router, Zustand, Framer Motion, Recharts, Lucide React Icons

## Folder Structure
- `backend/`: Laravel REST API backend
- `frontend/`: React + Vite frontend application

## Setup Instructions

### Backend Setup
1. Open the `backend/` directory.
2. Run `composer install` to install dependencies.
3. Configure your `.env` file (copy `.env.example` to `.env` if needed) and set your database connection.
4. Run `php artisan migrate:fresh --seed` to run migrations (including meals, water logs, and sleep logs) and populate dummy workout plans and exercises.
5. Provide your `GEMINI_API_KEY` in the `.env` file to enable AI functionality.
6. Start the development server using `php artisan serve`.

### Frontend Setup
1. Open the `frontend/` directory.
2. Run `npm install` to install node dependencies.
3. Start the development server using `npm run dev`.
4. Open the application on your browser (`http://localhost:5173` typically).

## Environment Variables
Ensure the following are correctly set in the backend `.env`:
```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost:5173

DB_CONNECTION=sqlite # Or mysql, based on preference

GEMINI_API_KEY=your_gemini_api_key_here
```

## API Endpoints
- `POST /api/register` : User Registration
- `POST /api/login` : User Authentication
- `POST /api/logout` : End Session
- `GET /api/user` : Fetch authenticated user info
- `GET /api/dashboard` : Fetch user dashboard stats and weekly charts
- `POST /api/workout/generate` : Retrieve generated AI workout plan
- `POST /api/progress/log` : Save workout completion and unlock streaks/achievements
- `GET /api/nutrition` : Fetch today's accumulated meals, sleep hours, and water logs
- `POST /api/nutrition/meal` : Log a new meal with detailed macros
- `DELETE /api/nutrition/meal/{id}` : Delete a logged meal
- `POST /api/nutrition/water` : Log water intake (in ml)
- `POST /api/nutrition/water/reset` : Reset daily water intake back to 0ml
- `POST /api/nutrition/sleep` : Update hours slept for today

## Future Scope
- **Admin Panel**: Web interface for managing workouts, exercises, and system configuration.
- **Social Features**: Leaderboards and friends lists for fitness tracking.
