'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'
import { CurrentStatus, OptionsTask, Subtask } from '@/components/index'
import { useEffect, useState } from 'react'

function BubbleTask({ task }: { task: any }) {
  const [open, setOpen] = useState(false)
  const [subtaskCompleted, setSubtaskCompleted] = useState(0)

  const [subtasks, setSubtasks] = useState([])

  useEffect(() => {
    if (task.subtasks.length) {
      const completed = task.subtasks.filter(
        (sub: any) => sub.isCompleted === true
      )

      setSubtaskCompleted(completed.length)
      setSubtasks(task.subtasks)
    }
  }, [task])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <div className="w-[17.5rem] flex flex-col gap-1 bg-white-100 dark:bg-black-600 rounded-lg px-[16px] py-[23px] shadow-[0px_5px_10px_0px_rgba(54,78,126,0.25)]">
          <h3 className="text-[0.9375rem] font-bold text-left">{task.title}</h3>
          <p className="text-[0.75rem] text-gray-300 font-bold text-left">
            {task.subtasks.length
              ? `${subtaskCompleted} of ${task.subtasks.length} subtasks`
              : 'No subtasks'}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="w-custom-form px-[24px] pb-[32px] rounded-lg shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)] flex flex-col gap-6">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <DialogTitle className="text-left text-[1.125rem]">
              {task.title}
            </DialogTitle>

            <OptionsTask task={task} />
          </div>
          <DialogDescription className="text-left">
            {task.description}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto flex flex-col gap-6">
          {subtasks.length > 0 && (
            <div>
              <h3 className="font-bold text-[0.75rem] mb-[16px]">
                {`Subtasks (${subtaskCompleted} of ${subtasks.length})`}
              </h3>
              <div className="flex flex-col gap-2">
                {subtasks.map(
                  ({
                    id,
                    title,
                    isCompleted,
                  }: {
                    id: string
                    title: string
                    isCompleted: boolean
                  }) => (
                    <Subtask
                      key={id}
                      id={id}
                      title={title}
                      isCompleted={isCompleted}
                    />
                  )
                )}
              </div>
            </div>
          )}
          <CurrentStatus status={task.status} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BubbleTask
