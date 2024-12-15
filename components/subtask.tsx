'use client'
import { useState } from 'react'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { completeSubtask } from '@/actions/subtasks'

function Subtask({
  id,
  title,
  isCompleted,
}: {
  id: string
  title: string
  isCompleted: boolean
}) {
  const [checked, setChecked] = useState(isCompleted)
  const [loading, setLoading] = useState(false)

  const handleOnChecked = async (newValue: boolean) => {
    setLoading(true)
    await completeSubtask(id, newValue)
    setChecked(newValue)
    setLoading(false)
  }
  return (
    <li className="flex min-h-10 items-center space-x-2 rounded bg-gray-200 px-[12px] py-[12px] hover:bg-purple-200/50 dark:bg-black-700">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(val: boolean) => handleOnChecked(val)}
        disabled={loading}
      />
      <Label htmlFor={id} className="">
        {title}
      </Label>
    </li>
  )
}

export default Subtask
