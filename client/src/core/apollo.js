import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities'
import { LOCAL_SERVER_URL } from '../env'

const {
  BACKEND_PORT=8080,
  LOCAL_SERVER_IP='localhost'
} = process.env


if (process.env.NODE_ENV === 'production') {
  var serverUri = LOCAL_SERVER_URL+'/graphql'
}else {
  var serverUri = 'http://'+LOCAL_SERVER_IP+':'+BACKEND_PORT+'/graphql'
}
// var serverUri = 'http://'+LOCAL_SERVER_IP+':3000/graphql'
// var serverUri = 'https://'+LOCAL_SERVER_IP+'/graphql'

const httpLink = new HttpLink({
  uri: serverUri,
  options: {
    reconnect: true
  }
})
// console.log(httpLink);

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  httpLink
)

// const link = ApolloLink.from([terminatingLink])
const cache = new InMemoryCache()

const apollo = new ApolloClient({
  link: httpLink,
  cache,
  credentials: 'include'
})

export default apollo
