import gql from 'graphql-tag'

export const getReader = gql`
  query Reader {
    readers {
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
