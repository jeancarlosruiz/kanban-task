import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import './globals.css'

const PJS = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['500', '700'] })

export const metadata: Metadata = {
  title: 'Kanban',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let theme = cookies().get('color-theme')?.value || 'dark'

  return (
    <html lang="en" data-theme={theme}>
      <body
        className={`${PJS.className} bg-white-300 dark:bg-black-700 text-clr-black dark:text-clr-white`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
