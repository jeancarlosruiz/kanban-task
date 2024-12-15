'use client'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Signout from '@/components/signout'
import Profile from '@/components/profile'
import DeleteBoard from '@/components/deleteBoard'
import EditBoard from '@/components/editBoard'
import { Board, User } from '@/types'

function Options({
  boardSelected,
  session,
}: {
  boardSelected: Board
  session: any
}) {
  const [profile, setProfile] = useState(false)

  return (
    <>
      {profile && (
        <Profile
          data={session}
          profile={profile}
          setProfile={setProfile}
          boardSelected={boardSelected}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger
          title="open-options"
          className="mr-[-8px] inline-flex h-6 w-6 items-center justify-center rounded-full"
        >
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
          <DropdownMenuLabel className="mb-[10px] pt-[14px]">
            <Avatar className="block min-h-10 min-w-10">
              <AvatarImage
                src={session?.image || ''}
                alt="user profile image"
              />
              <AvatarFallback>{session?.name[0]}</AvatarFallback>
            </Avatar>

            {session?.name && (
              <span className="truncate text-[1rem]">
                {session?.name.split(' ')[0]}
              </span>
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
