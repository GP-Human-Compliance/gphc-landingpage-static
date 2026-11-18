import Link from 'next/link'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <Container className="py-20 sm:py-32">
        <h1 className="display text-5xl leading-none text-ink sm:text-6xl">
          Diese Seite gibt es nicht.
        </h1>
        <p className="mt-8 text-lg text-muted">
          Vielleicht hat sich die Adresse geändert.{' '}
          <Link href="/" className="link">
            Zur Startseite
          </Link>
        </p>
      </Container>
    </Layout>
  )
}
