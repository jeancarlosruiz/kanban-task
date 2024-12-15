'use client'
import ToggleTheme from '@/components/toggleTheme'
import AddNewBoard from '@/components/addNewBoard'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { setBoardSelected } from '@/actions/boards'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Board, BoardNav } from '@/types'

function BoardsMenu({
  boards,
  boardSelected,
  theme,
}: {
  boards: BoardNav[] | undefined
  boardSelected: Board | undefined
  theme?: string
}) {
  const [open, setOpen] = useState(false)
  const [boardDialog, setBoardDialog] = useState(false)

  const handleSet = async (id: string) => {
    await setBoardSelected(id)

    setOpen(false)
  }

  useEffect(() => {
    if (boardDialog) setOpen(false)
  }, [boardDialog])

  return (
    <>
      {boardDialog && (
        <AddNewBoard
          boardDialog={boardDialog}
          setBoardDialog={setBoardDialog}
        />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex items-center gap-2 text-[1.125rem] font-bold sm:hidden">
          {boardSelected && Object.keys(boardSelected).length !== 0
            ? boardSelected?.name
            : 'Create a new board'}

          <Chevron open={open} />
        </DialogTrigger>
        <DialogContent className="max-w-[16.5rem] rounded-lg p-[16px] shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)]">
          <DialogHeader className="pl-[8px]">
            <DialogTitle className="text-left text-[0.75rem] uppercase tracking-[.2em] text-gray-300">
              {boards?.length ? `All Boards (${boards.length})` : 'All boards'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Board manager
            </DialogDescription>
          </DialogHeader>

          <ul className="ml-[-16px] flex flex-col sm:ml-[-32px]">
            <ScrollArea className="h-full max-h-[25rem] overflow-y-auto">
              {boards &&
                boards.map(({ id, name }: { id: string; name: string }) => (
                  <li key={id}>
                    <button
                      className={`inline-flex w-full items-center gap-3 rounded-r-full py-[14px] pl-[24px] text-[0.9375rem] sm:pl-[32px]${
                        boardSelected?.id === id
                          ? 'bg-purple-500 text-white-100'
                          : 'text-gray-300'
                      }`}
                      onClick={() => handleSet(id)}
                    >
                      <svg
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-labelledby="board-icon"
                      >
                        <title id="board-icon">Board</title>
                        <path
                          d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                          fill={
                            boardSelected?.id === id
                              ? 'currentColor'
                              : '#828FA3'
                          }
                        />
                      </svg>
                      {name}
                    </button>
                  </li>
                ))}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
            <li>
              <button
                onClick={() => setBoardDialog(true)}
                className="inline-flex w-full items-center gap-3 rounded-r-full pl-[24px] pt-[16px] text-[0.9375rem] text-purple-500 sm:pl-[32px]"
              >
                <svg
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="board-icon"
                >
                  <title id="board-icon">Board</title>
                  <path
                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                    fill="#635FC7"
                  />
                </svg>
                + Create New Board
              </button>
            </li>
          </ul>

          <ToggleTheme initialTheme={theme} />
        </DialogContent>
      </Dialog>
      <h2 className="hidden text-[1.5rem] font-bold sm:inline-block">
        {boardSelected && Object.keys(boardSelected).length !== 0
          ? boardSelected?.name
          : 'Create a new board'}
      </h2>
    </>
  )
}

const Chevron = ({ open }: { open: boolean }) => {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const chevronVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  }

  const transition = { duration: 0.3, ease: 'easeOut' }

  return (
    <motion.svg
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="chevron-up"
      variants={chevronVariants}
      animate={isOpen ? 'open' : 'closed'}
      transition={transition}
    >
      <title id="chevron-up">Open board list</title>
      <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
    </motion.svg>
  )
}

export default BoardsMenu
