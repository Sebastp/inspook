import gql from 'graphql-tag'

export const getChosenReaders = gql`
  query getChosenReaders($uidsArr: [String!], $bookId: String, $getBooksCount: Boolean, $howManyBooks: Int) {
    getChosenReaders(uidsArr: $uidsArr, bookId: $bookId, getBooksCount: $getBooksCount, howManyBooks: $howManyBooks) {
      uid
      displayName
      desc
      avatar
      booksCount
      books{
        bookId
      }
    }
  }
`
