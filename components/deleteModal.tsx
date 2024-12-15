'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useState } from 'react'

function DeleteModal({
  children,
  title,
  description,
  action,
}: {
  children: React.ReactNode
  title: string
  description: string
  action: () => void
}) {
  const [open, setOpen] = useState(false)

  const handleOnClick = async () => {
    await action()

    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-custom-form rounded-lg p-[24px]">
        <DialogHeader>
          <DialogTitle className="text-left text-[1.125rem] text-red-300">
            {title}
          </DialogTitle>
          <DialogDescription className="text-left text-[0.8125rem] text-gray-300 dark:text-gray-300">
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

export default DeleteModal
