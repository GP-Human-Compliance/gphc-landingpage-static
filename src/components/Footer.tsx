import Link from 'next/link'

import { Container } from '@/components/Container'

const links = [
  ['Impressum', '/legal'],
  ['Datenschutz', '/privacy'],
  ['Kontakt', 'mailto:info@gp-hc.de'],
]

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="flex flex-col-reverse gap-4 border-t border-rule py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} GP Human Compliance GmbH</p>
          <nav aria-label="Rechtliches und Kontakt">
            <ul className="flex gap-6">
              {links.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="underline decoration-transparent underline-offset-4 transition-colors hover:text-ink hover:decoration-teal"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
