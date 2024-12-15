import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ScrollBar, ScrollArea } from '@/components/ui/scroll-area'
import { range } from '@/utils/helpers'
import React from 'react'

function Loading() {
  return (
    <>
      <header className="bg-white-100 dark:bg-black-600">
        <div className="mx-auto flex items-center gap-4 pr-[16px] sm:pr-[24px] md:gap-6">
          <Logo />

          <div role="status" className="animate-pulse">
            <div className="h-2 w-48 rounded-full bg-gray-300 dark:bg-black-700"></div>
            <span className="sr-only">Loading...</span>
          </div>

          <Button
            variant="default"
            className="ml-auto mr-[-17px] h-8 sm:h-12 sm:px-[24px]"
            disabled
          >
            <svg
              width="12"
              height="12"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:hidden"
              role="img"
              aria-labelledby="add-icon"
            >
              <title title="add-icon">Add a new task button</title>
              <path
                fill="#FFF"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
            <span className="hidden sm:inline">+ Add New Task</span>
          </Button>

          <Button
            variant="ghost"
            disabled
            className="mr-[-20px] inline-flex items-center justify-center rounded-full"
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
      <main className="flex overflow-hidden">
        <aside className="h-custom-dvh relative hidden flex-col border-e bg-white-100 pb-[24px] pr-[24px] sm:flex sm:min-w-[16.3125rem] sm:pt-[15px] md:min-w-[18.75rem] dark:border-r-gray-500 dark:bg-black-600">
          <div className="flex-1">
            <div className="ml-[24px] h-2 w-[10rem] rounded bg-gray-300 sm:ml-[32px] dark:bg-black-700"></div>
          </div>
          <div className="flex flex-col gap-2 pl-[24px] sm:pl-[32px]">
            <div className="flex h-[3rem] w-full max-w-[14.6875rem] animate-pulse items-center justify-center gap-[23.67px] rounded-md bg-gray-200 py-[14px] dark:bg-black-700"></div>
            <Button
              variant="ghost"
              className="inline-flex w-full items-center justify-start gap-[0.9375rem] text-[0.9375rem] text-gray-300 hover:bg-transparent dark:hover:bg-transparent"
              disabled
            >
              <svg
                width="18"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="hide-icon"
              >
                <title id="hide-icon">Hide sidebar icon</title>
                <path
                  d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                  fill="#828FA3"
                />
              </svg>
              Hide Sidebar
            </Button>
          </div>
        </aside>
        <ScrollArea className="sm:section-custom-dvh w-full">
          <section className="h-custom-dvh relative mx-auto flex gap-6 px-[16px] pb-[24px] pt-[27px] sm:px-[24px] sm:pt-[24px]">
            <h2 className="sr-only">Loading state</h2>
            {range(4).map((i) => (
              <div
                key={i}
                className="flex min-w-[17.5rem] shrink-0 flex-col gap-5"
              >
                <div className="mb-[4px] flex w-full items-center gap-3">
                  <div className="h-[0.9375rem] w-[0.9375rem] rounded-full bg-white-100 dark:bg-black-600"></div>
                  <div className="h-2 w-[10rem] animate-pulse rounded bg-white-100 dark:bg-black-600"></div>
                </div>
                <div className="flex h-full flex-col gap-5 rounded-md bg-gradient-to-r pb-[24px]">
                  {range(6).map((i) => (
                    <div
                      key={i}
                      className="flex h-[5.625rem] w-[17.5rem] animate-pulse flex-col gap-1 rounded-lg bg-white-100 px-[16px] py-[23px] shadow-[0px_5px_10px_0px_rgba(54,78,126,0.25)] active:cursor-grabbing dark:bg-black-600"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </section>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </main>
    </>
  )
}

export default Loading
