import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from "react-helmet-async";
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
import AuthProvider from './providers/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <div className="max-w-screen-xl mx-auto">

      <RouterProvider router={router} />
      <Toaster position='top-right' reverseOrder={false} />
      </div>
      </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
