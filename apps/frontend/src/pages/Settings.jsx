import { useState } from 'react'
import { User, Bell, Shield, Lock, Fingerprint, Globe, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ui/theme-toggle'
import { useAuth } from '@/contexts/AuthContext'

export default function Settings() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    language: 'English (US)',
    timeZone: 'Pacific Time (PT)',
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    biometric: true,
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleToggle = (category, field) => {
    if (category === 'notifications') {
      setNotifications(prev => ({ ...prev, [field]: !prev[field] }))
    } else if (category === 'security') {
      setSecurity(prev => ({ ...prev, [field]: !prev[field] }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
        <div>
          <h1 className="dashboard-page-title">Settings</h1>
          <p className="dashboard-page-subtitle">
            Configure your account preferences.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card hover:bg-accent transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-semibold text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>

      {/* Grey Separator */}
      <div className="hidden" />

      {/* Settings Section Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences and security settings
        </p>
      </div>

      {/* Profile Information Card */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 p-2">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Profile Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Full Name
            </label>
            <Input
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Country/Region
            </label>
            <div className="relative">
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Card */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-100 p-2">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-0.5">
                Email Notifications
              </p>
              <p className="text-xs text-muted-foreground">
                Receive updates about your documents via email
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifications.email}
              onClick={() => handleToggle('notifications', 'email')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-[0.5px] transition-colors ${
                notifications.email
                  ? 'bg-[hsl(221,83%,53%)] border-[hsl(221,83%,53%)]'
                  : 'bg-muted border-input'
              }`}
            >
              <span
                className={`pointer-events-none block h-5 w-5 rounded-full bg-white ring-0 transition-transform ${
                  notifications.email ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-0.5">
                Push Notifications
              </p>
              <p className="text-xs text-muted-foreground">
                Get instant alerts on your mobile device
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifications.push}
              onClick={() => handleToggle('notifications', 'push')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-[0.5px] transition-colors ${
                notifications.push
                  ? 'bg-[hsl(221,83%,53%)] border-[hsl(221,83%,53%)]'
                  : 'bg-muted border-input'
              }`}
            >
              <span
                className={`pointer-events-none block h-5 w-5 rounded-full bg-white ring-0 transition-transform ${
                  notifications.push ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security & Privacy Card */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-100 p-2">
            <Shield className="h-5 w-5 text-emerald-600" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Security & Privacy</h3>
        </div>

        <div className="space-y-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-0.5">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={security.twoFactor}
              onClick={() => handleToggle('security', 'twoFactor')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-[0.5px] transition-colors ${
                security.twoFactor
                  ? 'bg-[hsl(221,83%,53%)] border-[hsl(221,83%,53%)]'
                  : 'bg-muted border-input'
              }`}
            >
              <span
                className={`pointer-events-none block h-5 w-5 rounded-full bg-white ring-0 transition-transform ${
                  security.twoFactor ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Fingerprint className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-0.5">
                  Biometric Authentication
                </p>
                <p className="text-xs text-muted-foreground">
                  Use fingerprint or face recognition to unlock
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={security.biometric}
              onClick={() => handleToggle('security', 'biometric')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-[0.5px] transition-colors ${
                security.biometric
                  ? 'bg-[hsl(221,83%,53%)] border-[hsl(221,83%,53%)]'
                  : 'bg-muted border-input'
              }`}
            >
              <span
                className={`pointer-events-none block h-5 w-5 rounded-full bg-white ring-0 transition-transform ${
                  security.biometric ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <Button variant="outline" className="w-full border-border">
          Change Password
        </Button>
      </div>

      {/* Language & Region Card */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 p-2">
            <Globe className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Language & Region</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Language
            </label>
            <div className="relative">
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Time Zone
            </label>
            <div className="relative">
              <select
                value={formData.timeZone}
                onChange={(e) => handleInputChange('timeZone', e.target.value)}
                className="flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
              >
                <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                <option value="Central Time (CT)">Central Time (CT)</option>
                <option value="Eastern Time (ET)">Eastern Time (ET)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" className="px-6 border-border">
          Cancel
        </Button>
        <Button className="px-6 bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,45%)] text-white">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
