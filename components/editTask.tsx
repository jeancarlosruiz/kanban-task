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
  ScrollArea,
  ScrollBar,
  Textarea,
} from '@/components/ui'
import { Submit, EditStatusSelect, EditSubtasks } from '@/components/index'
import { useFormState } from 'react-dom'
import { updateTask } from '@/actions/tasks'
import { useEffect, useState } from 'react'
import { Task } from '@/types'

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
  taskSaved: Task
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const handleFormState = (prev: any, formData: FormData) =>
    updateTask(prev, formData, taskSaved.id)
  const [title, setTitle] = useState(taskSaved.title)
  const [description, setDescription] = useState(taskSaved.description)
  const [state, formAction] = useFormState(handleFormState, initialState)

  useEffect(() => {
    if (state?.message === 'success') setIsOpen(false)
  }, [state])

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

        <form action={formAction} className="flex flex-col gap-[1.5rem]">
          <ScrollArea className="max-h-[400px] overflow-y-auto">
            <div className="flex flex-col gap-[1.5rem] ">
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
                  className={
                    state?.message === 'error' && state.errors?.name?.length
                      ? 'border-red-300 dark:border-red-300'
                      : ''
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="description"
                  className="text-[0.75rem] font-bold"
                >
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

              <EditSubtasks savedSubtasks={taskSaved.subtasks!} state={state} />
              <EditStatusSelect statusLabel={taskSaved.status} state={state} />
              <ScrollBar orientation="vertical" />
            </div>
          </ScrollArea>
          <Submit variant="default">Save changes</Submit>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask
