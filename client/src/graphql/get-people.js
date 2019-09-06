import gql from 'graphql-tag'

export const getPeople = gql`
  query getPeople($pageSize: Int, $page: Int) {
    getPeople(pageSize: $pageSize, page: $page) {
      uid
      displayName
      desc
      tag
      avatar
      booksCount
    }
  }
`
