import { Shield, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusLabels = {
  verified: 'Verified',
  pending: 'Pending Review',
  expired: 'Expired',
}

const statusIcons = {
  verified: CheckCircle2,
  pending: Clock,
  expired: XCircle,
}

// Helper function to format date from backend
// Accepts: ISO date string, Date object, or formatted string like "Jan 2030"
function formatExpirationDate(dateInput) {
  if (!dateInput) return null
  
  // If it's already formatted (e.g., "Jan 2030"), return as is
  if (typeof dateInput === 'string' && /^[A-Za-z]{3}\s\d{4}$/.test(dateInput.trim())) {
    return dateInput.trim()
  }
  
  try {
    const date = new Date(dateInput)
    if (isNaN(date.getTime())) return dateInput // Return original if invalid
    
    // Format as "Mon YYYY" (e.g., "Jan 2030")
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const year = date.getFullYear()
    return `${month} ${year}`
  } catch {
    return dateInput
  }
}

// Get card background color based on document type and status
// Adds variance: some cards are pale, some are more solid
function getCardColorClass(docType, status, docId) {
  // Map document types to color bases
  const typeColors = {
    'passport': 'blue',
    'driver\'s license': 'green',
    'immigration permit': 'orange',
    'vehicle registration': 'red',
  }
  
  // Fallback to status-based colors if type not found
  const statusColors = {
    verified: 'blue',
    pending: 'orange',
    expired: 'red',
  }
  
  const typeKey = docType?.toLowerCase() || ''
  const colorBase = typeColors[typeKey] || statusColors[status] || 'blue'
  
  // Add variance: use docId or index to alternate between pale and solid
  // This creates visual dynamics - some cards pale, some more solid
  const isSolid = docId ? parseInt(docId) % 2 === 0 : false
  const variant = isSolid ? 'solid' : 'pale'
  
  return `card-bg-${colorBase}-${variant}`
}

export function DocumentCard({ document: doc, onClick }) {
  const status = doc.status || 'verified'
  const StatusIcon = statusIcons[status] || CheckCircle2
  const cardColorClass = getCardColorClass(doc.type, status, doc.id)
  const expirationDate = formatExpirationDate(doc.expires || doc.expirationDate || doc.expiryDate)

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(doc)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(doc)
        }
      }}
      className={cn('document-card-vibrant', cardColorClass)}
    >
      {/* Top section with icon and badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm">
          <Shield className="h-5 w-5 text-white stroke-2" fill="none" aria-hidden />
        </div>
        <span
          className={cn(
            'shrink-0 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5',
            status === 'verified' && 'bg-green-500 text-white',
            status === 'pending' && 'bg-orange-500 text-white',
            status === 'expired' && 'bg-red-500 text-white'
          )}
        >
          <StatusIcon className="h-3 w-3" aria-hidden />
          {statusLabels[status] ?? status}
        </span>
      </div>

      {/* Document type */}
      <h3 className="text-base font-semibold text-white mb-1">{doc.type || 'Document'}</h3>
      
      {/* Masked ID - larger and bold */}
      <p className="text-lg font-bold text-white mb-3 font-mono tracking-wide">
        {doc.numberMasked || doc.number || '••••••••'}
      </p>

      {/* Holder information */}
      <div className="mt-auto space-y-1">
        {doc.holder && (
          <div>
            <p className="text-xs text-white/80">Holder</p>
            <p className="text-sm font-semibold text-white">{doc.holder}</p>
          </div>
        )}
        
        {doc.location && (
          <p className="text-sm text-white/90">{doc.location}</p>
        )}

        {/* Expiration date - formatted from backend */}
        {expirationDate && (
          <div className="mt-2 pt-2 border-t border-white/20">
            <p className="text-xs text-white/80">Expires</p>
            <p className="text-sm font-semibold text-white">{expirationDate}</p>
          </div>
        )}
      </div>
    </article>
  )
}
