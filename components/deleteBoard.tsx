'use client'
import { DropdownMenuItem } from '@/components/ui'
import { DeleteModal } from '@/components/index'
import { deleteCurrentBoard } from '@/actions/boards'

function DeleteBoard({
  currentBoard,
  isDisabled,
}: {
  currentBoard: any
  isDisabled: boolean
}) {
  const handleDeleteBoard = async () => {
    const { id } = currentBoard
    await deleteCurrentBoard(id)
  }

  return (
    <DropdownMenuItem
      disabled={isDisabled}
      onSelect={(e) => e.preventDefault()}
      asChild
    >
      <DeleteModal
        title="Delete this board?"
        description={`Are you sure you want to delete the ‘${
          currentBoard && currentBoard.name
        }’ board? This action will remove all columns and tasks and cannot be reversed.`}
        action={handleDeleteBoard}
      >
        <button
          disabled={isDisabled}
          className="w-full relative text-red-300 flex cursor-pointer select-none items-center rounded-sm px-[16px] py-[8px] text-sm outline-none transition-colors focus:bg-white-200  disabled:pointer-events-none disabled:opacity-50 dark:focus:bg-black-600/50"
        >
          Delete Board
        </button>
      </DeleteModal>
    </DropdownMenuItem>
  )
}

export default DeleteBoard
