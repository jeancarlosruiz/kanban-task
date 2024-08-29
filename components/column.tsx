'use client'
import { BubbleTask } from '@/components/index'
import { type Column as ColumnType } from '@/types'
import { motion } from 'framer-motion'

function Column({ column }: { column: ColumnType }) {
  return (
    <motion.div layout className="min-w-[17.5rem] flex flex-col gap-5 shrink-0">
      <h2 className="before:content-[''] before:w-[0.9375rem] before:h-[0.9375rem] before:rounded-full before:bg-[#49C4E5] before:block inline-flex items-center gap-3 uppercase text-left text-[0.75rem] tracking-[.2em] text-gray-300 font-bold mb-[4px]">
        {`${column.name} (${column.tasks && column.tasks.length})`}
      </h2>

      <div
        className={`h-full flex flex-col gap-5 pb-[24px] rounded-md bg-gradient-to-r`}
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
