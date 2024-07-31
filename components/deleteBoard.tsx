'use client'

import { DropdownMenuItem } from '@/components/ui'
import { DeleteModal } from '@/components/index'

function DeleteBoard() {
  return (
    <DropdownMenuItem
      className="text-red-300"
      onSelect={(e) => e.preventDefault()}
    >
      <DeleteModal
        title="Delete this board?"
        description="Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed."
      >
        Delete Board
      </DeleteModal>
    </DropdownMenuItem>
  )
}

export default DeleteBoard
