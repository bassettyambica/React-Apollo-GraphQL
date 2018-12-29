import gql from 'graphql-tag';

export const query = gql`
query SongQuery($id : ID!) {
    song(id : $id) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;
