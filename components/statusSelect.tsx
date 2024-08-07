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

function StatusSelect() {
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

    // console.log(statusFromColumns)
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
              status?.find((s) => s.id === statusSelected)?.name ||
              'Select a status'
            }
          />
        </SelectTrigger>
        <SelectContent position="popper" side="top">
          {status?.map(({ id, name }) => (
            <SelectItem key={id} value={JSON.stringify({ id, name })}>
              {name}
            </SelectItem>
          ))}
          {/* <SelectItem value={'asdadasd'}>{'HOla'}</SelectItem>
          <SelectItem value={'asasdewasd'}>{'HOla'}</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  )
}

export default StatusSelect
