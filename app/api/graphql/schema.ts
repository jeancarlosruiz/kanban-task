const schema = `#graphql
type Subtask {
    id: ID!
    taskId: String!
    title: String!
    isCompleted: Boolean!
}

enum TaskStatus {
    TODO
    DOING
    DONE
}

type Task {
    id: ID!
    columnId: String!
    title: String!
    description: String
    status: TaskStatus
    subtasks: [Subtask]!
}

type Column {
    id: ID!
    boardId: String!
    name: String!
    tasks: [Task]!
}

type Board {
    id: ID!
    userId: String!
    name: String!
    columns: [Column]!
}

enum Role {
    USER
    ADMIN
}

type User {
    id: ID!
    createdAt: String!
    name: String!
    email: String!
    boards: [Board]!
    token: String
    role: Role
}

input AuthInput {
    name: String
    email: String!
    password: String!
}

type Query {
    me: User
    boards: Board!
}

# type Mutation {
# }
`
export default schema
