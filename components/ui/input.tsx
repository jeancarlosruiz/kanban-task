import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full text-black-800 rounded border border-gray-300/25 bg-transparent px-[16px] py-[8px] text-sm ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-regular placeholder:text-gray-300/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-100/25 dark:bg-transparent dark:ring-offset-transparent dark:placeholder:text-gray-300/25 dark:text-white-100',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
