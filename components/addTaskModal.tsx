'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Button,
  Textarea,
} from '@/components/ui'
import { NewSubtasks, Submit, StatusSelect } from '@/components/index'
import { addNewTask } from '@/actions/tasks'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import { Board } from '@/types'

const initialState = {
  message: '',
  errors: null,
  fieldValues: {
    title: '',
    description: '',
    subtasks: '',
    status: '',
  },
}

function AddTaskModal({ currentBoard }: { currentBoard: Board }) {
  const [state, formAction] = useFormState(addNewTask, initialState)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (state?.message === 'success') setOpen(false)
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="h-8 sm:h-12 ml-auto mr-[-5px] sm:px-[24px]"
          disabled={!currentBoard || currentBoard.columns.length === 0}
        >
          <svg
            width="12"
            height="12"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:hidden"
            role="img"
            aria-labelledby="add-icon"
          >
            <title id="add-icon">Add a new task</title>
            <path
              fill="#FFF"
              d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
            />
          </svg>
          <span className="hidden sm:inline">+ Add New Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-custom-form rounded-lg p-[16px] ">
        <DialogHeader>
          <DialogTitle className="text-left text-[1.125rem]">
            Add New Task
          </DialogTitle>
          <DialogDescription className="sr-only">
            Add new task form
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-[1.5rem]">
          <div className="flex flex-col gap-[1.5rem] max-h-[400px] overflow-y-auto">
            <div>
              <Label htmlFor="title" className="text-[0.75rem] font-bold">
                Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Take coffee break"
                name="name"
                className={
                  state?.message === 'error' && state.errors?.name?.length
                    ? 'border-red-300 dark:border-red-300'
                    : ''
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-[0.75rem] font-bold">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="e.g. It’s always good to take a break. This 
              15 minute break will  recharge the batteries 
              a little."
                name="description"
              />
            </div>

            <NewSubtasks state={state} />
            <StatusSelect state={state} />
          </div>
          <Submit variant="default">Create Task</Submit>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTaskModal
