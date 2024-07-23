import Link from 'next/link'
import { Input, Label } from './ui'
import { Submit } from './index'
// import { signIn } from '@/auth'
// import { useFormState } from 'react-dom'
import { login } from '@/actions'
// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'

// const initialState = {
//   message: '',
//   errors: undefined,
//   data: undefined,
//   fieldValues: {
//     email: '',
//     password: '',
//   },
// }

function SigninForm() {
  // const [state, formAction] = useFormState(login, initialState)
  // const router = useRouter()

  // console.log(state)

  // useEffect(() => {
  //   if (state?.message === 'success') {
  //     router.push('/dashboard')
  //   }
  // }, [state, router])

  return (
    <form
      action={login}
      className="w-custom flex flex-col gap-5 justify-center items-center bg-white-100 dark:bg-black-600 px-[24px] py-[24px] mx-auto rounded-md"
    >
      <div className="w-full">
        <Label htmlFor="signin-email" className="text-base">
          Email:
        </Label>
        <Input
          id="signin-email"
          className="text-base"
          placeholder="example@email.com"
          name="email"
        />
      </div>
      <div className="w-full">
        <Label htmlFor="signin-pw" className="text-base">
          Password:
        </Label>
        <Input
          id="signin-pw"
          className="text-base"
          type="password"
          placeholder="******"
          name="password"
        />
      </div>

      <Submit label="Sign in" />

      <Link href="/signup" className="text-sm">
        Create an account
      </Link>
    </form>
  )
}

export default SigninForm
