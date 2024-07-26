'use client'
import { useFormStatus } from 'react-dom'
import { Button } from './ui'

function Submit({
  children,
  variant = 'default',
  ...btnProps
}: {
  children: React.ReactNode
  variant: 'default' | 'secondary' | 'ghost' | 'destructive'
}) {
  const { pending } = useFormStatus()
  return (
    <Button
      variant={variant}
      type="submit"
      disabled={pending}
      size="s"
      {...btnProps}
      className="w-full"
    >
      {pending ? <Loading /> : `${children}`}
    </Button>
  )
}

// https://tailwindflex.com/@anonymous/loading-dots
function Loading() {
  return (
    <div className="flex space-x-2 justify-center items-center" role="status">
      <span className="sr-only">Loading...</span>
      <div className="h-1.5 w-1.5 bg-white-100 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-1.5 w-1.5 bg-white-100 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-1.5 w-1.5 bg-white-100 rounded-full animate-bounce"></div>
    </div>
  )
}

export default Submit
