'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Submit from '@/components/submit'
import { useFormState } from 'react-dom'
import { addNewColumn } from '@/actions/columns'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const initialState = {
  message: '',
  errors: null,
  fieldValues: {
    name: '',
  },
}

function NewColumn({ boardId }: { boardId: string }) {
  const handleNewColumn = (prev: any, formData: FormData) =>
    addNewColumn(prev, formData, boardId)
  const [state, formAction] = useFormState(handleNewColumn, initialState)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (state?.message === 'success') setOpen(false)
  }, [state])
  return (
    <motion.div layout className="flex flex-col gap-6">
      <h2 className="invisible inline-flex items-center gap-3 text-left text-[0.75rem] font-bold uppercase tracking-[.2em] text-gray-300 before:block before:h-[0.9375rem] before:w-[0.9375rem] before:rounded-full before:bg-[#49C4E5] before:content-['']">
        New column
      </h2>
      <div className="flex h-full min-w-[17.5rem] items-center justify-center rounded-md bg-gradient-to-r from-[#E9EFFA] to-[#E9EFFA]/50 dark:from-black-600 dark:to-black-600/25">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-[70%] text-[0.9375rem] font-bold text-gray-300 hover:bg-transparent hover:text-purple-500 dark:hover:bg-transparent dark:hover:text-purple-500"
            >
              + New Column
            </Button>
          </DialogTrigger>
          <DialogContent className="w-custom-form rounded-lg p-[16px]">
            <DialogHeader>
              <DialogTitle className="text-left text-[1.125rem]">
                Add New Column
              </DialogTitle>
              <DialogDescription className="sr-only">
                Add new column form
              </DialogDescription>
            </DialogHeader>
            <form action={formAction} className="flex flex-col gap-[1.5rem]">
              <div>
                <Label
                  htmlFor="title"
                  className="inline-flex w-full items-center justify-between text-[0.75rem] font-bold"
                >
                  Title
                  {state?.message === 'error' && state.errors?.name?.length && (
                    <small className="text-red-300">
                      {state.errors?.name[0]}
                    </small>
                  )}
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Todo, Doing, Done"
                  name="name"
                  defaultValue={state?.fieldValues.name}
                  className={
                    state?.message === 'error' && state.errors?.name?.length
                      ? 'border-red-300 dark:border-red-300'
                      : ''
                  }
                />
              </div>

              <Submit variant="default">Create New Column</Submit>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  )
}

export default NewColumn
