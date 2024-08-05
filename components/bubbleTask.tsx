'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'
import { Subtask } from '@/components/index'

function BubbleTask() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-full flex flex-col gap-1 bg-white-100 dark:bg-black-600 rounded-lg px-[16px] py-[23px] shadow-[0px_5px_10px_0px_rgba(54,78,126,0.25)]">
          <h3 className="text-[0.9375rem] font-bold">
            Build UI for onboarding flow
          </h3>
          <p className="text-[0.75rem] text-gray-300 font-bold text-left">
            0 of 3 substasks
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="top-[30%] max-w-[16.5rem] rounded-lg p-[16px] shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)]">
        <DialogHeader className="pl-[8px]">
          <DialogTitle className="uppercase text-left text-[0.75rem] tracking-[.2em] text-gray-300 ">
            Research pricing points of various competitors and trial different
            business models
          </DialogTitle>
          <DialogDescription>
            Board We know what we&apos;re planning to build for version one. Now
            we need to finalise the first pricing model we&apos;ll use. Keep
            iterating the subtasks until we have a coherent proposition.
          </DialogDescription>
        </DialogHeader>

        <div>
          <h3>Subtasks (2 of 3)</h3>
          <div>
            <Subtask
              id="random-1"
              title="Research competitor pricing and business models"
              isCompleted={true}
            />
            {/* <Subtask
              id="random-2"
              title="Outline a business model that works for our solution"
              isCompleted={true}
            /> */}
            {/* <Subtask
              id="random-3"
              title="Surveying and testing"
              isCompleted={true}
            /> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BubbleTask
