import gql from 'graphql-tag'

export const getCollections = gql`
  query getCollections($pageSize: Int, $page: Int) {
    getCollections(pageSize: $pageSize, page: $page) {
      uid
      title
      desc
      cover
      color
      tags
      booksCount
    }
  }
`
