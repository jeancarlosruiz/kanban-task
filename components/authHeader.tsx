import { Logo, ToggleTheme } from '@/components/index'
const AuthHeader = () => {
  return (
    <header className="bg-white-100 px-[16px] py-[8px] dark:bg-black-600 flex justify-between items-center">
      <Logo />
      <ToggleTheme />
    </header>
  )
}

export default AuthHeader
