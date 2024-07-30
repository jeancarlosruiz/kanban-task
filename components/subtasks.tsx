'use client'
import { useState } from 'react'
import { Subtask } from '@/components/index'

interface Subtask {
  id: string
  title: string
  isCompleted: boolean
}

function Subtasks() {
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    { id: 'ramdonId-1', title: 'This is a task 1', isCompleted: false },
    { id: 'ramdonId-2', title: 'This is a task 2', isCompleted: true },
    { id: 'ramdonId-3', title: 'This is a task 3', isCompleted: false },
  ])
  return (
    <div>
      {subtasks.map(({ id, title, isCompleted }) => (
        <Subtask key={id} id={id} title={title} isCompleted={isCompleted} />
      ))}
    </div>
  )
}

export default Subtasks
