import { Input, Label } from './ui'
import { Submit } from './index'
import { login } from '@/actions'

function SigninForm() {
  return (
    <form
      action={login}
      className="min-w-full flex flex-col gap-5 justify-center items-center"
    >
      <div className="w-full flex flex-col gap-1.5">
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
      <div className="w-full flex flex-col gap-1.5">
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

      <Submit variant="default" label="Sign in" />
    </form>
  )
}

export default SigninForm
