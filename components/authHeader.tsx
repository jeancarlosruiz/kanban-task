import { Logo } from '@/components/index'
import React from 'react'
const AuthHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="bg-white-100 px-[16px] py-[8px] dark:bg-black-600 flex justify-between items-center">
      <Logo />
      {children}
    </header>
  )
}

export default AuthHeader
