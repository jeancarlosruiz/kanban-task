import { randomUUID } from 'crypto'
import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const createdAt = () =>
  text('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()

const boolean = (field: string) => integer(field, { mode: 'boolean' })

export const subtasks = sqliteTable('subtasks', {
  id: id(),
  createdAt: createdAt(),
  title: text('title').notNull(),
  isCompleted: boolean('isCompleted').default(false).notNull(),
  taskId: text('taskId'),
})

export const subtasksRelations = relations(subtasks, ({ one }) => ({
  tasks: one(tasks, {
    fields: [subtasks.taskId],
    references: [tasks.id],
  }),
}))

export const tasks = sqliteTable('tasks', {
  id: id(),
  createdAt: createdAt(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status', { enum: ['Todo', 'Doing', 'Done'] })
    .default('Todo')
    .notNull(),
  columnId: text('columnId'),
})

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  subtasks: many(subtasks),
  columns: one(columns, {
    fields: [tasks.columnId],
    references: [columns.id],
  }),
}))

export const columns = sqliteTable('columns', {
  id: id(),
  createdAt: createdAt(),
  name: text('name').notNull(),
  boardId: text('boardId'),
})

export const columnsRelations = relations(columns, ({ one, many }) => ({
  tasks: many(tasks),
  board: one(boards, {
    fields: [columns.boardId],
    references: [boards.id],
  }),
}))

export const boards = sqliteTable('boards', {
  id: id(),
  createdAt: createdAt(),
  name: text('name').notNull(),
  userId: text('userId'),
})

export const boardsRelations = relations(boards, ({ one, many }) => ({
  user: one(users, {
    fields: [boards.userId],
    references: [users.id],
  }),
  columns: many(columns),
}))

export const users = sqliteTable('users', {
  id: id(),
  createdAt: createdAt(),
  username: text('username').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  boards: many(boards),
}))
