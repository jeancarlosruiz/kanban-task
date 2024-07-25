import { SigninForm, SigninProviders } from '@/components/index'
import Link from 'next/link'

function Home() {
  return (
    <main className="flex h-custom-dvh place-items-center">
      <section className="w-custom flex flex-col gap-5 justify-center items-center bg-white-100 dark:bg-black-600 px-[24px] py-[24px] mx-auto rounded-md">
        <SigninForm />

        <div className="w-full relative">
          <hr className="opacity-30" />
          <small className="absolute inline-flex px-[5px] top-[-10.3px] right-[50%] translate-x-[50%] bg-black-600 rounded-full">
            or
          </small>
        </div>
        <SigninProviders />
        <Link href="/signup" className="text-sm hover:underline">
          Don&apos;t have an account? sign up
        </Link>
      </section>
    </main>
  )
}

export default Home
