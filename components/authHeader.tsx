import { cookies } from 'next/headers'
import { Logo, ToggleTheme } from '@/components/index'

const AuthHeader = () => {
  const savedTheme = cookies().get('color-theme')
  const theme = savedTheme?.value || 'dark'

  return (
    <header className="bg-white-100 px-[16px] py-[6px] dark:bg-black-600 flex justify-between items-center">
      <Logo />
      <ToggleTheme initialTheme={theme} />
    </header>
  )
}

export default AuthHeader
