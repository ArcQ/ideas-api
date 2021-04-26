import { graphql } from 'react-relay';

export default graphql`
  mutation UpsertLabMutation($input: IdeaMutationInput!) {
    idea(input: $input) {
      title
      desc
      notes
      lab {
        name
      }
      createdBy {
        username
      }
      errors {
        messages
        field
      }
    }
  }
`;
