'use client'

import { ReactNode, useState } from 'react'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui'

function DeleteConfirmation({
  children,
  title,
  description,
  boardId,
}: {
  children: ReactNode
  title: string
  description: string
  boardId: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full text-left">{children}</DialogTrigger>
      <DialogContent className="w-custom-form rounded-lg p-[24px] ">
        <DialogHeader>
          <DialogTitle className="text-left text-[1.125rem] text-red-300">
            {title}
          </DialogTitle>
          <DialogDescription className="text-[0.8125rem] text-left text-gray-300 dark:text-gray-300">
            {description}
          </DialogDescription>
        </DialogHeader>

        <Button variant="destructive" onClick={() => handleOnClick()}>
          Delete
        </Button>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmation
