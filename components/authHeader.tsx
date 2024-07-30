import { Logo } from '@/components/index'
import React from 'react'
const AuthHeader = () => {
  return (
    <header className="min-h-[4rem] bg-white-100 px-[16px] dark:bg-black-600 flex justify-between items-center">
      <Logo />
    </header>
  )
}

export default AuthHeader
