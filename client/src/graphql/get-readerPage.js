import gql from 'graphql-tag'

export const getReaderPage = gql`
  query getByUid($uid: String!) {
    getByUid(uid: $uid) {
      uid
      displayName
      avatar
      desc
      tag
      books{
        bookId
        review
      }
      official
    }
  }
`
