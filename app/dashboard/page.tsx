import { auth } from '@/auth'
import { SignoutForm } from '@/components/index'
async function Page() {
  const session = await auth()
  return (
    <div>
      {JSON.stringify(session)}
      <SignoutForm />
    </div>
  )
}

export default Page
