import { AuthHeader, ToggleTheme } from '@/components/index'
import { cookies } from 'next/headers'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const savedTheme = cookies().get('color-theme')
  const theme = savedTheme?.value || 'dark'
  return (
    <>
      <AuthHeader>
        <ToggleTheme initialTheme={theme} />
      </AuthHeader>
      {children}
    </>
  )
}
