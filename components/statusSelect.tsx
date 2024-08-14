'use client'
import { getCurrentUser } from '@/actions/auth'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from '@/components/ui'
import { getBoardSelected } from '@/actions/boards'
import { useEffect, useState } from 'react'

interface StatusState {
  id: string
  name: string
}

function StatusSelect({ state }: { state: any }) {
  const [status, setStatus] = useState<StatusState[] | undefined>([])
  const [statusSelected, setStatuSelected] = useState<string>('')

  const getColumns = async () => {
    const { user } = await getCurrentUser()

    if (!user) return
    const userId = user.id as string
    const boardId = user.boardSelected
    const board = await getBoardSelected(userId, boardId)
    const statusFromColumns = board?.columns.map(({ id, name }) => {
      return {
        id,
        name,
      }
    })
    setStatus(statusFromColumns)
  }

  useEffect(() => {
    getColumns()
  }, [])

  return (
    <div>
      <Label htmlFor="status" className="text-[0.75rem] font-bold">
        Status
      </Label>
      <Select
        value={statusSelected}
        name="status"
        onValueChange={(value) => setStatuSelected(value)}
      >
        <SelectTrigger id="status">
          <SelectValue
            placeholder={
              // status?.find((s) => s.id === statusSelected)?.name ||
              // 'Select a status'
              'Select a status'
            }
          />
        </SelectTrigger>
        <SelectContent
          position="popper"
          side="top"
          className={
            state?.message === 'error' && state.errors?.status?.length
              ? 'border-red-300 dark:border-red-300'
              : ''
          }
        >
          {status?.map(({ id, name }) => (
            <SelectItem key={id} value={JSON.stringify({ id, name })}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default StatusSelect
