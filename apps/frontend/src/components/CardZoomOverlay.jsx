import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DocumentCard } from '@/components/DocumentCard'

const WALLET_STORAGE_KEY = 'vault-added-to-wallet'

function getWalletAdded() {
  try {
    return JSON.parse(localStorage.getItem(WALLET_STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function markWalletAdded(docId, walletType) {
  const current = getWalletAdded()
  current[docId] = { ...current[docId], [walletType]: true }
  localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(current))
}

function AppleWalletIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2Z"/>
      <path d="M3 15h6.4c.331 0 .605.278.75.576c.206.423.694.924 1.85.924s1.644-.5 1.85-.924c.145-.298.419-.576.75-.576H21M3 7h18M3 11h18"/>
    </svg>
  )
}

function GoogleWalletIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 256 273" xmlns="http://www.w3.org/2000/svg">
      <path d="M99.62 122.295c-15.506-21.358-37.01-40.082-61.44-53.102c-3.657-2.048-7.899-3.072-12.141-3.072c-9.509 0-18.14 5.12-22.674 13.605c-6.73 12.434-1.902 28.087 10.532 34.67c37.596 20.187 61.879 58.514 64.805 102.985v-.147c-.44-4.973.439-9.8 2.633-14.336c.292-.585.731-1.316 1.17-2.048a124.171 124.171 0 0 0 17.993-64.365c0-4.828-.439-9.509-.877-14.19" fill="#1476C6"/>
      <path d="M248.54 74.02a277.44 277.44 0 0 0-20.042-57.636c-4.68-9.801-14.775-16.238-25.6-16.238c-4.242 0-8.338.878-12.141 2.78c-14.19 6.729-20.188 23.698-13.459 37.741c14.336 30.428 21.504 62.464 21.504 95.818c0 33.353-7.168 65.39-21.211 95.232c-.146.438-2.633 5.705-2.633 11.849c0 1.755.146 4.242.731 6.583c1.902 8.045 7.022 15.36 15.506 19.31c3.804 1.755 7.9 2.779 12.142 2.779c10.386 0 19.895-5.705 24.869-14.775c5.705-10.679 11.41-24.576 16.384-42.57a212.614 212.614 0 0 0 4.096-15.944c4.535-20.334 7.021-41.107 7.021-62.464c-.146-21.066-2.633-42.277-7.168-62.464" fill="#47AE33"/>
      <path d="M128.731 44.325c-.438-.878-1.024-1.61-1.609-2.341c-1.901-2.487-4.096-4.535-6.729-6.144c-4.242-2.78-9.362-4.389-14.628-4.389c-4.389 0-6.583.586-9.655 1.756c-3.219 1.316-6.583 3.072-9.655 6.29c-3.072 3.218-4.828 6.437-6.144 9.948c-2.633 6.875-2.194 15.798 2.194 23.113c9.362 15.067 14.921 32.329 16.97 50.03c.584 4.68.877 9.508.877 14.19c0 22.82-6.144 45.055-17.993 64.365c-.439.731-.732 1.316-1.17 2.048c-2.341 4.535-3.072 9.655-2.634 14.482c.732 8.192 5.267 15.945 12.874 20.626c1.901 1.17 4.096 2.048 6.144 2.78c2.486.731 5.12 1.17 7.753 1.17c9.508 0 18.14-4.827 23.113-13.02c14.921-24.429 23.552-52.223 25.454-80.749c.292-3.803.438-7.753.438-11.557c.147-33.06-8.777-64.95-25.6-92.598" fill="#ED114C"/>
      <path d="M177.445 231.717c14.19-29.843 21.357-61.88 21.357-95.232c0-11.41-.731-19.749-1.316-25.162c-18.579-29.696-45.495-56.32-77.093-75.63c0 0 .732.44.732.586c2.194 1.609 3.95 3.218 5.997 5.705c.44.585 1.17 1.463 1.61 2.34c16.822 27.795 25.6 59.539 25.6 92.16c0 3.95-.147 7.754-.44 11.557c13.459 25.6 20.773 54.711 20.773 85.285v9.216c.146-3.219.878-6.583 2.048-9.509c.439-.439.585-.878.732-1.316" fill="#FBBF16"/>
    </svg>
  )
}

export function CardZoomOverlay({ document: doc, isOpen, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [walletState, setWalletState] = useState({})

  // Load wallet state when doc changes
  useEffect(() => {
    if (doc?.id) {
      const added = getWalletAdded()
      setWalletState(added[doc.id] || {})
    }
  }, [doc?.id])

  const handleAddToWallet = (walletType) => {
    if (!doc?.id) return
    markWalletAdded(doc.id, walletType)
    setWalletState(prev => ({ ...prev, [walletType]: true }))
  }

  const showApple = !walletState.apple
  const showGoogle = !walletState.google
  const showWalletButtons = showApple || showGoogle

  // Escape key to dismiss
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    },
    [isOpen, onClose]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Reset flip when overlay closes
  useEffect(() => {
    if (!isOpen) setIsFlipped(false)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && doc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Zoomed card + wallet buttons + hint */}
          <motion.div
            className="relative z-10 w-full max-w-[90vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-4 sm:px-0 flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <DocumentCard
              document={doc}
              isActive
              variant="zoomed"
              isFlipped={isFlipped}
              onClick={() => setIsFlipped(prev => !prev)}
            />

            {/* Add to Wallet Buttons */}
            {showWalletButtons && (
              <motion.div
                className="flex flex-col sm:flex-row items-center gap-3 mt-5 w-full max-w-sm sm:max-w-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {showApple && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToWallet('apple')
                    }}
                    className="wallet-btn wallet-btn-apple"
                    aria-label="Add to Apple Wallet"
                  >
                    <AppleWalletIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[9px] sm:text-[10px] font-medium opacity-80 uppercase tracking-wide">Add to</span>
                      <span className="text-sm sm:text-base font-semibold -mt-0.5">Apple Wallet</span>
                    </div>
                  </button>
                )}

                {showGoogle && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToWallet('google')
                    }}
                    className="wallet-btn wallet-btn-google"
                    aria-label="Add to Google Wallet"
                  >
                    <GoogleWalletIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[9px] sm:text-[10px] font-medium opacity-80 uppercase tracking-wide">Add to</span>
                      <span className="text-sm sm:text-base font-semibold -mt-0.5">Google Wallet</span>
                    </div>
                  </button>
                )}
              </motion.div>
            )}

            <p className="text-center text-white/50 text-xs mt-4">
              {isFlipped ? 'Tap card to see front' : 'Tap card to see details'}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
