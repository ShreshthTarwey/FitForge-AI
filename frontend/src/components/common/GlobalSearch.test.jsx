import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import GlobalSearch from './GlobalSearch';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
}));

const mockPlans = [
    { id: 1, title: 'Titan Chest Workout', goal: 'Muscle Gain', workout_type: 'Strength', description: 'Heavy pressing.' }
];

const mockExercises = [
    { id: 1, name: 'Incline Bench Press', category: 'Chest', target_muscles: ['Chest'], equipment: 'Dumbbells' }
];

// Mock zustand stores
vi.mock('../../store/useWorkoutStore', () => ({
    useWorkoutStore: () => ({
        plans: mockPlans,
        fetchPlans: vi.fn()
    })
}));

vi.mock('../../store/useExerciseStore', () => ({
    useExerciseStore: () => ({
        exercises: mockExercises,
        fetchExercises: vi.fn()
    })
}));

describe('GlobalSearch Component', () => {
    it('renders the search input', () => {
        render(<GlobalSearch />);
        expect(screen.getByPlaceholderText(/Search workouts/i)).toBeInTheDocument();
    });

    it('shows filtered results when typing', () => {
        render(<GlobalSearch />);
        const input = screen.getByPlaceholderText(/Search workouts/i);
        
        // Type "Workout"
        fireEvent.change(input, { target: { value: 'Workout' } });
        
        // Check if navigation page is shown
        expect(screen.getByText('Workout Library & Plans')).toBeInTheDocument();
        
        // Check if matching workout plan is shown
        expect(screen.getByText('Titan Chest Workout')).toBeInTheDocument();
    });

    it('redirects and clears query when clicking on a result', () => {
        render(<GlobalSearch />);
        const input = screen.getByPlaceholderText(/Search workouts/i);
        
        // Type "Workout"
        fireEvent.change(input, { target: { value: 'Workout' } });
        
        // Click on "Workout Library & Plans" navigation option
        const navOption = screen.getByText('Workout Library & Plans');
        fireEvent.click(navOption);
        
        // Verify navigate was called with correct path
        expect(mockNavigate).toHaveBeenCalledWith('/workouts');
        
        // Input should be cleared
        expect(input.value).toBe('');
    });
});
