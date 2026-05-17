<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
>>>>>>> feature/advanced-fitforge-ui

// https://vite.dev/config/
export default defineConfig({
  plugins: [
<<<<<<< HEAD
    tailwindcss(),
    react(),
  ],
})
=======
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
  },
});
>>>>>>> feature/advanced-fitforge-ui
