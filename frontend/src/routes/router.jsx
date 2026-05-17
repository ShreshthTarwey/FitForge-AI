import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';
import Loader from '../components/common/Loader';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Lazy load all pages for code splitting & performance optimization
const Login = React.lazy(() => import('../pages/auth/Login'));
const Signup = React.lazy(() => import('../pages/auth/Signup'));
const ForgotPassword = React.lazy(() => import('../pages/auth/ForgotPassword'));
const DashboardOverview = React.lazy(() => import('../pages/dashboard/DashboardOverview'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

const WorkoutGenerator = React.lazy(() => import('../pages/workouts/WorkoutGenerator'));
const WorkoutPlans = React.lazy(() => import('../pages/workouts/WorkoutPlans'));
const WorkoutDetails = React.lazy(() => import('../pages/workouts/WorkoutDetails'));
const LogWorkout = React.lazy(() => import('../pages/logging/LogWorkout'));

const ExerciseLibrary = React.lazy(() => import('../pages/exercises/ExerciseLibrary'));
const ExerciseDetails = React.lazy(() => import('../pages/exercises/ExerciseDetails'));

const ProgressDashboard = React.lazy(() => import('../pages/progress/ProgressDashboard'));
const ProgressHistory = React.lazy(() => import('../pages/progress/ProgressHistory'));

const Settings = React.lazy(() => import('../pages/settings/Settings'));

const LandingPage = React.lazy(() => import('../pages/LandingPage'));
const LiveWorkout = React.lazy(() => import('../pages/workouts/LiveWorkout'));

const WorkoutLogs = React.lazy(() => import('../pages/workouts/WorkoutLogs'));
const NutritionDashboard = React.lazy(() => import('../pages/nutrition/NutritionDashboard'));
const MealTracker = React.lazy(() => import('../pages/nutrition/MealTracker'));

const AppRouter = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Loader fullScreen />}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Signup />} />
                        <Route path="/signup" element={<Navigate to="/register" replace />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Route>

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/dashboard" element={<DashboardOverview />} />
                            
                            <Route path="/workouts" element={<WorkoutPlans />} />
                            <Route path="/workouts/generate" element={<WorkoutGenerator />} />
                            <Route path="/workouts/:id" element={<WorkoutDetails />} />
                            <Route path="/workouts/:id/active" element={<LogWorkout />} />
                            <Route path="/workouts/:id/live" element={<LiveWorkout />} />
                            
                            <Route path="/exercises" element={<ExerciseLibrary />} />
                            <Route path="/exercises/:id" element={<ExerciseDetails />} />

                            <Route path="/progress" element={<ProgressDashboard />} />
                            <Route path="/progress/history" element={<ProgressHistory />} />
                             
                            <Route path="/logs" element={<WorkoutLogs />} />
                             
                            <Route path="/nutrition" element={<NutritionDashboard />} />
                            <Route path="/nutrition/log" element={<MealTracker />} />
                             
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/profile" element={<Settings />} />
                        </Route>
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};

export default AppRouter;
