import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './main.css';
import AuthProvider from './provider/AuthProvider';
import { CartProvider } from './provider/CartProvider';
import { ThemeProvider } from './provider/ThemeProvider';
import { router } from './Router/Router';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
