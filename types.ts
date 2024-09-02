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

export interface Board {
  id: string
  name: string
  createdAt: string
  userId: string
  columns: Column[]
}

export interface BoardNav {
  id: string
  name: string
}

export interface NewColumn {
  name: string
}
export interface Column {
  id: string
  createdAt?: string
  name: string
  tasks?: Task[]
  boardId?: string | null
}

export interface Task {
  id: string
  title: string
  description?: string
  status: string
  columnId: string
  subtasks: Subtasks[] | undefined
}

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
export interface EditSubtask {
  id: string
  title: string
  isCompleted: boolean
  placeholder?: string
}

export interface StatusState {
  id: string
  name: string
}

export interface User {
  id: string
  createdAt: string
  name: string
  role: 'USER' | 'ADMIN'
  image: string | null
  boardSelected: string | null
}
