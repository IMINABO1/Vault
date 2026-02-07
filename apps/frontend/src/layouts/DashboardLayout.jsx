import { Outlet, useLocation } from 'react-router-dom'
import { NavigationSidebar } from '@/components/NavigationSidebar'
import { SafetyPanel } from '@/components/SafetyPanel'

export default function DashboardLayout() {
  const location = useLocation()
  // Safety panel only shows on the main dashboard (card view), not on Documents or Verification pages
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/dashboard/'
  
  return (
    <div className={isDashboard ? 'dashboard-layout' : 'dashboard-layout-full'}>
      <NavigationSidebar />
      <main className={isDashboard ? 'dashboard-main' : 'dashboard-main-full'}>
        <Outlet />
      </main>
      {isDashboard && <SafetyPanel />}
    </div>
  )
}
