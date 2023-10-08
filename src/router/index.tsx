import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '@/pages/Login/index.tsx'
import HomePage from '@/pages/Home/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
])

export default router
