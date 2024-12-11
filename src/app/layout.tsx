import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const title = 'Dem Menschen verpflichtet.'
const description = 'Unser Ziel ist, die Gesellschaft als Ganzes und jeden Einzelnen zur Selbstbestimmung zu befähigen. Dafür bauen wir Software.'
const url = 'https://gp-hc.de'

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx('bg-gray-50 antialiased', inter.variable)}>
      <body>{children}</body>
    </html>
  )
}
