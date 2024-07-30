'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from '@/components/ui'
import { useState } from 'react'

function StatusSelect() {
  const [status, setStatus] = useState<string | 'TODO' | 'DOING' | 'DONE'>(
    'TODO'
  )
  return (
    <div>
      <Label htmlFor="status" className="text-[0.75rem] font-bold">
        Status
      </Label>
      <Select
        value={status}
        name="status"
        onValueChange={(value) => setStatus(value)}
      >
        <SelectTrigger id="status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="TODO">Todo</SelectItem>
          <SelectItem value="DOING">Doing</SelectItem>
          <SelectItem value="DONE">Done</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default StatusSelect
