'use client'
import { useFormStatus } from 'react-dom'
import { Button } from './ui'

function Submit({
  label,
  variant = 'default',
  ...btnProps
}: {
  label: string
  variant: 'default' | 'secondary' | 'ghost' | 'destructive'
}) {
  const { pending } = useFormStatus()
  return (
    <Button
      {...btnProps}
      variant={variant}
      type="submit"
      disabled={pending}
      size="s"
      className="w-full"
    >
      {pending ? (
        <div className="flex space-x-2 justify-center items-center">
          <span className="sr-only">Loading...</span>
          <div className="h-1.5 w-1.5 bg-white-100 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-1.5 w-1.5 bg-white-100 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-1.5 w-1.5 bg-white-100 rounded-full animate-bounce"></div>
        </div>
      ) : (
        `${label}`
      )}
    </Button>
  )
}

export default Submit
