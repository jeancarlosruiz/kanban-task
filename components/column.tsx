import { BubbleTask } from '@/components/index'
function Column({ board }: { board: any }) {
  return (
    <>
      {board.columns.map(
        ({ id, name, tasks }: { id: string; name: string; tasks: any }) => (
          <div
            className="min-w-[17.5rem] pb-[24px] flex flex-col gap-5"
            key={id}
          >
            <h2 className="before:content-[''] before:w-[0.9375rem] before:h-[0.9375rem] before:rounded-full before:bg-[#49C4E5] before:block inline-flex items-center gap-3 uppercase text-left text-[0.75rem] tracking-[.2em] text-gray-300 font-bold mb-[4px]">
              {`${name} ${tasks.length}`}
            </h2>

            {tasks.map((task: any) => (
              <BubbleTask key={task.id} />
            ))}
          </div>
        )
      )}
    </>
  )
}

export default Column
