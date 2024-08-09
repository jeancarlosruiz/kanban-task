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
import { useState } from 'react'

const initialState = {
  message: '',
  errors: null,
  fieldValues: {
    title: '',
    description: '',
    subtasks: [],
  },
}

function AddTaskModal() {
  const [state, formAction] = useFormState(addNewTask, initialState)
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" h-[2rem] px-[18px] ml-auto mr-[-5px]">
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF"
              d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
            />
          </svg>
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

        <form
          action={(formData: FormData) => {
            formAction(formData)
            setOpen(false)
          }}
          className="flex flex-col gap-[1.5rem]"
        >
          <div>
            <Label htmlFor="title" className="text-[0.75rem] font-bold">
              Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. Take coffee break"
              name="title"
            />
          </div>

          <div>
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

          <NewSubtasks />
          <StatusSelect />

          <Submit variant="default">Create Task</Submit>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTaskModal
