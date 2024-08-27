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
import { useSession } from 'next-auth/react'

function Options({ boardSelected }: { boardSelected: any }) {
  const { data } = useSession()
  const username = data?.user?.name.split(' ')[0]
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
          <DropdownMenuLabel className="pt-[14px]">
            <Avatar className="block min-h-10 min-w-10">
              <AvatarImage src={data?.user?.image || ''} />
              <AvatarFallback>{data?.user?.name[0]}</AvatarFallback>
            </Avatar>

            {data?.user?.name && (
              <span className="text-[1rem]">
                {data?.user.name.split(' ')[0]}
              </span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setProfile(true)}>
            Profile
          </DropdownMenuItem>
          <EditBoard disabled={!boardSelected} board={boardSelected} />
          <DeleteBoard currentBoard={boardSelected} disabled={!boardSelected} />
          <DropdownMenuSeparator />
          <Signout />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Options
