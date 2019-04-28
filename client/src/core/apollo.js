import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


// http://http://localhost:8080/graphql
const httpLink = new HttpLink({
  uri: 'http://192.168.99.1:8080/graphql', // or 192.168.99.1
  credentials: 'same-origin'
})


const apollo = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  credentials: 'include',
  onError: (error) => {
    console.log(error);
  }
})

export default apollo
