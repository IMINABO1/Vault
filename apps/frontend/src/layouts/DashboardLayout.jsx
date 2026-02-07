import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { NavigationSidebar } from '@/components/NavigationSidebar'
import { SafetyPanel } from '@/components/SafetyPanel'
import { LockdownScreen } from '@/components/LockdownScreen'

export default function DashboardLayout() {
  const location = useLocation()
  const [lockdownActive, setLockdownActive] = useState(false)
  // Safety panel only shows on the main dashboard (card view), not on Documents or Verification pages
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/dashboard/'

  return (
    <>
      <div className={isDashboard ? 'dashboard-layout' : 'dashboard-layout-full'}>
        <NavigationSidebar />
        <main className={isDashboard ? 'dashboard-main' : 'dashboard-main-full'}>
          <Outlet />
        </main>
        {isDashboard && <SafetyPanel onActivateLockdown={() => setLockdownActive(true)} />}
      </div>
      {lockdownActive && <LockdownScreen onExit={() => setLockdownActive(false)} />}
    </>
  )
}
