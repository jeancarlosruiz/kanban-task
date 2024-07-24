// 'use client'
// import { SignupMutation } from '@/gql/signupMutation'
// import { setToken } from '@/utils/token'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
// import { useMutation } from 'urql'
import { Submit } from './index'
import { Input, Label } from './ui'
import Link from 'next/link'
import { signup } from '@/actions'
// import { signup } from '../utils/auth'

interface User {
  username: string
  email: string
  password: string
}

function SingupForm() {
  // const [SignupResult, signup] = useMutation(SignupMutation)
  // const [state, setState] = useState<User>({
  //   username: '',
  //   email: '',
  //   password: '',
  // })
  // const router = useRouter()

  // const handleSignup = async (e: any) => {
  //   e.preventDefault()
  //   const result = await signup({ input: state })

  //   if (result.data.signup) {
  //     setToken(result.data.signup.token)
  //     router.push('/dashboard')
  //   }
  // }

  return (
    <form
      action={signup}
      // onSubmit={handleSignup}
      className="w-custom flex flex-col gap-5 justify-center items-center bg-white-100 dark:bg-black-600 px-[24px] py-[24px] mx-auto rounded-md"
    >
      <div className="w-full">
        <Label htmlFor="signup-username" className="text-base">
          Username:
        </Label>
        <Input
          // value={state.username}
          // onChange={(v) =>
          //   setState((s) => ({ ...s, username: v.target.value }))
          // }
          id="signup-username"
          className="text-base"
          placeholder="ex: Jean"
          name="username"
        />
      </div>
      <div className="w-full">
        <Label htmlFor="signup-email" className="text-base">
          Email:
        </Label>
        <Input
          // value={state.email}
          // onChange={(v) => setState((s) => ({ ...s, email: v.target.value }))}
          id="signup-email"
          className="text-base"
          placeholder="example@email.com"
          name="email"
        />
      </div>
      <div className="w-full">
        <Label htmlFor="signup-pw" className="text-base">
          Password:
        </Label>
        <Input
          // value={state.password}
          // onChange={(v) =>
          //   setState((s) => ({ ...s, password: v.target.value }))
          // }
          id="signup-pw"
          className="text-base"
          type="password"
          placeholder="******"
          name="password"
        />
      </div>
      <div className="w-full">
        <Label htmlFor="signup-rpw" className="text-base">
          Repeat password:
        </Label>
        <Input
          id="signup-rpw"
          className="text-base"
          type="password"
          placeholder="******"
        />
      </div>

      <Submit label="Sign up" />

      <Link href="/signin" className="text-sm">
        Have an account?
      </Link>
    </form>
  )
}

export default SingupForm
