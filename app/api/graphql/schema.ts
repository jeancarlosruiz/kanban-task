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

type User {
    id: ID!
    createdAt: String!
    username: String!
    email: String!
    boards: [Board]!
    token: String
}

input AuthInput {
    username: String
    email: String!
    password: String!
}

type Query {
    me: User
    boards: Board!
}

type Mutation {
    signin(input: AuthInput!): User
    signup(input: AuthInput!): User
}
`
export default schema
