'use client'
// import { useState } from 'react'
// import AddNewBoard from './addNewBoard'

function EmptyBoard() {
  // const [open, setOpen] = useState(false)
  return (
    <>
      {/* <AddNewBoard boardDialog={open} setBoardDialog={setOpen} /> */}
      <div className="self-center mt-[-30px] w-full flex items-center flex-col gap-[1.5625rem] text-center">
        <p className="text-center text-[1.125rem] text-gray-300 font-bold">
          Start by creating a new board 😊
        </p>

        {/* <button
          onClick={() => setOpen(true)}
          className="w-full pt-[16px] pl-[24px] sm:pl-[32px] rounded-r-full text-[0.9375rem] inline-flex items-center gap-3 text-purple-500"
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
        </button> */}
      </div>
    </>
  )
}

export default EmptyBoard
