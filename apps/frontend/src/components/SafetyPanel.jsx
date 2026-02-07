import { useState } from 'react'
import { AlertTriangle, Phone, Share2 } from 'lucide-react'

export function SafetyPanel() {
  const [locationSharing, setLocationSharing] = useState(false)
  const [emergencyAlerts, setEmergencyAlerts] = useState(true)

  return (
    <aside className="safety-sidebar">
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

      <div className="safety-quick-actions">
        <button type="button" className="safety-quick-action w-full text-left">
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          Emergency Contact
        </button>
        <button type="button" className="safety-quick-action w-full text-left">
          <Share2 className="h-4 w-4 shrink-0" aria-hidden />
          Share Documents
        </button>
      </div>
    </aside>
  )
}
