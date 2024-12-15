import { getCurrentUser } from '@/utils/auth'
import { getBoardSelected, getBoards } from '@/utils/boards'
import AddTaskModal from '@/components/addTaskModal'
import AsideNav from '@/components/asideNav'
import BoardsMenu from '@/components/boardsMenu'
import Logo from '@/components/logo'
import Options from '@/components/options'
import Section from '@/components/section'
import { cookies } from 'next/headers'
import { auth } from '@/auth'

const Page = async () => {
  const data = await auth()
  const userId = data?.user?.id as string
  const user = await getCurrentUser(userId)
  const allBoards = await getBoards(userId)
  const boardSelected: any = await getBoardSelected(
    userId,
    data?.user.boardSelected
  )
  const theme = cookies().get('color-theme')?.value || 'dark'

  return (
    <>
      <header className="bg-white-100 dark:bg-black-600">
        <div className="mx-auto flex items-center gap-4 pr-[16px] sm:pr-[24px] md:gap-6">
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
