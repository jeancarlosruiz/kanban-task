'use client'
import { setBoardSelected } from '@/actions/boards'
import { AddNewBoard, ToggleTheme } from '@/components/index'
import { Button, ScrollArea, ScrollBar } from '@/components/ui/index'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function AsideNav({
  boards,
  boardSelected,
  theme,
}: {
  boards: any
  boardSelected: any
  theme?: string
}) {
  const [boardDialog, setBoardDialog] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const handleSet = async (id: string) => {
    await setBoardSelected(id)
  }

  return (
    <>
      {boardDialog && (
        <AddNewBoard
          boardDialog={boardDialog}
          setBoardDialog={setBoardDialog}
        />
      )}
      <AnimatePresence>
        {isVisible && (
          <motion.aside
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.5,
            }}
            className="hidden sm:min-w-[16.3125rem] md:min-w-[18.75rem] h-custom-dvh bg-white-100 dark:bg-black-600 sm:flex flex-col sm:pt-[15px] pb-[24px] pr-[24px] border-e  dark:border-r-gray-500 relative"
          >
            <div className="flex-1">
              <h2 className="uppercase text-left text-[0.75rem] tracking-[.2em] text-gray-300 w-full pb-[14px] pl-[24px] sm:pl-[32px]">
                {boards?.length
                  ? `All Boards (${boards.length})`
                  : 'All boards'}
              </h2>

              <ul className="flex flex-col">
                <ScrollArea className="h-full max-h-[28rem] overflow-y-auto">
                  {boards &&
                    boards.map(({ id, name }: { id: string; name: string }) => (
                      <li key={id}>
                        <button
                          className={`w-full py-[14px] pl-[24px] sm:pl-[32px] rounded-r-full text-[0.9375rem] inline-flex items-center gap-3 ${
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
                    className=" w-full py-[16px] pl-[24px] sm:pl-[32px] rounded-r-full text-[0.9375rem] inline-flex items-center gap-3 text-purple-500"
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
            </div>

            <div className="flex flex-col gap-2 pl-[24px] sm:pl-[32px]">
              <ToggleTheme initialTheme={theme} />
              <Button
                variant="ghost"
                onClick={() => setIsVisible(!isVisible)}
                className="w-full text-gray-300 text-[0.9375rem] inline-flex items-center justify-start gap-[0.9375rem] hover:bg-transparent dark:hover:bg-transparent"
              >
                <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                    fill="#828FA3"
                  />
                </svg>
                Hide Sidebar
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isVisible && (
          <motion.button
            onClick={() => setIsVisible(!isVisible)}
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.5,
            }}
            className="hidden sm:inline-flex items-center justify-center absolute bottom-5 w-[3.5rem] h-12 z-10 rounded-none rounded-r-full bg-purple-500 text-clr-white hover:bg-purple-200 dark:bg-purple-500 dark:text-clr-white dark:hover:bg-purple-200"
          >
            <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
                fill="#FFF"
              />
            </svg>

            <span className="sr-only">show Sidebar</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default AsideNav
