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

interface NewSubtask {
  id: string
  title: string
  isCompleted: boolean
  placeholder?: string
}

const initialState = [
  {
    id: uniqueId(),
    title: '',
    placeholder: 'e.g. Make coffee',
    isCompleted: false,
  },
  {
    id: uniqueId(),
    title: '',
    placeholder: 'e.g. Drink coffee & smile',
    isCompleted: true,
  },
]

function NewSubtasks() {
  const [subtasks, setSubtasks] = useState<NewSubtask[]>(initialState)

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

  const onChangeFn = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const subtasksUpdated = subtasks.map((subtask) => {
      if (subtask.id === id) {
        return { ...subtask, title: event.target.value }
      }

      return subtask
    })

    setSubtasks(subtasksUpdated)
  }

  return (
    <div>
      <p className="text-[0.75rem] font-bold">Subtasks</p>

      <div className="max-h-[8.75rem] overflow-y-auto">
        {subtasks.map(({ id, title, placeholder }) => (
          <Subtask
            key={id}
            id={id}
            value={title}
            placeholder={placeholder}
            onClickFn={() => deleteSubtask(id)}
            onChangeFn={onChangeFn(id)}
          />
        ))}
        <Input type="hidden" value={JSON.stringify(subtasks)} />
      </div>
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
  onChangeFn,
  onClickFn,
}: {
  value: string
  id: string
  placeholder?: string
  onChangeFn: ChangeEventHandler
  onClickFn: MouseEventHandler
}) {
  const labelId = useId()
  return (
    <div className="flex items-center gap-[1rem]">
      <Label htmlFor={labelId} className="sr-only">
        input label
      </Label>
      <Input
        id={labelId}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChangeFn}
      />
      <Button variant="ghost" onClick={onClickFn} type="button">
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

export default NewSubtasks
