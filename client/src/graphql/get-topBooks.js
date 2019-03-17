import gql from 'graphql-tag'

export const getTopBooks = gql`
  query getTopBooks($pageSize: Int, $page: Int) {
    getTopBooks(pageSize: $pageSize, page: $page) {
      bookId
      reviews{
        name
        review
      }
    }
  }
`
