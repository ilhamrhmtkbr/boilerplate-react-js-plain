/**
 * router/index.jsx
 *
 * Struktur:
 *   /auth/login            → Guest only
 *   /auth/register         → Guest only
 *   /auth/forgot-password  → Guest only
 *   /admin                 → App routes (AppLayout wrapper, butuh login)
 *     /admin/dashboard
 *     /admin/profile
 *     /admin/user | /admin/user/create | /admin/user/:id | /admin/user/:id/edit
 *     /admin/product | /admin/product/create | /admin/product/:id | /admin/product/:id/edit
 *
 * Syarat:
 *   - '@' alias ke 'src/' di vite.config.js
 *   - AppLayout ada di src/components/layouts/AppLayout.jsx
 *
 * Aktifkan di main.jsx:
 *   import { RouterProvider } from 'react-router-dom'
 *   import router from '@/router/index.jsx'
 *   <RouterProvider router={router} />
 */

import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth.js'
import AppLayout from '@/components/layouts/AppLayout.jsx'

// ── Loading fallback ──────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-bg">
      <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

// ── Route Guards ──────────────────────────────────────────────────────
function ProtectedRoute() {
  const { isAuthenticated, isChecking, checkSession } = useAuth()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (isChecking) return <PageLoader />

  // buat test/lihat page: ganti false → true kalo project beneran
  const requiresAuth = false
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />
}

function GuestRoute() {
  const { isAuthenticated, isChecking, checkSession } = useAuth()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (isChecking) return <PageLoader />

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <Outlet />
}

// ── Lazy Pages ────────────────────────────────────────────────────────
const Index          = lazy(() => import('@/features/Index.jsx'))
const Login          = lazy(() => import('@/features/auth/Login.jsx'))
const Register       = lazy(() => import('@/features/auth/Register.jsx'))
const ForgotPassword = lazy(() => import('@/features/auth/ForgotPassword.jsx'))

const Dashboard      = lazy(() => import('@/features/dashboard/Index.jsx'))

const UserIndex      = lazy(() => import('@/features/user/Index.jsx'))
const UserCreate     = lazy(() => import('@/features/user/Create.jsx'))
const UserDetail     = lazy(() => import('@/features/user/Detail.jsx'))
const UserEdit       = lazy(() => import('@/features/user/Edit.jsx'))
const Profile        = lazy(() => import('@/features/user/Profile.jsx'))

const ProductIndex   = lazy(() => import('@/features/product/Index.jsx'))
const ProductCreate  = lazy(() => import('@/features/product/Create.jsx'))
const ProductDetail  = lazy(() => import('@/features/product/Detail.jsx'))
const ProductEdit    = lazy(() => import('@/features/product/Edit.jsx'))

// ── Wrap dengan Suspense ──────────────────────────────────────────────
function Lazy({ component: Component }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

// ── Router ────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Navigate to="/auth/login" replace />,
  // },

  // ── Guest Routes ────────────────────────────────────────────────────
  {
    element: <GuestRoute />,
    children: [
      {
        path: '/',
        element: <Lazy component={Index} />
      },
      {
        path: '/auth/login',
        element: <Lazy component={Login} />,
      },
      {
        path: '/auth/register',
        element: <Lazy component={Register} />,
      },
      {
        path: '/auth/forgot-password',
        element: <Lazy component={ForgotPassword} />,
      },
    ],
  },

  // ── App Routes (AppLayout wrapper, butuh auth) ──────────────────────
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        {/* ProtectedRoute renders <Outlet />, jadi AppLayout dibungkus di sini */}
      </ProtectedRoute>
    ),
    // Untuk render AppLayout sebagai nested layout:
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },

          // Dashboard
          { path: 'dashboard', element: <Lazy component={Dashboard} /> },

          // Profile user yang sedang login
          { path: 'profile', element: <Lazy component={Profile} /> },

          // ── User CRUD ──────────────────────────────────────────────
          { path: 'user',           element: <Lazy component={UserIndex} /> },
          // Penting: 'user/create' harus SEBELUM 'user/:id'
          { path: 'user/create',    element: <Lazy component={UserCreate} /> },
          { path: 'user/:id',       element: <Lazy component={UserDetail} /> },
          { path: 'user/:id/edit',  element: <Lazy component={UserEdit} /> },

          // ── Product CRUD ───────────────────────────────────────────
          { path: 'product',              element: <Lazy component={ProductIndex} /> },
          { path: 'product/create',       element: <Lazy component={ProductCreate} /> },
          { path: 'product/:id',          element: <Lazy component={ProductDetail} /> },
          { path: 'product/:id/edit',     element: <Lazy component={ProductEdit} /> },
        ],
      },
    ],
  },

  // ── Catch-all ────────────────────────────────────────────────────────
  { path: '*', element: <Navigate to="/" replace /> },
],
  {
    basename: import.meta.env.BASE_URL,
  }
)

export default router
