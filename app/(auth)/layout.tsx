import { AuthHeader } from '@/components/index'

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
