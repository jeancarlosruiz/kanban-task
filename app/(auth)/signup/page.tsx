import { SignupForm } from '@/components/index'

function Home() {
  return (
    <main className="flex h-custom-dvh place-items-center">
      <section className="min-w-full">
        <SignupForm />
      </section>
    </main>
  )
}

export default Home
