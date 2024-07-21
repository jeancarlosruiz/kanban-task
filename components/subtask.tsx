import { Checkbox, Label } from './ui'

function Subtask({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center rounded space-x-2 h-10 px-[12px] py-[12px] bg-gray-200 hover:bg-purple-200/50 dark:bg-black-700">
      <Checkbox id="1" />
      <Label htmlFor="1">{children}</Label>
    </div>
  )
}

export default Subtask
