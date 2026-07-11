import type { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

type Props = {
  children: ReactNode
}

export default function PageLayout({ children }: Props) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
