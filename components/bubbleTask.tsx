'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Subtask from '@/components/subtask'
import CurrentStatus from '@/components/currentStatus'
import OptionsTask from '@/components/optionsTask'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Subtasks, Task } from '@/types'

function BubbleTask({ task }: { task: Task }) {
  const [open, setOpen] = useState<boolean>(false)
  const [subtaskCompleted, setSubtaskCompleted] = useState<number>(0)
  const [subtasks, setSubtasks] = useState<Subtasks[]>([])

  useEffect(() => {
    if (task.subtasks && task.subtasks.length) {
      const completed = task.subtasks.filter(
        (sub: any) => sub.isCompleted === true
      )

      setSubtaskCompleted(completed.length)
      setSubtasks(task.subtasks)
    }
  }, [task])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <motion.div
          layout
          layoutId={task.id}
          draggable="true"
          className="flex w-[17.5rem] flex-col gap-1 rounded-lg bg-white-100 px-[16px] py-[23px] shadow-[0px_5px_10px_0px_rgba(54,78,126,0.25)] active:cursor-grabbing dark:bg-black-600"
        >
          <h3 className="text-left text-[0.9375rem] font-bold">{task.title}</h3>
          <p className="text-left text-[0.75rem] font-bold text-gray-300">
            {task.subtasks && task.subtasks.length !== 0
              ? `${subtaskCompleted} of ${task.subtasks.length} subtasks`
              : 'No subtasks'}
          </p>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="w-custom-form flex flex-col gap-6 rounded-lg px-[24px] pb-[32px] shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <DialogTitle
              title="task-title"
              className="text-left text-[1.125rem]"
            >
              {task.title}
            </DialogTitle>

            <OptionsTask task={task} />
          </div>
          <DialogDescription title="task-description" className="text-left">
            {task.description}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[400px] overflow-y-auto">
          <div className="flex flex-col gap-6">
            {subtasks.length > 0 && (
              <div>
                <h3 className="mb-[16px] text-[0.75rem] font-bold">
                  {`Subtasks (${subtaskCompleted} of ${subtasks.length})`}
                </h3>
                <ul className="flex flex-col gap-2">
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
                </ul>
              </div>
            )}
            <CurrentStatus status={task.status} />
            <ScrollBar orientation="vertical" />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default BubbleTask
