import { type Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

// Self-hosted at build time by next/font: no requests to Google at runtime.
// The wdth axis provides the condensed cut used for headlines.
const openSans = Open_Sans({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-open-sans',
})

const title = 'Dem Menschen verpflichtet.'
const description = 'Unser Ziel ist, jeden Einzelnen und die Gesellschaft als Ganzes zur Selbstbestimmung zu befähigen. Dafür bauen wir Software.'
const url = 'https://www.gp-hc.de'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gp-hc.de'),
  title: {
    template: '%s - ' + title,
    default: title,
  },
  description:
    description,
  openGraph: {
    title: title,
    description: description,
    url: url, 
    siteName: 'GP-HC',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: ['/og-image.png'],
  },
  icons: {
    // Standard favicon
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    // Apple Touch Icon
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    // Android Chrome Icons
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest'
}

// GitHub Pages cannot enforce HTTPS for this domain yet (its certificate request
// is stuck), so send visitors who arrive over http:// to the https:// address.
const httpsRedirect = `if (location.protocol === 'http:' && location.hostname === 'www.gp-hc.de') location.replace('https://' + location.host + location.pathname + location.search + location.hash)`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={clsx('bg-paper antialiased', openSans.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: httpsRedirect }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
