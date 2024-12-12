import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { TextField } from '@/components/Fields'
import { Logomark } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import qrCode from '@/images/qr-code.svg'

/* function QrCodeBorder(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
} */

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="sm:flex text-center sm:text items-start pb-12 pt-8 md:pt-6 px-4 sm:px-6 lg:px-8 justify-between">
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <a href="mailto:info@gp-hc.de" className="text-gray-500 text-sm">Kontakt</a>
        </div>
      </Container>
    </footer>
  )
}
