import gql from 'graphql-tag'

export const getCollectionByUid = gql`
  query collectionByUid($uid: String!) {
    collectionByUid(uid: $uid) {
      uid
      title
      desc
      cover
      tags
      booksCount
      books
    }
  }
`
