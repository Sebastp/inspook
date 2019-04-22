import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// http://http://localhost:8080/graphql
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql' // or 192.168.99.1
})

const apollo = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  credentials: 'include'
})

export default apollo
