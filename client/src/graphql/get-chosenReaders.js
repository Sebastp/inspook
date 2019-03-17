import gql from 'graphql-tag'

export const getChosenReaders = gql`
  query getChosenReaders($uidsArr: [String!], $getBooksCount: Boolean, $howManyBooks: Int) {
    getChosenReaders(uidsArr: $uidsArr, getBooksCount: $getBooksCount, howManyBooks: $howManyBooks) {
      uid
      displayName
      avatar
      booksCount
      books{
        bookId
      }
    }
  }
`
