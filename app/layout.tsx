import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StackProvider } from '@stackframe/stack'
import { UIProviders } from './providers'
import { stackServerApp } from '@/lib/stack'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NASA Knowledge Explorer',
  description: 'Explore the wonders of space with NASA data and imagery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StackProvider app={stackServerApp}>
          <UIProviders>
            {children}
          </UIProviders>
        </StackProvider>
      </body>
    </html>
  )
}
