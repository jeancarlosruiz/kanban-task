import { auth } from '@/auth'
import { Header, SignoutForm } from '@/components/index'
async function Page() {
  const session = await auth()
  return (
    <main>
      <Header />
      <SignoutForm />
    </main>
  )
}

export default Page
