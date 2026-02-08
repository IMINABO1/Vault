import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, CheckCircle, Settings, Bell } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import ThemeToggle from '@/components/ui/theme-toggle'

const navItems = [
  { to: '/dashboard', label: 'Vault', icon: LayoutDashboard },
  { to: '/dashboard/documents', label: 'Documents', icon: FileText },
  { to: '/dashboard/verification', label: 'Verification Status', icon: CheckCircle },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
]

const mobileLabels = {
  '/dashboard': 'Vault',
  '/dashboard/documents': 'Docs',
  '/dashboard/verification': 'Verify',
  '/dashboard/settings': 'Settings',
}

export function NavigationSidebar() {
  const { user } = useAuth()

  return (
    <>
      {/* Mobile top header with logo */}
      <header className="mobile-top-header">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(221,65%,52%)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <p className="font-semibold text-sm text-foreground">SecureVault</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-card hover:bg-accent transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white font-semibold text-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </header>

      {/* Desktop / Tablet sidebar */}
      <aside className="nav-sidebar">
        <div className="nav-sidebar-brand">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(221,65%,52%)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">SecureVault</p>
              <p className="text-xs text-muted-foreground truncate">Digital Documents</p>
            </div>
          </div>
        </div>
        <nav className="nav-sidebar-nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              className={({ isActive }) =>
                `nav-sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              <span className="hidden lg:inline truncate">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="mobile-bottom-nav">
        {navItems.map(({ to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              `mobile-bottom-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon aria-hidden />
            <span>{mobileLabels[to]}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}
