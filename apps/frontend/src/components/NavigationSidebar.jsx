import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, CheckCircle, Settings, Lock, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/documents', label: 'Documents', icon: FileText },
  { to: '/dashboard/verification', label: 'Verification Status', icon: CheckCircle },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function NavigationSidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
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
      <div className="nav-sidebar-footer">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Lock className="h-4 w-4 shrink-0" aria-hidden />
          <span className="font-medium">Encrypted & Secure</span>
        </div>
        <p className="text-muted-foreground mb-3">All documents are protected with bank-level encryption.</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
