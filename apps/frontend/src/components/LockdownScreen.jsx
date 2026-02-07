import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Lock } from 'lucide-react'
import { CardCarousel } from '@/components/CardCarousel'

function normalizeDocument(doc) {
  return {
    ...doc,
    number: doc.docNumber || doc.number,
    expires: doc.expiryDate || doc.expires,
    status: (doc.status || 'verified').toLowerCase(),
    location: doc.issuingCountry || doc.location || '',
  }
}

export function LockdownScreen({ onExit }) {
  const [documents, setDocuments] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [pin, setPin] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [notified, setNotified] = useState(false)
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  // Fetch documents first, then trigger safety beacon (avoids db.json race condition)
  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/documents')
        if (res.ok) {
          const data = await res.json()
          setDocuments((data.documents || []).map(normalizeDocument))
        }
      } catch {}

      // Now trigger safety beacon after documents are loaded
      try {
        const res = await fetch('/api/safety/trigger', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude: 40.7128, longitude: -74.006 }),
        })
        const data = await res.json()
        if (data.success) setNotified(true)
      } catch {}
    }
    init()
  }, [])

  // Block escape key and browser back
  useEffect(() => {
    const blockKeys = (e) => {
      if (e.key === 'Escape') e.preventDefault()
    }
    const blockBack = () => {
      window.history.pushState(null, '', window.location.href)
    }

    window.addEventListener('keydown', blockKeys)
    window.addEventListener('popstate', blockBack)
    window.history.pushState(null, '', window.location.href)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', blockKeys)
      window.removeEventListener('popstate', blockBack)
      document.body.style.overflow = ''
    }
  }, [])

  // Focus first input on mount
  useEffect(() => {
    inputRefs[0].current?.focus()
  }, [])

  const handleDigitChange = (index, value) => {
    if (!/^\d?$/.test(value)) return
    const newPin = [...pin]
    newPin[index] = value
    setPin(newPin)
    setError('')

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handlePinKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = useCallback(async () => {
    const inputPin = pin.join('')
    if (inputPin.length !== 4) {
      setError('Enter all 4 digits')
      return
    }

    setVerifying(true)
    setError('')
    try {
      const res = await fetch('/api/privacy/exit-lockdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputPin }),
      })
      const data = await res.json()
      if (data.authenticated) {
        onExit()
      } else {
        setError('Incorrect PIN')
        setPin(['', '', '', ''])
        inputRefs[0].current?.focus()
      }
    } catch {
      setError('Verification failed')
    } finally {
      setVerifying(false)
    }
  }, [pin, onExit])

  // Auto-submit when all 4 digits entered
  useEffect(() => {
    if (pin.every((d) => d !== '')) {
      handleSubmit()
    }
  }, [pin, handleSubmit])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldAlert className="h-6 w-6 text-red-500" />
            <h1 className="text-xl font-bold text-red-500 uppercase tracking-widest">
              Lockdown Mode
            </h1>
          </div>
          {notified && (
            <p className="text-xs text-amber-400">
              Emergency contacts have been notified
            </p>
          )}
        </div>

        {/* Document Carousel */}
        {documents.length > 0 && (
          <div className="w-full max-w-[90vw] sm:max-w-md px-4 mb-8">
            <CardCarousel
              documents={documents}
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
            />
          </div>
        )}

        {/* PIN Entry */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lock className="h-4 w-4 text-white/60" />
            <p className="text-sm text-white/60">Enter PIN to exit</p>
          </div>
          <div className="flex gap-3 justify-center mb-3">
            {pin.map((digit, i) => (
              <input
                key={i}
                ref={inputRefs[i]}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handlePinKeyDown(i, e)}
                className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-white/20 bg-white/10 text-white focus:border-red-500 focus:outline-none transition-colors"
              />
            ))}
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {verifying && <p className="text-sm text-white/40">Verifying...</p>}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
