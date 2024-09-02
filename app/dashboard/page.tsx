import { getCurrentUser } from '@/actions/auth'
import { getBoardSelected, getBoards } from '@/utils/boards'
import {
  AddTaskModal,
  AsideNav,
  BoardsMenu,
  Logo,
  Options,
  Section,
} from '@/components/index'
import { cookies } from 'next/headers'

const Page = async () => {
  const data = await getCurrentUser()
  const { user } = data
  const userId = user?.id as string
  const allBoards = await getBoards(userId)
  const boardSelected: any = await getBoardSelected(userId, user?.boardSelected)
  const theme = cookies().get('color-theme')?.value || 'dark'

  return (
    <>
      <header className=" bg-white-100 dark:bg-black-600">
        <div className="mx-auto pr-[16px] sm:pr-[24px] flex items-center gap-4 md:gap-6">
          <Logo />
          <BoardsMenu
            boards={allBoards}
            boardSelected={boardSelected}
            theme={theme}
          />
          <AddTaskModal currentBoard={boardSelected} />
          <Options boardSelected={boardSelected} session={user} />
        </div>
      </header>
      <main className="flex overflow-hidden">
        <AsideNav
          boards={allBoards}
          boardSelected={boardSelected}
          theme={theme}
        />
        <Section boardSelected={boardSelected} />
      </main>
    </>
  )
}

export default Page
