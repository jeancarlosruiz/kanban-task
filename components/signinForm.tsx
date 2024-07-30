'use client'
import { Input, Label } from './ui'
import { Submit } from './index'
import { login } from '@/actions/auth'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'

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
  const [state, formAction] = useFormState(login, initialState)
  const [errors, setErrors] = useState<{
    email?: string[]
    password?: string[]
  } | null>(null)

  useEffect(() => {
    if (state.message === 'error' && state.errors) {
      setErrors(state.errors)
    }

    if (state?.error) {
      setErrors(null)
    }
  }, [state])

  return (
    <form
      action={formAction}
      className="min-w-full flex flex-col gap-5 justify-center items-center"
    >
      <div className="w-full flex flex-col gap-1.5">
        <Label
          htmlFor="signin-email"
          className="text-base w-full inline-flex items-center justify-between"
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
          className={`text-base ${
            state.message === 'error' || state.error
              ? 'border-red-300 dark:border-red-300'
              : ''
          }`}
        />
      </div>
      <div className="w-full flex flex-col gap-1.5">
        <Label
          htmlFor="signin-pw"
          className="text-base w-full inline-flex items-center justify-between"
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
          className={`text-base ${
            state.message === 'error' || state.error
              ? 'border-red-300 dark:border-red-300'
              : ''
          }`}
        />
      </div>

      {state?.error && (
        <div className="w-full rounded bg-red-300/70 text-center py-1">
          <span className="text-sm text-white-100">Invalid credentials</span>
        </div>
      )}

      <Submit variant="default">Sign in</Submit>
    </form>
  )
}

export default SigninForm
