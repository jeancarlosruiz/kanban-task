'use server'
import { BubbleTask } from '@/components/index'
import { getTasks } from '@/utils/tasks'
async function Column({ column }: { column: any }) {
  const tasks = await getTasks(column.id)

  // tasks?.forEach((task) => {
  //   console.log(task.subtasks)
  // })

  return (
    <div className="min-w-[17.5rem] pb-[24px] flex flex-col gap-5">
      <h2 className="before:content-[''] before:w-[0.9375rem] before:h-[0.9375rem] before:rounded-full before:bg-[#49C4E5] before:block inline-flex items-center gap-3 uppercase text-left text-[0.75rem] tracking-[.2em] text-gray-300 font-bold mb-[4px]">
        {`${column.name} ${tasks && tasks.length}`}
      </h2>

      {tasks &&
        tasks.map((task: any) => <BubbleTask key={task.id} task={task} />)}
    </div>
  )
}

export default Column
