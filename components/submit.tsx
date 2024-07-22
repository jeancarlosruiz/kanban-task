'use client'
import { useFormStatus } from 'react-dom'
import { Button } from './ui'

function Submit({ label, ...btnProps }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <Button
      {...btnProps}
      type="submit"
      disabled={pending}
      size="s"
      className="w-full"
    >
      {label}
    </Button>
  )
}

export default Submit
