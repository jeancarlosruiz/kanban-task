'use client'
import Link from 'next/link'
import React from 'react'

function Error() {
  return (
    <main className="w-full min-h-dvh grid place-items-center">
      <div className="text-center">
        <h2 className="text-[5rem] text-red-300 font-bold">
          Something went wrong...
        </h2>
        <Link
          href="/"
          className="text-[1.5rem] px-[16px] py-[10px] min-w-[3rem] inline-flex items-center gap-3 justify-center whitespace-nowrap rounded-3xl font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300' text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="24"
            height="24"
            fill="currentColor"
            role="img"
            aria-labelledby="arrow-icon"
          >
            <title id="arrow-icon">Go back icon</title>
            <path d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z"></path>
          </svg>
          Go home
        </Link>
      </div>
    </main>
  )
}

export default Error
