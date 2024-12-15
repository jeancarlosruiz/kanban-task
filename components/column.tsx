'use client'
import BubbleTask from '@/components/bubbleTask'
import { type Column as ColumnType } from '@/types'
import { motion } from 'framer-motion'

function Column({ column }: { column: ColumnType }) {
  return (
    <motion.div layout className="flex min-w-[17.5rem] shrink-0 flex-col gap-5">
      <h2 className="mb-[4px] inline-flex items-center gap-3 text-left text-[0.75rem] font-bold uppercase tracking-[.2em] text-gray-300 before:block before:h-[0.9375rem] before:w-[0.9375rem] before:rounded-full before:bg-[#49C4E5] before:content-['']">
        {`${column.name} (${column.tasks && column.tasks.length})`}
      </h2>

      <div
        className={`flex h-full flex-col gap-5 rounded-md bg-gradient-to-r pb-[24px]`}
      >
        {column.tasks &&
          column.tasks.map((task: any) => (
            <BubbleTask key={task.id} task={task} />
          ))}
      </div>
    </motion.div>
  )
}

export default Column
