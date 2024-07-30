'use client'
import { useEffect, useState } from 'react'
import { signup } from '@/actions/auth'
import { Submit } from './index'
import { Input, Label } from './ui'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'

const initialState = {
  message: '',
  data: null,
  errors: null,
  fieldValues: {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  },
}

function SingupForm() {
  const [state, formAction] = useFormState(signup, initialState)
  const route = useRouter()
  const [errors, setErrors] = useState<{
    name?: string[]
    email?: string[]
    password?: string[]
    repeatPassword?: string[]
  } | null>(null)

  useEffect(() => {
    if (state.message === 'error' && state.errors) {
      setErrors(state.errors)
    }

    if (state.message === 'success') {
      //? for now
      route.push('/signin')
    }
  }, [state, route])

  return (
    <form
      action={formAction}
      className="min-w-full flex flex-col gap-5 justify-center items-center"
    >
      <div className="w-full">
        <Label
          htmlFor="signup-username"
          className="text-base w-full inline-flex items-center justify-between"
        >
          Username:
          {errors !== null && errors.name && (
            <small className="text-red-300">{errors.name[0]}</small>
          )}
        </Label>
        <Input
          id="signup-username"
          className={`text-base ${
            state.message === 'error' || errors?.name
              ? 'border-red-300 dark:border-red-300'
              : ''
          }`}
          placeholder="ex: Jean"
          name="name"
        />
      </div>
      <div className="w-full">
        <Label
          htmlFor="signup-email"
          className="text-base w-full inline-flex items-center justify-between"
        >
          Email:
          {errors !== null && errors.email && (
            <small className="text-red-300">{errors.email[0]}</small>
          )}
        </Label>
        <Input
          id="signup-email"
          className={`text-base ${
            state.message === 'error' || errors?.email
              ? 'border-red-300 dark:border-red-300'
              : ''
          }`}
          placeholder="example@email.com"
          name="email"
        />
      </div>
      <div className="w-full">
        <Label
          htmlFor="signup-pw"
          className="text-base w-full inline-flex items-center justify-between"
        >
          Password:
          {errors !== null && errors.password && (
            <small className="text-red-300">{errors.password[0]}</small>
          )}
        </Label>
        <Input
          id="signup-pw"
          className={`text-base ${
            state.message === 'error' || errors?.password
              ? 'border-red-300 dark:border-red-300'
              : ''
          }`}
          type="password"
          placeholder="******"
          name="password"
        />
      </div>
      <div className="w-full">
        <Label
          htmlFor="signup-rpw"
          className="text-base w-full inline-flex items-center justify-between"
        >
          Repeat password:
          {errors !== null && errors.repeatPassword && (
            <small className="text-red-300">{errors.repeatPassword[0]}</small>
          )}
        </Label>
        <Input
          id="signup-rpw"
          className={`text-base ${
            state.message === 'error' || errors?.repeatPassword
              ? 'border-red-300 dark:border-red-300'
              : ''
          }`}
          type="password"
          placeholder="******"
          name="repeatPassword"
        />
      </div>

      <Submit variant="default">Sign up</Submit>
    </form>
  )
}

export default SingupForm
