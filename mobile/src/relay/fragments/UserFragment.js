import { graphql } from 'react-relay';

export default graphql`
  fragment UserFragment on UserNode {
    id
    username
    firstName
    lastName
    imageUrl
  }
`;
