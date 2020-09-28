import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query {
    users {
      id
      email
      username
    }
  }
`;

export const USER_QUERY = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`;
