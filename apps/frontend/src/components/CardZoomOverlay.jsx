import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DocumentCard } from '@/components/DocumentCard'

export function CardZoomOverlay({ document: doc, isOpen, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false)

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

          {/* Zoomed card + hint */}
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
            <p className="text-center text-white/50 text-xs mt-4">
              {isFlipped ? 'Tap card to see front' : 'Tap card to see details'}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
