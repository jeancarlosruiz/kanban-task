'use client'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
} from '@/components/ui'
import { Signout, DeleteBoard, EditBoard } from '@/components/index'
import { DialogTitle } from '@radix-ui/react-dialog'
function Options({ data, currentBoard }: { data: any; currentBoard: any }) {
  const { user, name, fullName } = data
  const [profile, setProfile] = useState(false)

  return (
    <>
      {profile && (
        <Dialog open={profile} onOpenChange={setProfile}>
          <DialogTrigger asChild>
            <button className="w-full pt-[16px] pl-[24px] sm:pl-[32px] rounded-r-full text-[0.9375rem] items-center gap-3 text-purple-500 hidden">
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
                Profile
              </DialogTitle>
              <DialogDescription className="sr-only">
                Add new board form
              </DialogDescription>
            </DialogHeader>

            <div className="w-full flex gap-4 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={user?.image || ''}
                  className="min-h-10 min-w-10"
                />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>

              <p className="text-[1.125rem]">{user.name}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger className="w-6 h-6 rounded-full inline-flex justify-center items-center mr-[-8px]">
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
          <span className="sr-only">Open options</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[12rem] ">
          <DropdownMenuLabel>
            <Avatar className="block min-h-10 min-w-10">
              <AvatarImage src={user?.image || ''} />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>

            {user?.name && (
              <span className="text-[1rem]">{fullName && fullName[0]}</span>
            )}
          </DropdownMenuLabel>
          {/* <DropdownMenuItem onClick={() => setProfile(true)}>
            Profile
          </DropdownMenuItem> */}
          <EditBoard disabled={!currentBoard} board={currentBoard} />
          <DeleteBoard currentBoard={currentBoard} disabled={!currentBoard} />
          <DropdownMenuSeparator />
          <Signout />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Options
