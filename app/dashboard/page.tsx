import { getCurrentUser } from '@/actions/auth'
import { getBoards, getBoardSelected } from '@/utils/boards'
import {
  AddTaskModal,
  BoardsMenu,
  EmptyBoard,
  Logo,
  Options,
} from '@/components/index'
import { Button } from '@/components/ui'
const Page = async () => {
  const { user } = await getCurrentUser()
  const userId = user?.id as string
  const allBoards = await getBoards(userId)
  const boardSelected = await getBoardSelected(userId, user?.boardSelected)

  console.log(boardSelected)

  return (
    <>
      <header className=" bg-white-100 dark:bg-black-600">
        <div className="w-custom mx-auto py-[16px] flex items-center gap-[1rem]">
          <Logo />
          {/* Corregir este error */}
          <BoardsMenu boards={allBoards} boardSelected={boardSelected} />
          <AddTaskModal />
          <Options />
        </div>
      </header>
      <main>
        {/* <section className="h-custom-dvh flex justify-center items-center px-[16px] pt-[24px]"> */}
        <section className="px-[16px] pt-[24px]">
          {/* https://ui.shadcn.com/docs/components/scroll-area */}
          {allBoards?.length ? (
            <div className="max-w-[17.5rem]">
              <h2 className="uppercase text-left text-[0.75rem] tracking-[.2em] text-gray-300 font-bold">
                Todo (4)
              </h2>

              <div className="w-full bg-white-100 dark:bg-black-600 rounded-lg p-[16px] shadow-[0px_5px_10px_0px_rgba(54,78,126,0.25)]"></div>
            </div>
          ) : (
            <EmptyBoard />
          )}
        </section>
      </main>
    </>
  )
}

export default Page
