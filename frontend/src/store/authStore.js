import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../api/auth';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            level: 4,
            xp: 2450,
            xpNextLevel: 5000,
            streak: 5,
            badges: ['streak_7', 'cal_10k', 'warrior'],

            addXp: (amount) => {
                set((state) => {
                    let newXp = state.xp + amount;
                    let newLevel = state.level;
                    let nextLevelXp = state.xpNextLevel;
                    if (newXp >= nextLevelXp) {
                        newXp -= nextLevelXp;
                        newLevel += 1;
                        nextLevelXp = Math.round(nextLevelXp * 1.5);
                    }
                    return { xp: newXp, level: newLevel, xpNextLevel: nextLevelXp };
                });
            },

            unlockBadge: (badgeId) => {
                set((state) => {
                    if (state.badges.includes(badgeId)) return {};
                    return { badges: [...state.badges, badgeId] };
                });
            },

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    await authService.csrfCookie();
                    const response = await authService.login(credentials);
                    const { user, token } = response.data;
                    
                    set({ user, token, isAuthenticated: true, isLoading: false });
                    localStorage.setItem('token', token);
                    return true;
                } catch (error) {
                    set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
                    return false;
                }
            },

            register: async (userData) => {
                set({ isLoading: true, error: null });
                try {
                    await authService.csrfCookie();
                    const response = await authService.register(userData);
                    const { user, token } = response.data;
                    
                    set({ user, token, isAuthenticated: true, isLoading: false });
                    localStorage.setItem('token', token);
                    return true;
                } catch (error) {
                    set({ error: error.response?.data?.message || 'Registration failed', isLoading: false });
                    return false;
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    await authService.logout();
                } catch (error) {
                    console.error('Logout error', error);
                } finally {
                    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
                    localStorage.removeItem('token');
                }
            },

            checkAuth: async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    set({ user: null, token: null, isAuthenticated: false });
                    return false;
                }
                
                try {
                    const response = await authService.getUser();
                    set({ user: response.data, isAuthenticated: true });
                    return true;
                } catch (error) {
                    set({ user: null, token: null, isAuthenticated: false });
                    localStorage.removeItem('token');
                    return false;
                }
            },

            updateProfile: async (profileData) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.updateProfile(profileData);
                    if (response.data.status === 'success') {
                        set({ user: response.data.user, isLoading: false });
                        return true;
                    }
                    set({ isLoading: false });
                    return false;
                } catch (error) {
                    set({ error: error.response?.data?.message || 'Profile update failed', isLoading: false });
                    return false;
                }
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ 
                token: state.token, 
                user: state.user, 
                isAuthenticated: state.isAuthenticated,
                level: state.level,
                xp: state.xp,
                xpNextLevel: state.xpNextLevel,
                streak: state.streak,
                badges: state.badges
            }),
        }
    )
);
