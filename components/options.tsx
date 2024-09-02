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
} from '@/components/ui'
import { Signout, DeleteBoard, EditBoard, Profile } from '@/components/index'
import { Board, User } from '@/types'

function Options({
  boardSelected,
  session,
}: {
  boardSelected: Board
  session: User
}) {
  const [profile, setProfile] = useState(false)

  return (
    <>
      {profile && (
        <Profile
          profile={profile}
          setProfile={setProfile}
          boardSelected={boardSelected}
        />
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
        <DropdownMenuContent className="w-[12rem]">
          <DropdownMenuLabel className="pt-[14px] mb-[10px]">
            <Avatar className="block min-h-10 min-w-10">
              <AvatarImage
                src={session?.image || ''}
                alt="user profile image"
              />
              <AvatarFallback>{session?.name[0]}</AvatarFallback>
            </Avatar>

            {session?.name && (
              <span className="text-[1rem]">{session?.name.split(' ')[0]}</span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setProfile(true)}>
            Profile
          </DropdownMenuItem>
          <EditBoard isDisabled={!boardSelected} board={boardSelected} />
          <DeleteBoard
            currentBoard={boardSelected}
            isDisabled={!boardSelected}
          />
          <DropdownMenuSeparator />
          <Signout />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Options
