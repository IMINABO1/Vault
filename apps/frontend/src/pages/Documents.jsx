import { useState, useEffect, useMemo } from 'react'
import { FileText, Calendar, CheckCircle2, Clock, XCircle, Eye, Bell, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

// Normalize backend document shape to what the frontend expects
function normalizeDocument(doc) {
  return {
    ...doc,
    number: doc.docNumber || doc.number,
    expires: doc.expiryDate || doc.expires,
    status: (doc.status || 'verified').toLowerCase(),
    keyFields: doc.keyFields || [],
  }
}

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
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch('/api/documents')
        if (!res.ok) throw new Error('Failed to load documents')
        const data = await res.json()
        setDocuments((data.documents || []).map(normalizeDocument))
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDocuments()
  }, [])

  const filteredDocuments = useMemo(() => {
    if (filter === 'all') return documents
    return documents.filter(doc => doc.status === filter)
  }, [filter, documents])

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
        <div>
          <h1 className="dashboard-page-title">All Documents</h1>
          <p className="dashboard-page-subtitle">
            View and organize all your documents.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card hover:bg-accent transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-semibold text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>

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
                px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors border
                ${filter === key
                  ? `${getFilterButtonColor(key)} text-white border-transparent`
                  : 'bg-card text-foreground border-border hover:bg-accent'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
        </div>
      ) : fetchError ? (
        <p className="text-sm text-red-600 py-8 text-center">{fetchError}</p>
      ) : filteredDocuments.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          {documents.length === 0 ? 'No documents yet. Upload your first document from the Vault.' : 'No documents match this filter.'}
        </p>
      ) : (
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-foreground">Document Type</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-foreground hidden sm:table-cell">Document Number</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-foreground hidden md:table-cell">Holder</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-foreground hidden md:table-cell">Expiry Date</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-foreground">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded ${getDocumentTypeBgColor(doc.status)}`}>
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm text-foreground">{doc.type}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
                    <span className="text-sm text-foreground font-mono">{doc.number}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-foreground">{doc.holder}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{formatDate(doc.expires)}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4">
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
                  <td className="px-3 sm:px-6 py-4">
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
      )}
    </div>
  )
}
