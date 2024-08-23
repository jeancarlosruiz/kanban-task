'use client'

import { useState } from 'react'
import AddNewBoard from './addNewBoard'

function EmptyBoard() {
  const [open, setOpen] = useState(false)
  return (
    <div className="self-center mt-[-30px] w-full flex items-center flex-col gap-[1.5625rem] text-center">
      <p className="text-center text-[1.125rem] text-gray-300 font-bold">
        Start by creating a new board 😊
      </p>
      <AddNewBoard boardDialog={open} setBoardDialog={setOpen} />
    </div>
  )
}

export default EmptyBoard
