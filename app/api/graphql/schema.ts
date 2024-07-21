const schema = `#graphql
type Subtask {
    id: ID!
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
    title: String!
    description: String
    status: TaskStatus
    subtasks: [Subtask]!
}

type Column {
    id: ID!
    name: String!
    tasks: [Task]!
}

type Board {
    id: ID!
    name: String!
    columns: [Column]!
}

type User {
    id: ID!
    createdAt: String!
    userName: String!
    email: String!
    password: String!
    boards: [Board]!
}

type Query {
    boards: Board!
}
`
export default schema
