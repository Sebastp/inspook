import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql'
})

const apollo = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  credentials: 'include'
})

export default apollo
