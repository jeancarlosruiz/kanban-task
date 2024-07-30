import { signout } from '@/actions/auth'
import { Submit } from '@/components/index'

function SignoutForm() {
  return (
    <form action={signout}>
      <Submit variant="destructive">Sign Out</Submit>
    </form>
  )
}

export default SignoutForm
