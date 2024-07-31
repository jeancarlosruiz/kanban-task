'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  Button,
} from '@/components/ui'
import { MouseEventHandler } from 'react'

function DeleteModal({
  children,
  title,
  description,
}: //   action,
{
  children: React.ReactNode
  title: string
  description: string
  //   action: MouseEventHandler
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-custom-form rounded-lg p-[24px] ">
        <DialogHeader>
          <DialogTitle className="text-left text-[1.125rem] text-red-300">
            {title}
          </DialogTitle>
          <DialogDescription className="text-[0.8125rem] text-left text-gray-300 dark:text-gray-300">
            {description}
          </DialogDescription>
        </DialogHeader>

        <Button variant="destructive">Delete</Button>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteModal
