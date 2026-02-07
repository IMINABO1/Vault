import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import DashboardLayout from '@/layouts/DashboardLayout'
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import DocumentWallet from '@/pages/DocumentWallet'
import Documents from '@/pages/Documents'
import Verification from '@/pages/Verification'
import Settings from '@/pages/Settings'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(221,83%,53%)] mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DocumentWallet />} />
        <Route path="documents" element={<Documents />} />
        <Route path="verification" element={<Verification />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/documents" element={<Navigate to="/dashboard/documents" replace />} />
      <Route path="/verification" element={<Navigate to="/dashboard/verification" replace />} />
      <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
