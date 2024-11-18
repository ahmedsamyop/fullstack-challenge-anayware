import { createBrowserRouter, type RouteObject } from 'react-router-dom'
// Error
import NotFoundPage from '../pages/notFoundPage/NotFoundPage'
// layout & pages
import { DashboardLayout, HomeLayout, MangmentLayout } from '../layouts'
import { HomePage } from '../pages/home'
import { DashboardPage } from '../pages/dashboard'
import { MangmentPage } from '../pages/mangment'

// home routes
const homeRoutes: RouteObject = {
  path: '/',
  element: <HomeLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
  ],
}
// dashboard routes
const dashboardRoutes: RouteObject = {
  path: 'dashboard',
  element: <DashboardLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      index: true,
      element: <DashboardPage />,
    },
  ],
}
// mangment routes
const mangmentRoutes: RouteObject = {
  path: 'mangment',
  element: <MangmentLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      index: true,
      element: <MangmentPage />,
    },
  ],
}

const router = createBrowserRouter([homeRoutes, dashboardRoutes, mangmentRoutes])

export default router
