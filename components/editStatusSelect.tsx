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

function EditStatusSelect({ statusLabel }: { statusLabel?: any }) {
  const [status, setStatus] = useState<StatusState[] | undefined>([])
  const [statusSelected, setStatuSelected] = useState<StatusState | undefined>()

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

    const currentStatusSelected = statusFromColumns?.find(
      (s) => s.name.toLowerCase() === statusLabel.toLowerCase()
    )

    setStatus(statusFromColumns)
    setStatuSelected(currentStatusSelected)
  }

  const handleValueChange = (value: string) => {
    if (!value) return

    try {
      const parseValue = JSON.parse(value)
      setStatuSelected(parseValue)
      console.log({ statusSelected })
    } catch (error) {
      console.error('Error parsing JSON:', error)
    }
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
        value={JSON.stringify(statusSelected)}
        name="status"
        onValueChange={(value) => handleValueChange(value)}
      >
        <SelectTrigger id="status">
          <SelectValue>{statusSelected && statusSelected?.name}</SelectValue>
        </SelectTrigger>
        <SelectContent position="popper" side="top">
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

export default EditStatusSelect
