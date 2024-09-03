'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem,
  Input,
  Label,
  ScrollArea,
  ScrollBar,
} from '@/components/ui'
import { Submit, BoardColumns } from '@/components/index'
import { useFormState } from 'react-dom'
import { editBoard } from '@/actions/boards'
import { useEffect, useState } from 'react'
import { Board } from '@/types'

const initialState = {
  message: '',
  data: null,
  errors: null,
  fieldValues: {
    name: '',
    columns: '',
  },
}

function EditBoard({
  isDisabled,
  board,
}: {
  isDisabled: boolean
  board: Board
}) {
  const handleAction = (prev: any, formData: FormData) =>
    editBoard(prev, formData, board?.id)

  const [state, formAction] = useFormState(handleAction, initialState)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (state?.message === 'Success') setOpen(false)
  }, [state])

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => e.preventDefault()}
        disabled={isDisabled}
      >
        <button
          onClick={() => setOpen(true)}
          className="w-full text-left"
          disabled={isDisabled}
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

          <form action={formAction} className="flex flex-col gap-[1.5rem]">
            <ScrollArea className="h-full max-h-[400px] overflow-y-auto">
              <div className="flex flex-col gap-[1.5rem] ">
                <div>
                  <Label
                    htmlFor="title"
                    className="text-[0.75rem] font-bold w-full inline-flex items-center justify-between"
                  >
                    Title
                    {state?.message === 'error' &&
                      state.errors?.name?.length && (
                        <small className="text-red-300">
                          {state.errors?.name[0]}
                        </small>
                      )}
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g. Web Design"
                    name="name"
                    defaultValue={board?.name}
                    className={
                      state?.message === 'error' && state.errors?.name?.length
                        ? 'border-red-300 dark:border-red-300'
                        : ''
                    }
                  />
                </div>

                <BoardColumns columnsArr={board?.columns} state={state} />
                <ScrollBar orientation="vertical" />
              </div>
            </ScrollArea>
            <Submit variant="default">Save Changes</Submit>
          </form>
          <DialogClose onClick={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditBoard
