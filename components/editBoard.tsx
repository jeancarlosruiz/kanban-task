'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem,
  Input,
  Label,
} from '@/components/ui'
import { Submit, BoardColumns } from '@/components/index'
import { useFormState } from 'react-dom'
import { createBoard } from '@/actions/boards'
import { useState } from 'react'

const initialState = {
  message: '',
  data: null,
  errors: null,
  fieldValues: {
    name: '',
    columns: '',
  },
}

function EditBoard() {
  const [state, formAction] = useFormState(createBoard, initialState)
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>Edit board</DialogTrigger>
        <DialogContent className="w-custom-form rounded-lg p-[16px]">
          <DialogHeader>
            <DialogTitle className="text-left text-[1.125rem]">
              Add New Board
            </DialogTitle>
            <DialogDescription className="sr-only">
              Add new board form
            </DialogDescription>
          </DialogHeader>

          <form
            action={async (formData: FormData) => {
              formAction(formData)
              setOpen(false)
            }}
            className="flex flex-col gap-[1.5rem]"
          >
            <div>
              <Label htmlFor="title" className="text-[0.75rem] font-bold">
                Title
              </Label>
              <Input id="title" placeholder="e.g. Web Design" name="name" />
            </div>

            <BoardColumns />

            <Submit variant="default">Save Changes</Submit>
          </form>
        </DialogContent>
      </Dialog>
    </DropdownMenuItem>
  )
}

export default EditBoard
