import './globals.scss'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BookAI',
  description: 'AI assistance for books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
