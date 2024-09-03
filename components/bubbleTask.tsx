'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
  ScrollBar,
} from '@/components/ui'
import { CurrentStatus, OptionsTask, Subtask } from '@/components/index'
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
          className="w-[17.5rem] flex flex-col gap-1 bg-white-100 dark:bg-black-600 rounded-lg px-[16px] py-[23px] shadow-[0px_5px_10px_0px_rgba(54,78,126,0.25)] active:cursor-grabbing"
        >
          <h3 className="text-[0.9375rem] font-bold text-left">{task.title}</h3>
          <p className="text-[0.75rem] text-gray-300 font-bold text-left">
            {task.subtasks && task.subtasks.length !== 0
              ? `${subtaskCompleted} of ${task.subtasks.length} subtasks`
              : 'No subtasks'}
          </p>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="w-custom-form px-[24px] pb-[32px] rounded-lg shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)] flex flex-col gap-6">
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
                <h3 className="font-bold text-[0.75rem] mb-[16px]">
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
