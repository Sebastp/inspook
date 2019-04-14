import gql from 'graphql-tag'

export const getBookReviews = gql`
  query getBookReviews($bookid: String!, $readerIds: [String]) {
    getBookReviews(bookid: $bookid, readerIds: $readerIds) {
      uid
      review
      displayName
      avatar
      booksCount
    }
  }
`
