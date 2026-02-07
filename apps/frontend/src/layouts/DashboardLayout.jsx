import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { NavigationSidebar } from '@/components/NavigationSidebar'
import { SafetyPanel } from '@/components/SafetyPanel'
import { LockdownScreen } from '@/components/LockdownScreen'

export default function DashboardLayout() {
  const location = useLocation()
  const [lockdownActive, setLockdownActive] = useState(false)
  const [safetyCollapsed, setSafetyCollapsed] = useState(false)
  // Safety panel only shows on the main dashboard (card view), not on Documents or Verification pages
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/dashboard/'

  const layoutClass = !isDashboard
    ? 'dashboard-layout-full'
    : safetyCollapsed
      ? 'dashboard-layout dashboard-layout-collapsed'
      : 'dashboard-layout'

  return (
    <>
      <div className={layoutClass}>
        <NavigationSidebar />
        <main className={isDashboard ? 'dashboard-main' : 'dashboard-main-full'}>
          <Outlet />
        </main>
        {isDashboard && (
          <SafetyPanel
            collapsed={safetyCollapsed}
            onToggle={() => setSafetyCollapsed((v) => !v)}
            onActivateLockdown={() => setLockdownActive(true)}
          />
        )}
      </div>
      {lockdownActive && <LockdownScreen onExit={() => setLockdownActive(false)} />}
    </>
  )
}
