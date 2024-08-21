import { getCurrentUser } from '@/actions/auth'
import { getBoardSelected, getBoards } from '@/utils/boards'
import {
  AddTaskModal,
  AsideNav,
  BoardsMenu,
  Column,
  EmptyBoard,
  Logo,
  NewColumn,
  Options,
  Section,
} from '@/components/index'
import { ScrollArea, ScrollBar } from '@/components/ui'

const Page = async () => {
  const { user } = await getCurrentUser()
  const userId = user?.id as string
  const allBoards = await getBoards(userId)
  const boardSelected: any = await getBoardSelected(userId, user?.boardSelected)

  return (
    <>
      <header className=" bg-white-100 dark:bg-black-600">
        <div className="mx-auto pr-[16px] sm:pr-[24px] flex items-center gap-4 md:gap-6">
          <Logo />
          <BoardsMenu boards={allBoards} boardSelected={boardSelected} />
          <AddTaskModal boardExist={boardSelected} />
          <Options />
        </div>
      </header>
      <main className="relative flex overflow-hidden">
        <AsideNav boards={allBoards} boardSelected={boardSelected} />
        <Section boardSelected={boardSelected} />
      </main>
    </>
  )
}

export default Page
