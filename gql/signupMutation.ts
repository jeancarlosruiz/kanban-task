import { gql } from 'urql'

export const SignupMutation = gql`
  mutation Mutation($input: AuthInput!) {
    signup(input: $input) {
      token
    }
  }
`
