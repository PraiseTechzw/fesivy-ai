import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '~/components/ThemeProvider'
import { AIProvider } from '~/components/AIProvider'
import Snowfall from '~/components/Snowfall'
import Header from '~/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Christmas Joy App',
  description: 'A festive app for all your Christmas needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AIProvider>
            <Snowfall />
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </AIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

