import { getCurrentUser } from '@/actions/auth'
import { getBoards, getBoardSelected } from '@/utils/boards'
import {
  AddTaskModal,
  BoardsMenu,
  BubbleTask,
  Column,
  EmptyBoard,
  Logo,
  NewColumn,
  Options,
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
        <div className="w-custom mx-auto py-[16px] flex items-center gap-[1rem]">
          <Logo />
          <BoardsMenu boards={allBoards} boardSelected={boardSelected} />
          <AddTaskModal />
          <Options />
        </div>
      </header>
      <main>
        <ScrollArea className="w-full">
          <section className="h-custom-dvh px-[16px] py-[24px] flex gap-6">
            {boardSelected ? (
              <>
                <Column board={boardSelected} />
                <NewColumn />
              </>
            ) : (
              <EmptyBoard />
            )}
          </section>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </main>
    </>
  )
}

export default Page
