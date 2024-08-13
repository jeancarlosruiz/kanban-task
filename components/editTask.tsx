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
  Textarea,
} from '@/components/ui'
import { Submit, EditStatusSelect, EditSubtasks } from '@/components/index'
import { useFormState } from 'react-dom'
import { updateTask } from '@/actions/tasks'
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

function EditTask({
  taskSaved,
  isOpen,
  setIsOpen,
}: {
  taskSaved: any
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const handleFormState = (prev: any, formData: FormData) =>
    updateTask(prev, formData, taskSaved.id)
  const [title, setTitle] = useState(taskSaved.title)
  const [description, setDescription] = useState(taskSaved.description)
  const [state, formAction] = useFormState(handleFormState, initialState)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full text-left">Edit task</DialogTrigger>
      <DialogContent className="w-custom-form rounded-lg p-[16px] ">
        <DialogHeader>
          <DialogTitle className="text-left text-[1.125rem]">
            Edit Task
          </DialogTitle>
          <DialogDescription className="sr-only">
            Edit task form
          </DialogDescription>
        </DialogHeader>

        <form
          action={(formData: FormData) => {
            formAction(formData)
            setIsOpen(false)
          }}
          className="flex flex-col gap-[1.5rem]"
        >
          <div>
            <Label htmlFor="title" className="text-[0.75rem] font-bold">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              placeholder="e.g. Take coffee break"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <EditSubtasks savedSubtasks={taskSaved.subtasks} />
          <EditStatusSelect statusLabel={taskSaved.status} />

          <Submit variant="default">Save changes</Submit>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask
