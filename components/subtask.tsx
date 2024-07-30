import { Checkbox, Label } from './ui'

function Subtask({
  id,
  title,
  isCompleted,
}: {
  id: string
  title: string
  isCompleted: boolean
}) {
  return (
    <div className="flex items-center rounded space-x-2 h-10 px-[12px] py-[12px] bg-gray-200 hover:bg-purple-200/50 dark:bg-black-700">
      <Checkbox id={id} checked={isCompleted} />
      <Label htmlFor={id}>{title}</Label>
    </div>
  )
}

export default Subtask
