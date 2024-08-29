import { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'ADMIN' | 'USER'
  boardSelected: any
}

declare module 'next-auth' {
  interface Session {
    id: string
    user: ExtendedUser
  }
}

export type GQLContext = {
  user?: { id: string; email: string; createdAt: string } | null
}

export interface Board {}

export interface NewColumn {
  name: string
}
export interface Column {
  id: string
  createdAt?: string
  name: string
  task?: Task[]
}

export interface Task {}

export interface NewSubtasks {
  title: string
}
export interface Subtasks {
  id: string
  createdAt: string
  title: string
  isCompleted: boolean
  taskId: string | null
}
