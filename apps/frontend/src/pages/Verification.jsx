import { CheckCircle, Clock, AlertCircle, TrendingUp, Bell, User, Shield, FileCheck } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const MOCK_STATS = {
  verified: 2,
  pending: 1,
  expired: 1,
  verificationRate: 50,
}

const MOCK_ACTIVITIES = [
  {
    id: '1',
    type: 'verified',
    document: 'Passport X12345678',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'pending',
    document: 'Immigration Permit IP-2024-A1B2C3',
    time: '1 day ago',
  },
  {
    id: '3',
    type: 'expired',
    document: 'Vehicle Registration VR-7ABC123',
    time: '3 days ago',
  },
  {
    id: '4',
    type: 'verified',
    document: 'Driver\'s License DL-987654321',
    time: '5 days ago',
  },
]

export default function Verification() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <div>
          <h1 className="dashboard-page-title">Verification Status</h1>
          <p className="dashboard-page-subtitle">Track verification status and history</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors">
            <Bell className="h-5 w-5 text-slate-600" />
          </button>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-semibold text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>

      {/* Inner Section Title */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Verification Status</h2>
        <p className="text-sm text-slate-600 mt-1">Track the verification status of all your documents</p>
      </div>

      {/* Status Cards - Horizontal layout with icon on left */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Verified Card */}
        <div className="status-card status-card-verified">
          <div className="status-card-icon-wrapper status-icon-verified">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="status-card-label">Verified</p>
            <p className="status-card-value status-value-verified">{MOCK_STATS.verified}</p>
          </div>
        </div>

        {/* Pending Card */}
        <div className="status-card status-card-pending">
          <div className="status-card-icon-wrapper status-icon-pending">
            <Clock className="h-10 w-10 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="status-card-label">Pending</p>
            <p className="status-card-value status-value-pending">{MOCK_STATS.pending}</p>
          </div>
        </div>

        {/* Expired Card */}
        <div className="status-card status-card-expired">
          <div className="status-card-icon-wrapper status-icon-expired">
            <AlertCircle className="h-10 w-10 text-rose-600" />
          </div>
          <div className="flex-1">
            <p className="status-card-label">Expired</p>
            <p className="status-card-value status-value-expired">{MOCK_STATS.expired}</p>
          </div>
        </div>

        {/* Verification Rate Card */}
        <div className="status-card status-card-rate">
          <div className="status-card-icon-wrapper status-icon-rate">
            <TrendingUp className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="status-card-label">Verification Rate</p>
            <p className="status-card-value status-value-rate">{MOCK_STATS.verificationRate}%</p>
          </div>
        </div>
      </div>

      {/* Bottom Section - Two Columns (wider left, narrower right) */}
      <div className="verification-bottom-grid">
        {/* Verification Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 p-2">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Verification Overview</h2>
          </div>

          {/* Overall Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-foreground">Overall Progress</span>
              <span className="text-sm font-semibold text-[hsl(221,83%,53%)]">{MOCK_STATS.verificationRate}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all verification-progress-bar"
                style={{ width: `${MOCK_STATS.verificationRate}%` }}
              />
            </div>
          </div>

          {/* Status List */}
          <div className="space-y-3">
            {/* Verified Documents */}
            <div className="verification-status-item verification-status-verified">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex shrink-0">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-emerald-900">Verified Documents</p>
                  <p className="text-xs text-emerald-600">Ready to use and share</p>
                </div>
              </div>
              <span className="text-lg font-bold text-emerald-600">{MOCK_STATS.verified}</span>
            </div>

            {/* Pending Verification */}
            <div className="verification-status-item verification-status-pending">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex shrink-0">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-900">Pending Verification</p>
                  <p className="text-xs text-amber-600">Under review by our team</p>
                </div>
              </div>
              <span className="text-lg font-bold text-amber-600">{MOCK_STATS.pending}</span>
            </div>

            {/* Expired Documents */}
            <div className="verification-status-item verification-status-expired">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex shrink-0">
                  <AlertCircle className="h-8 w-8 text-rose-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-rose-900">Expired Documents</p>
                  <p className="text-xs text-rose-600">Requires renewal or update</p>
                </div>
              </div>
              <span className="text-lg font-bold text-rose-600">{MOCK_STATS.expired}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 p-2">
              <FileCheck className="h-5 w-5 text-slate-700" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          </div>

          <div className="space-y-4">
            {MOCK_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                {activity.type === 'verified' && (
                  <CheckCircle className="h-8 w-8 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {activity.type === 'pending' && (
                  <Clock className="h-8 w-8 text-amber-600 shrink-0 mt-0.5" />
                )}
                {activity.type === 'expired' && (
                  <AlertCircle className="h-8 w-8 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">
                    {activity.type === 'verified' && 'Document Verified'}
                    {activity.type === 'pending' && 'Verification Pending'}
                    {activity.type === 'expired' && 'Document Expired'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{activity.document}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
