import { gql } from '@apollo/client';

const ADD_USER = gql`
    mutation AddUser(
        $name: String!,
        $username: String!,
        $email: String!,
        $password: String!,
    ) {
        addUser(
            name: $name,
            username: $username,
            email: $email,
            password: $password,
        ) {
            id
            name
            username
            email
            password
        }
    }
`;

export { ADD_USER };