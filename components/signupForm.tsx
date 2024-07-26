import { signup } from '@/actions'
import { Submit } from './index'
import { Input, Label } from './ui'

function SingupForm() {
  return (
    <form
      action={signup}
      className="min-w-full flex flex-col gap-5 justify-center items-center"
    >
      <div className="w-full">
        <Label htmlFor="signup-username" className="text-base">
          Username:
        </Label>
        <Input
          id="signup-username"
          className="text-base"
          placeholder="ex: Jean"
          name="name"
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

      <Submit variant="default">Sign up</Submit>
    </form>
  )
}

export default SingupForm
