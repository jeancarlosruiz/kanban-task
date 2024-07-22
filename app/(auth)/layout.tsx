// import { AuthHeader } from '@/components/index'
import AuthHeader from '@/components/authHeader'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AuthHeader />
      {children}
    </>
  )
}
