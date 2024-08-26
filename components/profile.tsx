'use client'
import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from './ui'
import { Submit } from '@/components/index'
import { useFormState } from 'react-dom'
import { editProfile } from '@/actions/profile'

const initialState = {
  message: '',
  errors: null,
}

function Profile({
  profile,
  setProfile,
  user,
}: {
  profile: boolean
  setProfile: any
  user: any
}) {
  const handleAction = (prev: any, formData: FormData) =>
    editProfile(prev, formData, user?.id)

  const [state, formAction] = useFormState(handleAction, initialState)
  const [userName, setUsername] = useState(user?.name)

  useEffect(() => {
    if (state?.message === 'success') setProfile(false)
  }, [state])

  return (
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
            Edit profile
          </DialogTitle>
          <DialogDescription className="sr-only">
            Add new board form
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-3">
          <div>
            <Label htmlFor="username" className="text-[0.75rem] font-bold">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              name="name"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              className={
                state?.message === 'error' && state.errors?.username?.length
                  ? 'border-red-300 dark:border-red-300'
                  : ''
              }
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-[0.75rem] font-bold">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Username"
              name="name"
              defaultValue={user?.email}
              disabled
            />
          </div>
          <div className="border rounded border-red-200 p-3 flex flex-col gap-2 mt-[15px]">
            <h3 className="text-left text-[0.95rem] text-red-300">
              Danger zone
            </h3>
            <div className="flex justify-between items-center">
              <div className="basis-[60%]">
                <h4 className="text-[0.85rem] font-bold">Delete columns</h4>
                <p className="text-gray-300 text-[0.75rem]">
                  Delete every columns of this board including tasks and
                  subtasks.
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="min-w-32 text-[0.75rem]"
              >
                Delete columns
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div className="basis-[60%]">
                <h4 className="text-[0.85rem] font-bold">Delete user</h4>
                <p className="text-gray-300 text-[0.75rem]">
                  This action can&apos;t be reverse.
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="min-w-32 text-[0.75rem]"
              >
                Delete user
              </Button>
            </div>
          </div>
          <div className="w-[80%] ml-auto flex gap-3 mt-[20px]">
            <Button
              variant="secondary"
              size="s"
              type="button"
              onClick={() => setProfile(false)}
              className="min-w-32"
            >
              Discard
            </Button>
            <Submit variant="default" condition={userName === user?.name}>
              Save changes
            </Submit>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Profile
