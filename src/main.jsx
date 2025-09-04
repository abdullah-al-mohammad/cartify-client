import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Router";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AuthProvider from "./Router/provider/AuthProvider";
import { CartProvider } from "./Router/provider/CartProvider";
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <div>
            <RouterProvider router={router} />
          </div>
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
