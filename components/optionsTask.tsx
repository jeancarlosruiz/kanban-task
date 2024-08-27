'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { DeleteModal, EditTask } from '@/components/index'
import { deleteTask } from '@/actions/tasks'
import { useState } from 'react'
function OptionsTask({ task }: { task: any }) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const handleDeleteTask = async () => {
    const taskId = task.id
    await deleteTask(taskId)
    setIsEditOpen(false)
  }

  return (
    <>
      {isEditOpen && (
        <EditTask
          taskSaved={task}
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full inline-flex justify-center ml-auto w-6 h-6 mr-[-8px]">
          <svg
            width="5"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="vertical-dots"
          >
            <title id="vertical-dots">Options button</title>
            <g fill="#828FA3" fillRule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" />
              <circle cx="2.308" cy="10" r="2.308" />
              <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
          </svg>
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[12rem]">
          <DropdownMenuItem>
            <button
              onClick={() => {
                setIsEditOpen(true)
              }}
              className="w-full text-left"
            >
              Edit task
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e: any) => e.preventDefault()} asChild>
            <DeleteModal
              title="Delete this task?"
              description={`Are you sure you want to delete the ‘${
                task && task.title
              }’ task? This action will remove all columns and tasks and cannot be reversed.`}
              action={handleDeleteTask}
            >
              <button className="relative w-full text-red-300 flex cursor-pointer select-none items-center rounded-sm px-[16px] py-[8px] text-sm outline-none transition-colors focus:bg-white-200  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-black-600/50">
                Delete task
              </button>
            </DeleteModal>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default OptionsTask
