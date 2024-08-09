'use client'
import {
  useState,
  useId,
  ChangeEventHandler,
  MouseEventHandler,
  ChangeEvent,
} from 'react'
import { Button, Input, Label } from './ui'
import { uniqueId } from '@/utils/helpers'

interface NewColumn {
  id: string
  name: string
}

function BoardColumns({ columnsArr }: { columnsArr: any }) {
  const [columns, setColumns] = useState<NewColumn[]>(columnsArr)

  const addNewSubTask = () => {
    const newColumn = {
      id: uniqueId(),
      name: '',
    }

    setColumns([...columns, newColumn])
  }

  const deleteColumn = (id: string) => {
    const newcolumns = columns.filter((sub) => sub.id !== id)

    setColumns(newcolumns)
  }

  const onChangeFn = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const columnsUpdated = columns.map((column) => {
      if (column.id === id) {
        return { ...column, name: event.target.value }
      }

      return column
    })

    setColumns(columnsUpdated)
  }
  return (
    <div>
      <p className="text-[0.75rem] font-bold">Board Columns</p>

      <div className="max-h-[8.75rem] overflow-y-auto">
        {columns.map(({ id, name }) => (
          <Column
            key={id}
            id={id}
            value={name}
            onClickFn={() => deleteColumn(id)}
            onChangeFn={onChangeFn(id)}
          />
        ))}
        <Input type="hidden" value={JSON.stringify(columns)} name="columns" />
      </div>
      <Button
        variant="secondary"
        size="s"
        type="button"
        onClick={addNewSubTask}
        className="text-[0.8125rem] w-full mt-[6px]"
      >
        + Add New Column
      </Button>
    </div>
  )
}

function Column({
  value,
  onChangeFn,
  onClickFn,
}: {
  value: string
  id: string
  onChangeFn: ChangeEventHandler
  onClickFn: MouseEventHandler
}) {
  const labelId = useId()
  return (
    <div className="flex items-center gap-[1rem]">
      <Label htmlFor={labelId} className="sr-only">
        input label
      </Label>
      <Input id={labelId} type="text" value={value} onChange={onChangeFn} />
      <Button variant="ghost" onClick={onClickFn} type="button">
        <svg
          width="15"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="delete-icon"
        >
          <title id="delete-icon">Delete this column</title>
          <g fill="#828FA3" fillRule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
        <span className="sr-only">Delete this column</span>
      </Button>
    </div>
  )
}

export default BoardColumns
