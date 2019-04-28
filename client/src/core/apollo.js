import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities'


// uri: 'http://localhost:8080/graphql',
// uri: 'http://192.168.99.1:8080/graphql',
const httpLink = new HttpLink({
  uri: 'http://192.168.1.3:8080/graphql',
  options: {
    reconnect: true
  }
})

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  httpLink
)

const link = ApolloLink.from([terminatingLink])
const cache = new InMemoryCache()

const apollo = new ApolloClient({
  link: httpLink,
  cache,
  credentials: 'include'
})

export default apollo
