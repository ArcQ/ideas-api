import { graphql } from 'react-relay';

export default graphql`
  fragment LabFragment on LabNode {
    id
    name
    labmemberSet {
      edges {
        node {
          user {
            username
          }
        }
      }
    }
  }
`;
