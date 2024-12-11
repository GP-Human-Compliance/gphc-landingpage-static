'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

export const NavigationLinks = [
  ['Impressum', '/legal'],
  ['Datenschutz', '/privacy'],
]

export function NavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  let timeoutRef = useRef<number | null>(null)
  const pathname = usePathname()

  return NavigationLinks.map(([label, href], index) => {
    const isActive = pathname === href
    
    return (
      <Link
        key={label}
        href={href}
        className={`relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm transition-colors delay-150 ${
          isActive 
            ? 'text-gray-900' 
            : 'text-gray-700 hover:text-gray-900 hover:delay-0'
        }`}
        onMouseEnter={() => {
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
          }
          setHoveredIndex(index)
        }}
        onMouseLeave={() => {
          timeoutRef.current = window.setTimeout(() => {
            setHoveredIndex(null)
          }, 200)
        }}
      >
        <AnimatePresence>
          {(hoveredIndex === index || isActive) && (
            <motion.span
              className="absolute inset-0 rounded-lg bg-gray-100"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.15 } }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15 },
              }}
            />
          )}
        </AnimatePresence>
        <span className="relative z-10">{label}</span>
      </Link>
    )
  })
}
