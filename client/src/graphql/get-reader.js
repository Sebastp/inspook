import gql from 'graphql-tag'

export const getReader = gql`
  query Reader {
    readers {
      uid
      displayName
      avatar
      desc
      books{
        bookId
        review
      }
      official
    }
  }
`
