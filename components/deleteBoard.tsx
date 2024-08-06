'use client'
import { DropdownMenuItem } from '@/components/ui'
import { DeleteModal } from '@/components/index'
import { deleteCurrentBoard } from '@/actions/boards'
function DeleteBoard({
  currentBoard,
  disabled,
}: {
  currentBoard: any
  disabled: any
}) {
  const handleDeleteBoard = async () => {
    const { id } = currentBoard
    await deleteCurrentBoard(id)
  }

  return (
    <DropdownMenuItem
      className="text-red-300"
      onSelect={(e) => e.preventDefault()}
      disabled={disabled}
    >
      <DeleteModal
        title="Delete this board?"
        description={`Are you sure you want to delete the ‘${
          currentBoard && currentBoard.name
        }’ board? This action will remove all columns and tasks and cannot be reversed.`}
        action={handleDeleteBoard}
      >
        Delete Board
      </DeleteModal>
    </DropdownMenuItem>
  )
}

export default DeleteBoard
