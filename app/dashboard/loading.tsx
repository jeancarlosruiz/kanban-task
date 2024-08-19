import { Logo } from '@/components/index'
import { Button } from '@/components/ui'
import React from 'react'

function Loading() {
  return (
    <header className=" bg-white-100 dark:bg-black-600">
      <div className="mx-auto px-[16px] sm:px-[24px] py-[8px] flex items-center gap-[1rem]">
        <Logo />

        <div role="status" className="animate-pulse">
          <div className="h-2 bg-gray-300 rounded-full dark:bg-black-700 w-48"></div>
          <span className="sr-only">Loading...</span>
        </div>

        <Button className="h-[2rem] px-[18px] ml-auto mr-[-5px]" disabled>
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF"
              d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </Button>

        <Button
          variant="ghost"
          disabled
          className="px-[10px] rounded-full inline-flex justify-center"
        >
          <svg
            width="5"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="vertical-dots"
          >
            <title id="vertical-dots">Options button</title>
            <g fill="#828FA3" fillRule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" />
              <circle cx="2.308" cy="10" r="2.308" />
              <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
          </svg>
          <span className="sr-only">Open</span>
        </Button>
      </div>
    </header>
  )
}

export default Loading
