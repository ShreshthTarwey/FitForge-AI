import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/router';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const { checkAuth } = useAuthStore();
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: '!bg-slate-800 !text-white !border !border-slate-700',
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          },
          success: {
            iconTheme: {
              primary: '#39ff14',
              secondary: '#1e293b',
            },
          },
        }} 
      />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
