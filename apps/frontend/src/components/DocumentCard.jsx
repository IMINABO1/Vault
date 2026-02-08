import { ShieldCheck, Clock, XCircle, Wifi, Sparkles, Globe, CreditCard, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Noise texture as inline SVG data URI (no external dependency)
const NOISE_TEXTURE = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

// Card configuration per document type
const CARD_CONFIG = {
  'driver\'s license': {
    gradient: 'bg-gradient-to-br from-blue-700 via-indigo-800 to-violet-900',
    label: 'Driver License',
    Icon: CreditCard,
  },
  'passport': {
    gradient: 'bg-gradient-to-br from-slate-800 via-zinc-900 to-black',
    label: 'Passport',
    Icon: Globe,
  },
  'immigration permit': {
    gradient: 'bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800',
    label: 'Visa / I-20',
    Icon: FileText,
  },
  'vehicle registration': {
    gradient: 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800',
    label: 'Vehicle Registration',
    Icon: FileText,
  },
  default: {
    gradient: 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900',
    label: 'Document',
    Icon: FileText,
  },
}

function getCardConfig(docType) {
  const key = docType?.toLowerCase() || ''
  return CARD_CONFIG[key] || CARD_CONFIG.default
}

// Helper function to format date from backend
function formatExpirationDate(dateInput) {
  if (!dateInput) return null

  // If it's already formatted like "MM/YYYY" or "Jan 2030", return as is
  if (typeof dateInput === 'string' && /^(\d{2}\/\d{4}|[A-Za-z]{3}\s\d{4})$/.test(dateInput.trim())) {
    return dateInput.trim()
  }

  try {
    const date = new Date(dateInput)
    if (isNaN(date.getTime())) return dateInput
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${year}`
  } catch {
    return dateInput
  }
}

export function DocumentCard({
  document: doc,
  onClick,
  isActive = false,
  variant = 'stack',
  isFlipped = false,
}) {
  const status = doc.status || 'verified'
  const config = getCardConfig(doc.type)
  const TypeIcon = config.Icon
  const expirationDate = formatExpirationDate(doc.expires || doc.expirationDate || doc.expiryDate)
  const isZoomed = variant === 'zoomed'
  const keyFields = doc.keyFields || []

  const handleClick = () => {
    onClick?.(doc)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className="flip-card-container document-card-vibrant"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`${doc.type || 'Document'}${isActive ? ', active' : ''}${isFlipped ? ', showing key details' : ''}`}
    >
      <motion.div
        className="flip-card-inner w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* ===== FRONT FACE ===== */}
        <div
          className={cn(
            'flip-card-front w-full h-full rounded-2xl overflow-hidden select-none border border-white/10 outline-none',
            config.gradient,
            isActive ? 'shadow-2xl' : 'shadow-lg',
            isActive && !isZoomed && 'ring-2 ring-offset-2 ring-blue-500/50',
          )}
        >
          {/* Noise Texture Overlay */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: NOISE_TEXTURE }}
          />

          {/* Top-right white blur orb */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Bottom-left dark blur orb */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/30 rounded-full blur-3xl pointer-events-none" />

          {/* Content Layer */}
          <div className="relative h-full p-5 sm:p-6 flex flex-col justify-between z-10">

            {/* Header Row */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-inner">
                  <TypeIcon className="w-5 h-5 text-white/90" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white font-bold text-lg leading-none tracking-tight drop-shadow-md">
                    {config.label}
                  </h3>
                  <span className="text-white/50 text-[10px] uppercase tracking-widest font-semibold mt-1">
                    Official Document
                  </span>
                </div>
              </div>

              {/* Status Badge - visible when active or zoomed */}
              {(isActive || isZoomed) && status === 'verified' && (
                <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                </div>
              )}
              {(isActive || isZoomed) && status === 'pending' && (
                <div className="bg-orange-500/20 backdrop-blur-md border border-orange-400/30 text-orange-100 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Clock className="w-3 h-3 text-orange-300" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Pending</span>
                </div>
              )}
              {(isActive || isZoomed) && status === 'expired' && (
                <div className="bg-red-500/20 backdrop-blur-md border border-red-400/30 text-red-100 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <XCircle className="w-3 h-3 text-red-300" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Expired</span>
                </div>
              )}
            </div>

            {/* Middle - Chip + NFC graphic */}
            <div className="flex items-center gap-2 opacity-80">
              {/* Credit card chip */}
              <div className="w-10 h-8 rounded-md border border-white/20 bg-gradient-to-br from-yellow-100/20 to-yellow-600/20 backdrop-blur-md relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-white/5" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20" />
                <div className="absolute top-0 left-1/3 h-full w-[1px] bg-white/20" />
                <div className="absolute top-0 right-1/3 h-full w-[1px] bg-white/20" />
              </div>
              <Wifi className="w-5 h-5 rotate-90 text-white/50" />
              {isActive && <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse ml-auto" />}
            </div>

            {/* Bottom Data Row */}
            <div className="grid grid-cols-2 items-end">
              <div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Holder Name</p>
                <p className="text-white font-mono text-base sm:text-lg font-medium tracking-wide truncate drop-shadow-sm">
                  {doc.holder || 'Unknown'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Expires</p>
                <p className="text-white font-mono text-sm sm:text-base font-medium tracking-wide drop-shadow-sm">
                  {expirationDate || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BACK FACE ===== */}
        <div
          className={cn(
            'flip-card-back w-full h-full rounded-2xl overflow-hidden select-none border border-white/10',
            config.gradient,
            isActive ? 'shadow-2xl' : 'shadow-lg',
          )}
        >
          {/* Noise Texture Overlay */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: NOISE_TEXTURE }}
          />

          {/* Top-right white blur orb */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Bottom-left dark blur orb */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/30 rounded-full blur-3xl pointer-events-none" />

          {/* Content Layer */}
          <div className="relative h-full p-5 sm:p-7 flex flex-col z-10">

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-inner">
                <TypeIcon className="w-6 h-6 text-white/90" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-white font-bold text-xl leading-none tracking-tight drop-shadow-md">
                  {config.label}
                </h3>
                <span className="text-white/50 text-[11px] uppercase tracking-widest font-semibold mt-1">
                  Key Information
                </span>
              </div>
            </div>

            {/* Key Fields */}
            {keyFields.length > 0 ? (
              <dl className="flex-1 overflow-y-auto scrollbar-hide space-y-2 min-h-0">
                {keyFields.map((field, i) => (
                  <div key={i} className="flex justify-between items-baseline gap-4 py-1.5 border-b border-white/10 last:border-0">
                    <dt className="text-[11px] sm:text-xs text-white/50 uppercase tracking-widest font-semibold shrink-0">
                      {field.label}
                    </dt>
                    <dd className="text-white font-mono text-sm sm:text-base font-medium text-right break-all">
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <FileText className="w-8 h-8 text-white/20 mb-2" />
                <p className="text-white/40 text-sm">No detailed info available</p>
                <p className="text-white/25 text-xs mt-1">Re-upload to extract key fields</p>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-300/70" />
              <span className="text-[11px] text-white/40 uppercase tracking-widest font-bold">Vault Verified</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
