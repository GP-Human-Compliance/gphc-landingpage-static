import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

export function Header() {
  return (
    <header>
      <Container className="py-6 sm:py-8">
        <Link href="/" aria-label="Zur Startseite" className="inline-block select-none">
          <Logo className="h-11 w-auto sm:h-14" />
        </Link>
      </Container>
    </header>
  )
}
