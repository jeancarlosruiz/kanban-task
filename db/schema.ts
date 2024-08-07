import { randomUUID } from 'crypto'
import { relations, sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { AdapterAccountType } from 'next-auth/adapters'

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
  taskId: text('taskId').references(() => tasks.id, { onDelete: 'cascade' }),
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
  status: text('status'),
  columnId: text('columnId').references(() => columns.id, {
    onDelete: 'cascade',
  }),
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
  boardId: text('boardId').references(() => boards.id, { onDelete: 'cascade' }),
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
  userId: text('userId').references(() => users.id, { onDelete: 'cascade' }),
})

export const boardsRelations = relations(boards, ({ one, many }) => ({
  user: one(users, {
    fields: [boards.userId],
    references: [users.id],
  }),
  columns: many(columns),
}))

export const users = sqliteTable('user', {
  id: id(),
  createdAt: createdAt(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  boardSelected: text('boardSelected'),
  password: text('password'),
  role: text('role', { enum: ['USER', 'ADMIN'] }).default('USER'),
  image: text('image'),
})

export const usersRelations = relations(users, ({ many }) => ({
  boards: many(boards),
}))

export const accounts = sqliteTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = sqliteTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
})

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const authenticators = sqliteTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: integer('credentialBackedUp', {
      mode: 'boolean',
    }).notNull(),
    transports: text('transports'),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)
