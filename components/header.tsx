import { BoardsMenu, Logo, Options, AddTaskModal } from '@/components/index'
const Header = () => {
  return (
    <header className="w-custom mx-auto py-[16px] flex items-center gap-[1rem] ">
      <Logo />
      <BoardsMenu />
      <AddTaskModal />
      <Options />
    </header>
  )
}

export default Header
