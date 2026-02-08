import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { DocumentCard } from '@/components/DocumentCard'

// How many cards peek on each side of the active card
const PEEK_COUNT = 2
// Horizontal offset per depth level (% of card width)
const OFFSET_X_PCT = 18
// Scale shrink per depth level
const SCALE_STEP = 0.08

const springTransition = { type: 'spring', stiffness: 300, damping: 30 }

// Wrapping modular distance: shortest path around the ring
function ringOffset(i, active, len) {
  let diff = i - active
  if (diff > len / 2) diff -= len
  if (diff < -len / 2) diff += len
  return diff
}

export function CardCarousel({
  documents,
  activeIndex,
  onActiveIndexChange,
  onCardClick,
}) {
  const [dragStart, setDragStart] = useState(null)
  const len = documents.length

  const goNext = useCallback(() => {
    onActiveIndexChange((activeIndex + 1) % len)
  }, [activeIndex, len, onActiveIndexChange])

  const goPrev = useCallback(() => {
    onActiveIndexChange((activeIndex - 1 + len) % len)
  }, [activeIndex, len, onActiveIndexChange])

  // Swipe handling (touch + mouse)
  const handleDragStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    setDragStart(clientX)
  }

  const handleDragEnd = (e) => {
    if (dragStart === null) return
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const diff = dragStart - clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
    setDragStart(null)
  }

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          goPrev()
          break
        case 'ArrowRight':
          e.preventDefault()
          goNext()
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          onCardClick?.(documents[activeIndex])
          break
      }
    },
    [activeIndex, documents, goNext, goPrev, onCardClick]
  )

  if (len === 0) return null

  // Build visible cards: active + PEEK_COUNT on each side (wrapping)
  const renderOrder = []
  for (let i = 0; i < len; i++) {
    const offset = ringOffset(i, activeIndex, len)
    if (Math.abs(offset) <= PEEK_COUNT) {
      renderOrder.push({ doc: documents[i], index: i, offset })
    }
  }
  // Paint back-to-front: highest abs(offset) first, then active on top
  renderOrder.sort((a, b) => Math.abs(b.offset) - Math.abs(a.offset))

  return (
    <div className="w-full max-w-lg lg:max-w-xl mx-auto overflow-hidden">
      {/* Stack container */}
      <div
        className="relative w-full outline-none"
        role="listbox"
        aria-label="Document carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {/* Invisible spacer to set height from aspect ratio */}
        <div className="document-card-vibrant invisible w-full" aria-hidden />

        {/* Stacked cards fanning left + right */}
        {renderOrder.map(({ doc, index, offset }) => {
          const absOffset = Math.abs(offset)
          const isActive = offset === 0

          return (
            <motion.div
              key={doc.id}
              className="absolute inset-0"
              style={{
                zIndex: PEEK_COUNT + 1 - absOffset,
                transformOrigin: 'center top',
              }}
              animate={{
                x: `${offset * OFFSET_X_PCT}%`,
                scale: 1 - absOffset * SCALE_STEP,
                opacity: isActive ? 1 : Math.max(0.3, 0.7 - (absOffset - 1) * 0.2),
              }}
              transition={springTransition}
              role="option"
              aria-selected={isActive}
              onClick={() => {
                if (isActive) {
                  onCardClick?.(doc)
                } else {
                  onActiveIndexChange(index)
                }
              }}
            >
              <DocumentCard
                document={doc}
                isActive={isActive}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
