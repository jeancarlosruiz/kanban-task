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
import { SignoutForm } from './index'

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
      <DropdownMenuContent className="w-[12rem]">
        <DropdownMenuLabel>
          <Avatar>
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>

          {user?.name && <span> {fullName && fullName[0]}</span>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Edit Board</DropdownMenuItem>
        <DropdownMenuItem className="text-red-300">
          Delete Board
        </DropdownMenuItem>
        <div className="px-[16px] pt-[8px] pb-[16px]">
          <SignoutForm />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Options
