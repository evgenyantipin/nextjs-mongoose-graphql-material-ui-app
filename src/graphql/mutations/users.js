import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation createUser($email: Email!, $username: String) {
    createUser(input: { email: $email, username: $username }) {
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String) {
    deleteUser(id: $id) {
      id
    }
  }
`;
