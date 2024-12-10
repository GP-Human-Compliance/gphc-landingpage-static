import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-auto px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  )
}
