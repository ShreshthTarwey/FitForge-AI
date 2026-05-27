import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDemoStore = create(
    persist(
        (set, get) => ({
            accentColor: 'emerald', // 'emerald', 'cyan', 'purple'
            demoMode: false, // Turn off demo mode by default so users see their real database biometrics!
            widgets: {
                stats: true,
                charts: true,
                feed: true,
                insights: true,
                gamification: true,
            },

            setAccentColor: (color) => set({ accentColor: color }),
            
            toggleWidget: (name) => set((state) => ({
                widgets: {
                    ...state.widgets,
                    [name]: !state.widgets[name]
                }
            })),

            toggleDemoMode: () => set((state) => ({ demoMode: !state.demoMode })),
            
            resetToDefault: () => set({
                accentColor: 'emerald',
                demoMode: false,
                widgets: {
                    stats: true,
                    charts: true,
                    feed: true,
                    insights: true,
                    gamification: true,
                }
            })
        }),
        {
            name: 'fitforge-demo-storage',
        }
    )
);
