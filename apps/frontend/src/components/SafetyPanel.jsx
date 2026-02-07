import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Phone, Share2, User, X, ShieldAlert, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function SafetyPanel({ collapsed, onToggle, onActivateLockdown }) {
  const { user } = useAuth()
  const [locationSharing, setLocationSharing] = useState(false)
  const [emergencyAlerts, setEmergencyAlerts] = useState(true)
  const [contacts, setContacts] = useState([])
  const [showContacts, setShowContacts] = useState(false)

  useEffect(() => {
    fetch('/api/emergency-contacts')
      .then((res) => res.json())
      .then((data) => setContacts(data.contacts || []))
      .catch(() => setContacts([]))
  }, [])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && showContacts) setShowContacts(false)
    },
    [showContacts]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (showContacts) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showContacts])

  return (
    <>
      <aside className={`safety-sidebar ${collapsed ? 'safety-sidebar-collapsed' : ''}`}>
        {/* Collapse / Expand toggle */}
        <button
          type="button"
          onClick={onToggle}
          className="safety-collapse-btn"
          aria-label={collapsed ? 'Expand safety panel' : 'Collapse safety panel'}
        >
          {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        {collapsed ? (
          /* Collapsed: show only icons vertically */
          <div className="safety-collapsed-icons">
            <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden />
            <button
              type="button"
              onClick={onActivateLockdown}
              className="safety-collapsed-icon-btn safety-collapsed-lockdown"
              aria-label="Activate Lockdown"
            >
              <ShieldAlert className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowContacts(true)}
              className="safety-collapsed-icon-btn"
              aria-label="Emergency Contacts"
            >
              <Phone className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="safety-collapsed-icon-btn"
              aria-label="Share Documents"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        ) : (
          /* Expanded: full panel */
          <>
            <h2 className="safety-sidebar-title">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" aria-hidden />
              Safety Features
            </h2>
            <p className="safety-sidebar-subtitle">Emergency sharing options</p>

            <div className="safety-toggles">
              <div className="safety-toggle-row">
                <span>Share your location with trusted contacts in emergencies</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={locationSharing}
                  data-state={locationSharing ? 'checked' : 'unchecked'}
                  onClick={() => setLocationSharing((v) => !v)}
                  className="safety-toggle"
                >
                  <span className="safety-toggle-thumb" />
                </button>
              </div>
              <div className="safety-toggle-row">
                <span>Send instant alerts to emergency contacts</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={emergencyAlerts}
                  data-state={emergencyAlerts ? 'checked' : 'unchecked'}
                  onClick={() => setEmergencyAlerts((v) => !v)}
                  className="safety-toggle"
                >
                  <span className="safety-toggle-thumb" />
                </button>
              </div>
            </div>

            {/* Lockdown Trigger */}
            <button
              type="button"
              onClick={onActivateLockdown}
              className="w-full mt-4 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <ShieldAlert className="h-5 w-5" aria-hidden />
              Activate Lockdown
            </button>

            <div className="safety-quick-actions">
              <button
                type="button"
                className="safety-quick-action w-full text-left"
                onClick={() => setShowContacts(true)}
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                Emergency Contacts
              </button>
              <button type="button" className="safety-quick-action w-full text-left">
                <Share2 className="h-4 w-4 shrink-0" aria-hidden />
                Share Documents
              </button>
            </div>
          </>
        )}

        {/* User avatar - pushed to bottom */}
        <div className="safety-user-section">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-semibold text-sm shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
            </div>
          )}
        </div>
      </aside>

      <AnimatePresence>
        {showContacts && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowContacts(false)}
            />

            <motion.div
              className="relative z-10 w-full max-w-[90vw] sm:max-w-md px-4"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="rounded-2xl bg-card shadow-2xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Emergency Contacts</h3>
                  <button
                    type="button"
                    onClick={() => setShowContacts(false)}
                    className="rounded-full p-1 hover:bg-accent transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                {contacts.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No emergency contacts added yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center gap-3 rounded-xl border border-border bg-muted p-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                          <User className="h-5 w-5 text-amber-600" aria-hidden />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{contact.name}</p>
                          {contact.relationship && (
                            <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
