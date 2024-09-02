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
import { type Column } from '@/types'

function BoardColumns({
  columnsArr,
  state,
}: {
  columnsArr: Column[]
  state: any
}) {
  const [columns, setColumns] = useState<Column[]>(columnsArr)

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
      <div>
        {columns.map((col, i) => (
          <Column
            key={col.id}
            id={col.id}
            value={col.name}
            index={i}
            onClickFn={() => deleteColumn(col.id)}
            onChangeFn={onChangeFn(col.id)}
            state={state}
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
  state,
  index,
}: {
  value: string
  id: string
  onChangeFn: ChangeEventHandler
  onClickFn: MouseEventHandler
  state: any
  index: number
}) {
  const labelId = useId()
  return (
    <div className="flex items-center gap-2.5">
      <Label htmlFor={labelId} className="sr-only">
        {`New column ${index + 1}`}
      </Label>
      <Input
        id={labelId}
        type="text"
        value={value}
        onChange={onChangeFn}
        className={
          state?.message === 'error' &&
          state.errors?.columns?.length &&
          value === ''
            ? 'border-red-300 dark:border-red-300'
            : ''
        }
      />
      <Button
        variant="ghost"
        className="min-w-8"
        onClick={onClickFn}
        type="button"
      >
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
