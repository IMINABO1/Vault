import { useState, useMemo } from 'react'
import { Search, Upload, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DocumentCard } from '@/components/DocumentCard'
import { useAuth } from '@/contexts/AuthContext'

// Mock documents - backend should provide dates in ISO format (e.g., "2030-01-15")
// The component will automatically format them as "Jan 2030"
const MOCK_DOCUMENTS = [
  {
    id: '1',
    type: 'Passport',
    numberMasked: 'X12•••••••',
    holder: 'Sarah Johnson',
    location: 'USA',
    expires: '2030-01-15', // ISO date format from backend - will be formatted as "Jan 2030"
    status: 'verified',
  },
  {
    id: '2',
    type: 'Driver\'s License',
    numberMasked: 'DL-•••••••••',
    holder: 'Sarah Johnson',
    location: 'California',
    expires: '2027-03-20', // ISO date format from backend - will be formatted as "Mar 2027"
    status: 'verified',
  },
  {
    id: '3',
    type: 'Immigration Permit',
    numberMasked: 'I20-••••••',
    holder: 'Sarah Johnson',
    location: 'USA',
    expires: '2026-06-10', // ISO date format from backend - will be formatted as "Jun 2026"
    status: 'pending',
  },
  {
    id: '4',
    type: 'Vehicle Registration',
    numberMasked: 'VR-••••••••',
    holder: 'Sarah Johnson',
    location: 'California',
    expires: '2024-12-05', // ISO date format from backend - will be formatted as "Dec 2024"
    status: 'expired',
  },
]

export default function DocumentWallet() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [documents] = useState(MOCK_DOCUMENTS)

  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documents
    const q = searchQuery.toLowerCase()
    return documents.filter(
      (doc) =>
        (doc.type && doc.type.toLowerCase().includes(q)) ||
        (doc.numberMasked && doc.numberMasked.toLowerCase().includes(q)) ||
        (doc.number && doc.number.toLowerCase().includes(q))
    )
  }, [documents, searchQuery])

  const stats = useMemo(() => {
    const total = documents.length
    const verified = documents.filter((d) => d.status === 'verified').length
    const pending = documents.filter((d) => d.status === 'pending').length
    const expired = documents.filter((d) => d.status === 'expired').length
    return { total, verified, pending, expired }
  }, [documents])

  const handleDocumentClick = (doc) => {
    // TODO: open document preview / detail
    console.log('Document clicked', doc)
  }

  return (
    <div>
      <header className="dashboard-page-header">
        <div>
          <h1 className="dashboard-page-title">
            Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="dashboard-page-subtitle">
            Manage your verified digital documents securely.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Stats cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-card-label">Total Documents</p>
          <p className="stat-card-value">{stats.total}</p>
        </div>
        <div className="stat-card verified">
          <p className="stat-card-label">Verified</p>
          <p className="stat-card-value">{stats.verified}</p>
          <span className="inline-block mt-1 rounded-full bg-green-200/80 px-2 py-0.5 text-xs font-medium text-green-800">
            Verified
          </span>
        </div>
        <div className="stat-card pending">
          <p className="stat-card-label">Pending Review</p>
          <p className="stat-card-value">{stats.pending}</p>
        </div>
        <div className="stat-card expired">
          <p className="stat-card-label">Expired</p>
          <p className="stat-card-value">{stats.expired}</p>
        </div>
      </div>

      {/* Search and upload */}
      <div className="search-upload-bar">
        <div className="search-input-wrapper">
          <Search className="h-5 w-5" aria-hidden />
          <Input
            type="search"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            aria-label="Search documents"
          />
        </div>
        <Button className="shrink-0 rounded-lg bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,45%)]">
          <Upload className="h-4 w-4" aria-hidden />
          Upload Document
        </Button>
      </div>

      {/* Your documents */}
      <h2 className="documents-section-title">Your Documents</h2>
      <div className="documents-grid">
        {filteredDocuments.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onClick={handleDocumentClick}
          />
        ))}
      </div>
      {filteredDocuments.length === 0 && (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No documents match your search.
        </p>
      )}
    </div>
  )
}
