import { useState, useMemo, useRef } from 'react'
import { Search, Upload, Plus, X, FileUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardCarousel } from '@/components/CardCarousel'
import { CardZoomOverlay } from '@/components/CardZoomOverlay'
import { useAuth } from '@/contexts/AuthContext'

// Mock documents - backend should provide dates in ISO format (e.g., "2030-01-15")
const MOCK_DOCUMENTS = [
  {
    id: '1',
    type: 'Driver\'s License',
    numberMasked: 'DL-•••••••••',
    holder: 'Sarah Johnson',
    location: 'California',
    expires: '2026-12-20',
    status: 'verified',
  },
  {
    id: '2',
    type: 'Vehicle Registration',
    numberMasked: 'VR-••••••••',
    holder: 'Sarah Johnson',
    location: 'California',
    expires: '2025-08-05',
    status: 'verified',
  },
  {
    id: '3',
    type: 'Passport',
    numberMasked: 'X12•••••••',
    holder: 'Sarah Johnson',
    location: 'USA',
    expires: '2029-05-15',
    status: 'verified',
  },
  {
    id: '4',
    type: 'Immigration Permit',
    numberMasked: 'I20-••••••',
    holder: 'Sarah Johnson',
    location: 'USA',
    expires: '2024-01-10',
    status: 'expired',
  },
]

const DOCUMENT_TYPES = [
  'Driver\'s License',
  'Passport',
  'Immigration Permit',
  'Vehicle Registration',
]

export default function DocumentWallet() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [documents] = useState(MOCK_DOCUMENTS)
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomedDocument, setZoomedDocument] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [uploadFile, setUploadFile] = useState(null)
  const [documentType, setDocumentType] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadFile(file)
      setUploadError('')
    }
  }

  const handleUpload = async () => {
    if (!uploadFile || !documentType) {
      setUploadError('Please select a document type and file.')
      return
    }
    setUploading(true)
    setUploadError('')
    try {
      const formData = new FormData()
      formData.append('document', uploadFile)
      formData.append('documentType', documentType)
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Upload failed')
      }
      setUploadSuccess(true)
      setTimeout(() => {
        setShowUpload(false)
        setUploadFile(null)
        setDocumentType('')
        setUploadSuccess(false)
      }, 1500)
    } catch (err) {
      setUploadError(err.message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const closeUploadDialog = () => {
    setShowUpload(false)
    setUploadFile(null)
    setDocumentType('')
    setUploadError('')
    setUploadSuccess(false)
  }

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

  // Clamp activeIndex when filtered list shrinks
  const clampedIndex = Math.min(activeIndex, Math.max(0, filteredDocuments.length - 1))

  return (
    <div className="flex flex-col items-center">
      {/* Page Header */}
      <div className="w-full text-left mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Your Vault
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Swipe through your IDs or tap to view details.
        </p>
      </div>

      {/* Stats */}
      <div className="w-full mb-8">
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-card-label">Total Documents</p>
            <p className="stat-card-value">{stats.total}</p>
          </div>
          <div className="stat-card verified">
            <p className="stat-card-label">Verified</p>
            <p className="stat-card-value">{stats.verified}</p>
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
      </div>

      {/* Search */}
      <div className="w-full mb-6">
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
          <Button
            className="shrink-0 rounded-lg bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,45%)]"
            onClick={() => setShowUpload(true)}
          >
            <Upload className="h-4 w-4" aria-hidden />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Card Carousel */}
      {filteredDocuments.length > 0 ? (
        <div className="w-full mb-8">
          <CardCarousel
            documents={filteredDocuments}
            activeIndex={clampedIndex}
            onActiveIndexChange={setActiveIndex}
            onCardClick={(doc) => setZoomedDocument(doc)}
          />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No documents match your search.
        </p>
      )}

      {/* Add New Document */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto mb-10">
        <button
          className="w-full h-14 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center gap-2 text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors"
          onClick={() => setShowUpload(true)}
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add New Document</span>
        </button>
      </div>

      {/* Zoom Overlay */}
      <CardZoomOverlay
        document={zoomedDocument}
        isOpen={!!zoomedDocument}
        onClose={() => setZoomedDocument(null)}
      />

      {/* Upload Dialog */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeUploadDialog}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
            <button
              onClick={closeUploadDialog}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-foreground mb-1">Upload Document</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Upload a document for verification.
            </p>

            {uploadSuccess ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-green-700">Upload successful!</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Document Type
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="flex h-10 w-full rounded-lg border-[0.5px] border-border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Select type...</option>
                    {DOCUMENT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Document File
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-28 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <FileUp className="w-6 h-6" />
                    <span className="text-sm font-medium">
                      {uploadFile ? uploadFile.name : 'Click to select file'}
                    </span>
                  </button>
                </div>

                {uploadError && (
                  <p className="text-sm text-red-600 mb-4">{uploadError}</p>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={closeUploadDialog}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,45%)]"
                    onClick={handleUpload}
                    disabled={uploading || !uploadFile || !documentType}
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
