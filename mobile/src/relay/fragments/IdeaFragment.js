import { graphql } from 'react-relay';

export default graphql`
  fragment IdeaFragment on IdeaNode {
    id
    createdAt
    updatedAt
    lab {
      id
      name
      imageUrl
    }
    desc
    title
    notes
  }
`;
