import { create } from 'zustand';

export const useThemeStore = create((set) => {
    // Initial theme from localStorage (default to dark)
    const initialTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply theme class to document element on initialization
    if (initialTheme === 'light') {
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.remove('light');
    }

    return {
        theme: initialTheme,
        toggleTheme: () => {
            set((state) => {
                const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
                localStorage.setItem('theme', nextTheme);
                
                if (nextTheme === 'light') {
                    document.documentElement.classList.add('light');
                } else {
                    document.documentElement.classList.remove('light');
                }
                
                return { theme: nextTheme };
            });
        },
        setTheme: (theme) => {
            localStorage.setItem('theme', theme);
            if (theme === 'light') {
                document.documentElement.classList.add('light');
            } else {
                document.documentElement.classList.remove('light');
            }
            set({ theme });
        }
    };
});
