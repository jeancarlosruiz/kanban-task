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
import { editBoard } from '@/actions/boards'
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

function EditBoard({ disabled, board }: { disabled: any; board: any }) {
  const handleAction = (prev: any, formData: FormData) =>
    editBoard(prev, formData, board?.id)

  const [state, formAction] = useFormState(handleAction, initialState)
  const [open, setOpen] = useState(false)

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => e.preventDefault()}
        disabled={disabled}
      >
        <button
          onClick={() => setOpen(true)}
          className="w-full text-left"
          disabled={disabled}
        >
          Edit board
        </button>
      </DropdownMenuItem>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="hidden">Edit board</DialogTrigger>
        <DialogContent className="w-custom-form rounded-lg p-[16px]">
          <DialogHeader>
            <DialogTitle className="text-left text-[1.125rem]">
              Edit Board
            </DialogTitle>
            <DialogDescription className="sr-only">
              Edit board form
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
              <Input
                id="title"
                placeholder="e.g. Web Design"
                name="name"
                defaultValue={board.name}
              />
            </div>

            <BoardColumns columnsArr={board.columns} />

            <Submit variant="default">Save Changes</Submit>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditBoard
