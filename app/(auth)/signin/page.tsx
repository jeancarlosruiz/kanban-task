import SigninForm from '@/components/signinForm'
import SigninProviders from '@/components/signinProviders'
import Link from 'next/link'

function Home() {
  return (
    <main className="h-custom-dvh flex place-items-center">
      <section className="w-custom-form mx-auto flex flex-col items-center justify-center gap-5 rounded-md bg-white-100 px-[24px] py-[24px] dark:bg-black-600">
        <h2 className="sr-only">Sign in form</h2>
        <SigninForm />

        <div className="relative w-full">
          <hr className="opacity-30" />
          <small className="absolute right-[50%] top-[-10.3px] inline-flex translate-x-[50%] rounded-full bg-white-100 px-[5px] dark:bg-black-600">
            or
          </small>
        </div>
        <SigninProviders
          googleLabel="Sign in with Google"
          githubLabel="Sign in with Github"
        />
        <Link href="/signup" className="text-sm hover:underline">
          Don&apos;t have an account? Sign up
        </Link>
      </section>
    </main>
  )
}

export default Home
