import { getCurrentUser } from '@/actions/auth'
import { getBoards } from '@/utils/boards'
import { getBoardSelected } from '@/utils/boards'
import {
  AddTaskModal,
  BoardsMenu,
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
      <header className="bg-white-100 dark:bg-black-600">
        <div className="mx-auto px-[16px] sm:px-[24px] py-[16px] flex items-center gap-[1rem]">
          <Logo />
          <BoardsMenu boards={allBoards} boardSelected={boardSelected} />
          <AddTaskModal boardExist={boardSelected} />
          <Options />
        </div>
      </header>
      <main>
        <ScrollArea className="w-full">
          <section className="h-custom-dvh px-[16px] sm:px-[24px] pt-[27px] sm:pt-[24px] pb-[24px] flex gap-6 mx-auto">
            {boardSelected ? (
              <>
                {boardSelected.columns.map((column: any) => (
                  <Column key={column.id} column={column} />
                ))}
                <NewColumn boardId={boardSelected.id} />
              </>
            ) : (
              // <EmptyBoard />
              <div className="self-center mt-[-30px] w-full flex items-center flex-col gap-[1.5625rem]">
                <p className="text-center text-[1.125rem] text-gray-300 font-bold">
                  Start by creating a new board 😊
                </p>
              </div>
            )}
          </section>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </main>
    </>
  )
}

export default Page
