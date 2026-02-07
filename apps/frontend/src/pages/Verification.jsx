import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react'

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
  return (
    <div className="min-h-screen bg-white">
      <header className="dashboard-page-header mb-6">
        <div>
          <h1 className="dashboard-page-title">Verification Status</h1>
          <p className="dashboard-page-subtitle">
            Track the verification status of all your documents.
          </p>
        </div>
      </header>

      {/* Status Cards - Horizontal layout with icon on left */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Verified Card */}
        <div className="status-card status-card-verified">
          <div className="status-card-icon-wrapper status-icon-verified">
            <CheckCircle2 className="h-6 w-6 text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="status-card-label">Verified</p>
            <p className="status-card-value status-value-verified">{MOCK_STATS.verified}</p>
          </div>
        </div>

        {/* Pending Card */}
        <div className="status-card status-card-pending">
          <div className="status-card-icon-wrapper status-icon-pending">
            <Clock className="h-6 w-6 text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="status-card-label">Pending</p>
            <p className="status-card-value status-value-pending">{MOCK_STATS.pending}</p>
          </div>
        </div>

        {/* Expired Card */}
        <div className="status-card status-card-expired">
          <div className="status-card-icon-wrapper status-icon-expired">
            <AlertCircle className="h-6 w-6 text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="status-card-label">Expired</p>
            <p className="status-card-value status-value-expired">{MOCK_STATS.expired}</p>
          </div>
        </div>

        {/* Verification Rate Card */}
        <div className="status-card status-card-rate">
          <div className="status-card-icon-wrapper status-icon-rate">
            <TrendingUp className="h-6 w-6 text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="status-card-label">Verification Rate</p>
            <p className="status-card-value status-value-rate">{MOCK_STATS.verificationRate}%</p>
          </div>
        </div>
      </div>

      {/* Bottom Section - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Overview */}
        <div className="bg-white rounded-xl border-[0.5px] border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Verification Overview</h2>
          
          {/* Overall Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-foreground">Overall Progress</span>
              <span className="text-sm font-semibold text-[hsl(221,83%,53%)]">{MOCK_STATS.verificationRate}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-[hsl(221,83%,53%)] rounded-full transition-all"
                style={{ width: `${MOCK_STATS.verificationRate}%` }}
              />
            </div>
          </div>

          {/* Status List */}
          <div className="space-y-3">
            {/* Verified Documents */}
            <div className="verification-status-item verification-status-verified">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-white fill-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Verified Documents</p>
                  <p className="text-xs text-muted-foreground">Ready to use and share</p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600">{MOCK_STATS.verified}</span>
            </div>

            {/* Pending Verification */}
            <div className="verification-status-item verification-status-pending">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 shrink-0">
                  <Clock className="h-4 w-4 text-white fill-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Pending Verification</p>
                  <p className="text-xs text-muted-foreground">Under review by our team</p>
                </div>
              </div>
              <span className="text-lg font-bold text-orange-600">{MOCK_STATS.pending}</span>
            </div>

            {/* Expired Documents */}
            <div className="verification-status-item verification-status-expired">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 shrink-0">
                  <AlertCircle className="h-4 w-4 text-white fill-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Expired Documents</p>
                  <p className="text-xs text-muted-foreground">Requires renewal or update</p>
                </div>
              </div>
              <span className="text-lg font-bold text-red-600">{MOCK_STATS.expired}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border-[0.5px] border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          
          <div className="space-y-4">
            {MOCK_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b-[0.5px] border-border last:border-0 last:pb-0">
                {activity.type === 'verified' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-white fill-white" />
                  </div>
                )}
                {activity.type === 'pending' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 shrink-0 mt-0.5">
                    <Clock className="h-4 w-4 text-white fill-white" />
                  </div>
                )}
                {activity.type === 'expired' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 shrink-0 mt-0.5">
                    <AlertCircle className="h-4 w-4 text-white fill-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.type === 'verified' && 'Document Verified'}
                    {activity.type === 'pending' && 'Verification Pending'}
                    {activity.type === 'expired' && 'Document Expired'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{activity.document}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
