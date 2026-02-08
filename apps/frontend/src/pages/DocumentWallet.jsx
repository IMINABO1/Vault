import { useState, useEffect, useMemo, useRef } from 'react'
import { Search, Upload, Plus, X, FileUp, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardCarousel } from '@/components/CardCarousel'
import { CardZoomOverlay } from '@/components/CardZoomOverlay'

const DOCUMENT_TYPES = [
  'Driver\'s License',
  'Passport',
  'Immigration Permit',
  'Vehicle Registration',
]

// Normalize backend document shape to what the frontend components expect
function normalizeDocument(doc) {
  return {
    ...doc,
    number: doc.docNumber || doc.number,
    expires: doc.expiryDate || doc.expires,
    status: (doc.status || 'verified').toLowerCase(),
    location: doc.issuingCountry || doc.location || '',
    keyFields: doc.keyFields || [],
  }
}

export default function DocumentWallet() {
  const [searchQuery, setSearchQuery] = useState('')
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomedDocument, setZoomedDocument] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [uploadFile, setUploadFile] = useState(null)
  const [documentType, setDocumentType] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef(null)

  // Fetch documents from backend on mount
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
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.details || data.error || 'Upload failed')
      }
      // Add the newly verified document to state
      if (data.document) {
        setDocuments((prev) => [...prev, normalizeDocument(data.document)])
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
        (doc.number && doc.number.toLowerCase().includes(q)) ||
        (doc.holder && doc.holder.toLowerCase().includes(q))
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
      <div className="w-full text-left mb-3 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
          Your Vault
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Swipe through your IDs or tap to view details.
        </p>
      </div>

      {/* Stats */}
      <div className="w-full">
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
      <div className="w-full mb-4 sm:mb-6">
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
            <span className="hidden sm:inline">Upload Document</span>
          </Button>
        </div>
      </div>

      {/* Card Carousel */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
        </div>
      ) : fetchError ? (
        <p className="text-sm text-red-600 py-8 text-center">
          {fetchError}
        </p>
      ) : filteredDocuments.length > 0 ? (
        <div className="w-full mb-4 sm:mb-8">
          <CardCarousel
            documents={filteredDocuments}
            activeIndex={clampedIndex}
            onActiveIndexChange={setActiveIndex}
            onCardClick={(doc) => setZoomedDocument(doc)}
          />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground py-8 text-center">
          {documents.length === 0 ? 'No documents yet. Upload your first document!' : 'No documents match your search.'}
        </p>
      )}

      {/* Add New Document */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-10">
        <button
          className="w-full h-14 border-2 border-dashed border-border rounded-xl flex items-center justify-center gap-2 text-muted-foreground hover:text-[hsl(221,83%,53%)] hover:border-[hsl(221,83%,53%)] hover:bg-accent transition-colors"
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
          <div className="relative bg-card rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 border border-border">
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
                    className="flex h-10 w-full rounded-lg border-[0.5px] border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
                    className="w-full h-28 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-[hsl(221,83%,53%)] hover:border-[hsl(221,83%,53%)] hover:bg-accent transition-colors"
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
