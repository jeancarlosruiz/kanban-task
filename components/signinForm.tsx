'use client'
import { Input } from './ui/input'
import { Label } from './ui/label'
import Submit from './submit'
import { login } from '@/actions/auth'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const initialState = {
  message: '',
  data: null,
  errors: null,
  fieldValues: {
    email: '',
    password: '',
  },
}

const SigninForm = () => {
  const searchParams = useSearchParams()
  const [state, formAction] = useFormState(login, initialState)
  const [errors, setErrors] = useState<{
    email?: string[]
    password?: string[]
  } | null>(null)
  const [urlError, setUrlError] = useState(false)

  useEffect(() => {
    if (state.message === 'error' && state.errors) {
      setErrors(state.errors)
    }

    if (state?.error) {
      setErrors(null)
    }
  }, [state])

  useEffect(() => {
    if (searchParams.get('error') === 'OAuthAccountNotLinked') {
      setUrlError(true)
    }
  }, [searchParams])

  return (
    <form
      action={formAction}
      className="flex min-w-full flex-col items-center justify-center gap-5"
    >
      <div className="flex w-full flex-col gap-1.5">
        <Label
          htmlFor="signin-email"
          className="text-base inline-flex w-full items-center justify-between"
        >
          Email:
          {errors !== null && errors.email && (
            <small className="text-red-300">{errors.email[0]}</small>
          )}
        </Label>
        <Input
          id="signin-email"
          placeholder="example@email.com"
          name="email"
          className={`text-base${
            state.message === 'error' || state.error
              ? 'border-red-300 dark:border-red-300'
              : ''
          }`}
        />
      </div>
      <div className="flex w-full flex-col gap-1.5">
        <Label
          htmlFor="signin-pw"
          className="text-base inline-flex w-full items-center justify-between"
        >
          Password:
          {errors !== null && errors.password && (
            <small className="text-red-300">{errors.password[0]}</small>
          )}
        </Label>
        <Input
          id="signin-pw"
          type="password"
          placeholder="******"
          name="password"
          className={`text-base${
            state.message === 'error' || state.error
              ? 'border-red-300 dark:border-red-300'
              : ''
          }`}
        />
      </div>

      {state?.error && (
        <div className="w-full rounded bg-red-300/70 py-1 text-center">
          <span className="text-sm text-white-100">Invalid credentials</span>
        </div>
      )}

      {urlError && (
        <div className="w-full rounded bg-red-300/70 py-1 text-center">
          <span className="text-sm text-white-100">
            Email already in use by different provider
          </span>
        </div>
      )}

      <Submit variant="default">Sign in</Submit>
    </form>
  )
}

export default SigninForm
