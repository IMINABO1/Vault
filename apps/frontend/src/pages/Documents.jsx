import { useState, useMemo } from 'react'
import { FileText, Calendar, CheckCircle2, Clock, XCircle, Eye } from 'lucide-react'

const MOCK_DOCUMENTS = [
  {
    id: '1',
    type: 'Passport',
    number: 'X12345678',
    holder: 'Sarah Johnson',
    expires: '2030-01-15',
    status: 'verified',
  },
  {
    id: '2',
    type: 'Driver\'s License',
    number: 'DL-987654321',
    holder: 'Sarah Johnson',
    expires: '2027-03-20',
    status: 'verified',
  },
  {
    id: '3',
    type: 'Immigration Permit',
    number: 'IP-2024-A1B2C3',
    holder: 'Sarah Johnson',
    expires: '2026-02-15',
    status: 'pending',
  },
  {
    id: '4',
    type: 'Vehicle Registration',
    number: 'VR-7ABC123',
    holder: 'Sarah Johnson',
    expires: '2024-06-10',
    status: 'expired',
  },
]

// Helper to format date
function formatDate(dateInput) {
  if (!dateInput) return ''
  try {
    const date = new Date(dateInput)
    if (isNaN(date.getTime())) return dateInput
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const year = date.getFullYear()
    return `${month} ${year}`
  } catch {
    return dateInput
  }
}

// Get document type icon background color based on STATUS (color-matched)
function getDocumentTypeBgColor(status) {
  const colors = {
    'verified': 'bg-green-500',
    'pending': 'bg-orange-500',
    'expired': 'bg-red-500',
  }
  return colors[status] || 'bg-gray-500'
}

// Get filter button color when active
function getFilterButtonColor(filterKey) {
  const colors = {
    'all': 'bg-[hsl(221,83%,53%)]',
    'verified': 'bg-green-600',
    'pending': 'bg-orange-600',
    'expired': 'bg-red-600',
  }
  return colors[filterKey] || 'bg-[hsl(221,83%,53%)]'
}

export default function Documents() {
  const [filter, setFilter] = useState('all')

  const filteredDocuments = useMemo(() => {
    if (filter === 'all') return MOCK_DOCUMENTS
    return MOCK_DOCUMENTS.filter(doc => doc.status === filter)
  }, [filter])

  return (
    <div className="min-h-screen bg-white">
      <header className="dashboard-page-header mb-6">
        <div>
          <h1 className="dashboard-page-title">All Documents</h1>
          <p className="dashboard-page-subtitle">
            View and organize all your documents.
          </p>
        </div>
      </header>

      {/* Filter buttons */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-foreground">Filter:</span>
          {[
            { key: 'all', label: 'All Documents' },
            { key: 'verified', label: 'Verified' },
            { key: 'pending', label: 'Pending' },
            { key: 'expired', label: 'Expired' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors border-[0.5px]
                ${filter === key
                  ? `${getFilterButtonColor(key)} text-white border-transparent`
                  : 'bg-white text-foreground border-border hover:bg-muted'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents table */}
      <div className="bg-white rounded-xl border-[0.5px] border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b-[0.5px] border-border">
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Document Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Document Number</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Holder</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b-[0.5px] border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded ${getDocumentTypeBgColor(doc.status)}`}>
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm text-foreground">{doc.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground font-mono">{doc.number}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{doc.holder}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{formatDate(doc.expires)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {doc.status === 'verified' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium border-[0.5px] border-green-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-700 fill-green-700" />
                        Verified
                      </span>
                    )}
                    {doc.status === 'pending' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium border-[0.5px] border-amber-200">
                        <Clock className="h-3.5 w-3.5 text-amber-700 fill-amber-700" />
                        Pending
                      </span>
                    )}
                    {doc.status === 'expired' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium border-[0.5px] border-red-200">
                        <XCircle className="h-3.5 w-3.5 text-red-700 fill-red-700" />
                        Expired
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-[hsl(221,83%,53%)] hover:underline flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
