import SignupForm from '@/components/signupForm'
import SigninProviders from '@/components/signinProviders'
import Link from 'next/link'

function Home() {
  return (
    <main className="h-custom-dvh flex place-items-center">
      <section className="w-custom-form mx-auto flex flex-col items-center justify-center gap-5 rounded-md bg-white-100 px-[24px] py-[24px] dark:bg-black-600">
        <h2 className="sr-only">Sign up form</h2>
        <SignupForm />

        <div className="relative w-full">
          <hr className="opacity-30" />
          <small className="absolute right-[50%] top-[-10.3px] inline-flex translate-x-[50%] rounded-full bg-white-100 px-[5px] dark:bg-black-600">
            or
          </small>
        </div>

        <SigninProviders
          googleLabel="Sign up with Google"
          githubLabel="Sign up with Github"
        />

        <Link href="/signin" className="text-sm hover:underline">
          Have an account? Sign in
        </Link>
      </section>
    </main>
  )
}

export default Home
