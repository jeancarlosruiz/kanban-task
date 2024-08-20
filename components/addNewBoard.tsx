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
} from '@/components/ui'
import { Submit, BoardColumns } from '@/components/index'
import { useFormState } from 'react-dom'
import { createBoard } from '@/actions/boards'
import { useEffect, useState } from 'react'

const initialState = {
  message: '',
  data: null,
  errors: null,
  fieldValues: {
    name: '',
    columns: '',
  },
}

function AddNewBoard({
  boardDialog,
  setBoardDialog,
}: {
  boardDialog: boolean
  setBoardDialog: any
}) {
  const [state, formAction] = useFormState(createBoard, initialState)

  useEffect(() => {
    if (state?.message === 'success') setBoardDialog(false)
  }, [state])

  return (
    <Dialog open={boardDialog} onOpenChange={setBoardDialog}>
      <DialogTrigger asChild>
        <button className=" w-full pt-[16px] pl-[24px] sm:pl-[32px] rounded-r-full text-[0.9375rem] items-center gap-3 text-purple-500 hidden">
          <svg
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="board-icon"
          >
            <title id="board-icon">Board</title>
            <path
              d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
              fill="#635FC7"
            />
          </svg>
          + Create New Board
        </button>
      </DialogTrigger>
      <DialogContent className="w-custom-form rounded-lg p-[16px]">
        <DialogHeader>
          <DialogTitle className="text-left text-[1.125rem]">
            Add New Board
          </DialogTitle>
          <DialogDescription className="sr-only">
            Add new board form
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-[1.5rem]">
          <div className="flex flex-col gap-[1.5rem] max-h-[400px] overflow-y-auto">
            <div>
              <Label
                htmlFor="title"
                className="text-[0.75rem] font-bold w-full inline-flex items-center justify-between"
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
                placeholder="e.g. Web Design"
                name="name"
                className={
                  state?.message === 'error' && state.errors?.name?.length
                    ? 'border-red-300 dark:border-red-300'
                    : ''
                }
              />
            </div>

            <BoardColumns columnsArr={[]} state={state} />
          </div>
          <Submit variant="default">Create New Board</Submit>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewBoard
