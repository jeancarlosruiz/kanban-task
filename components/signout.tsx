'use client'
import { signout } from '@/actions/auth'
import { DropdownMenuItem } from './ui'

function Signout() {
  return (
    <DropdownMenuItem
      title="signout"
      onClick={() => signout()}
      className="flex items-center justify-between text-red-300"
    >
      Sign out
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-labelledby="sign-out-icon"
      >
        <title id="sign-out-icon">sign out</title>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </DropdownMenuItem>
  )
}

export default Signout
