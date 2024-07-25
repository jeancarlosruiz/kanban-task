import { signup } from '@/actions'
import { Submit } from './index'
import { Input, Label } from './ui'
import Link from 'next/link'

function SingupForm() {
  return (
    <form
      action={signup}
      className="w-custom flex flex-col gap-5 justify-center items-center bg-white-100 dark:bg-black-600 px-[24px] py-[24px] mx-auto rounded-md"
    >
      <div className="w-full">
        <Label htmlFor="signup-username" className="text-base">
          Username:
        </Label>
        <Input
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
          name="repeatPassword"
        />
      </div>

      <Submit variant="default" label="Sign up" />

      <Link href="/signin" className="text-sm">
        Have an account?
      </Link>
    </form>
  )
}

export default SingupForm
