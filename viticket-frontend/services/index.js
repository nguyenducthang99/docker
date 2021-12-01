import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { API_ENDPOINT } from 'constants/commons.js'

const client = new ApolloClient({
  uri: `${API_ENDPOINT}/graphql`,
  cache: new InMemoryCache()
});

export default client