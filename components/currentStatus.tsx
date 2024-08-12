// 'use client'
import {
  Select,
  // SelectContent,
  // SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from '@/components/ui'
// import { useState } from 'react'

function CurrentStatus({ status }: { status: string }) {
  // const [currentStatus, setCurrentStatus] = useState(status)

  return (
    <div>
      <h3 className="font-bold text-[0.75rem] mb-[8px]">Current Status</h3>
      <Label htmlFor="status" className="text-[0.75rem] font-bold sr-only">
        Current status
      </Label>
      <Select name="status" defaultValue={status} disabled>
        <SelectTrigger id="status">
          <SelectValue>{status}</SelectValue>
        </SelectTrigger>
        {/* <SelectContent>
          <SelectItem value="TODO">Todo</SelectItem>
          <SelectItem value="DOING">Doing</SelectItem>
          <SelectItem value="DONE">Done</SelectItem>
        </SelectContent> */}
      </Select>
    </div>
  )
}

export default CurrentStatus
