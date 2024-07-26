import { SigninProviders, SignupForm } from '@/components/index'
import Link from 'next/link'

function Home() {
  return (
    <main className="flex h-custom-dvh place-items-center">
      <section className="w-custom flex flex-col gap-5 justify-center items-center bg-white-100 dark:bg-black-600 px-[24px] py-[24px] mx-auto rounded-md">
        <SignupForm />

        <div className="w-full relative">
          <hr className="opacity-30" />
          <small className="absolute inline-flex px-[5px] top-[-10.3px] right-[50%] translate-x-[50%] bg-white-100 dark:bg-black-600 rounded-full">
            or
          </small>
        </div>

        <SigninProviders
          googleLabel="Sign up with Google"
          githubLabel="Sign up with Github"
        />

        <Link href="/signin" className="text-sm hover:underline">
          Have an account?
        </Link>
      </section>
    </main>
  )
}

export default Home
