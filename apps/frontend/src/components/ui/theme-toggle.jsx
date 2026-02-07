import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light') {
        setIsDark(false)
      } else if (stored === 'dark') {
        setIsDark(true)
      } else {
        // fallback to document class
        setIsDark(document.documentElement.classList.contains('dark'))
      }
    } catch (e) {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    try {
      if (next) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <button
      type="button"
      aria-pressed={isDark}
      onClick={toggle}
      className={"flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card hover:bg-accent transition-colors " + className}
      title={isDark ? 'Switch to light' : 'Switch to dark'}
    >
      {isDark ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-amber-500" />}
    </button>
  )
}
