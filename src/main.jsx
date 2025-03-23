import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { Provider } from './components/ui/provider';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router';
import MemberProfile from './components/MemberProfile';
import MemberProfileDetails from './components/MemberProfileDetails';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <MemberProfile/>
      },
      {
        path: "/member/:id",
        element: <MemberProfileDetails/>
      },
      {
        path: "/admin",
        element: <h1 className='text-center text-5xl!'>Admin Route</h1>
      }
    ]
  }
])
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider>
    <RouterProvider router={router} />
    <Toaster toastOptions={{duration: 5000}}/>
    </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
