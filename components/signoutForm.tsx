import { signout } from '@/actions'
import { Submit } from '@/components/index'

function SignoutForm() {
  return (
    <form action={signout}>
      <Submit variant="destructive" label="Sign Out" />
    </form>
  )
}

export default SignoutForm
