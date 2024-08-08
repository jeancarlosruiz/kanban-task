'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { EditTask } from '@/components/index'
function OptionsTask() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full inline-flex justify-center ml-auto">
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
      <DropdownMenuContent className="w-[12rem] ">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <EditTask />
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-300">
          Delete task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OptionsTask
