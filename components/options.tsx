import { getCurrentUser } from '@/actions/auth'
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
import { Signout, DeleteBoard, EditBoard } from '@/components/index'

async function Options() {
  const { user, name, fullName } = await getCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-[10px] rounded-full inline-flex justify-center">
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
        <DropdownMenuLabel>
          <Avatar>
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>

          {user?.name && (
            <span className="text-[1rem]"> {fullName && fullName[0]}</span>
          )}
        </DropdownMenuLabel>
        <EditBoard />
        <DeleteBoard />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <Signout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Options
