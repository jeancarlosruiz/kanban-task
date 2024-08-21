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

interface EditSubtask {
  id: string
  title: string
  isCompleted: boolean
  placeholder?: string
}

function EditSubtasks({
  savedSubtasks,
  state,
}: {
  savedSubtasks: EditSubtask[]
  state: any
}) {
  const [subtasks, setSubtasks] = useState<EditSubtask[]>(savedSubtasks)

  const addNewSubTask = () => {
    const newSubtask = {
      id: uniqueId(),
      title: '',
      isCompleted: false,
    }

    setSubtasks([...subtasks, newSubtask])
  }

  const deleteSubtask = (id: string) => {
    const newSubtasks = subtasks.filter((sub) => sub.id !== id)

    setSubtasks(newSubtasks)
  }

  const onChangeFn = (event: any, id: string) => {
    const subtasksUpdated = subtasks.map((subtask) => {
      if (subtask.id === id) {
        return { ...subtask, title: event.target.value }
      }

      return subtask
    })

    setSubtasks(subtasksUpdated)
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[0.75rem] font-bold">Subtasks</p>
      {subtasks.map(({ id, title, placeholder }) => (
        <Subtask
          key={id}
          id={id}
          value={title}
          placeholder={placeholder}
          onClickFn={() => deleteSubtask(id)}
          onChangeFn={(e) => onChangeFn(e, id)}
          state={state}
        />
      ))}
      <Input type="hidden" value={JSON.stringify(subtasks)} name="subtasks" />
      <Button
        variant="secondary"
        size="s"
        type="button"
        onClick={addNewSubTask}
        className="text-[0.8125rem] w-full mt-[6px]"
      >
        + Add New Subtask
      </Button>
    </div>
  )
}

function Subtask({
  value,
  placeholder,
  state,
  onChangeFn,
  onClickFn,
}: {
  value: string
  id: string
  placeholder?: string
  state: any
  onChangeFn: ChangeEventHandler
  onClickFn: MouseEventHandler
}) {
  const labelId = useId()
  return (
    <div className="flex items-center gap-2.5">
      <Label htmlFor={labelId} className="sr-only">
        input label
      </Label>
      <Input
        id={labelId}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChangeFn(e)
        }}
        className={
          state?.message === 'error' &&
          state.errors?.subtasks?.length &&
          value === ''
            ? 'border-red-300 dark:border-red-300'
            : ''
        }
      />
      <Button
        variant="ghost"
        size="sm"
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
          <title id="delete-icon">Delete this subtask</title>
          <g fill="#828FA3" fillRule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
        <span className="sr-only">Delete this subtask</span>
      </Button>
    </div>
  )
}

export default EditSubtasks
