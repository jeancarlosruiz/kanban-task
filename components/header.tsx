import { BoardsMenu, Logo, Options } from '@/components/index'
import { Button } from './ui'
const Header = () => {
  return (
    <header className="w-custom mx-auto py-[16px] flex items-center gap-[1rem] ">
      <Logo />
      <BoardsMenu />
      <Button className="h-[2rem] px-[18px] ml-auto" disabled>
        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FFF"
            d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
          />
        </svg>
      </Button>
      <Options />
    </header>
  )
}

export default Header
