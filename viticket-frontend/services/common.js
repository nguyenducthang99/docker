import { ApolloClient, HttpLink, InMemoryCache, from, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { buildClientUri, buildClientHeaders, getApiEndpointUrl } from './envVariables.js';

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
    },
};

const authContext = setContext(async (_, { headers }) => {
    const token = '1635535267268';
    return {
        headers: {
            ...headers,
            authorization: token,
        },
    };
});

const buildAuthLink = () => {
    const authLink = createHttpLink({ uri: getApiEndpointUrl() });
    return from([authContext, authLink]);
};

const buildClientLink = (type) => {
    return new HttpLink({
        uri: buildClientUri(type),
        headers: buildClientHeaders(type),
        useGETForQueries: true,
    });
};

const buildApolloClient = (type) => {
    const clientLink = type === 'auth' ? buildAuthLink() : buildClientLink(type);

    return new ApolloClient({
        link: clientLink,
        cache: new InMemoryCache(),
        defaultOptions: defaultOptions,
    });
};

export const authClient = buildApolloClient('auth');
export const searchSuggestClient = buildApolloClient('searchSuggestion');
export const announcementsClient = buildApolloClient('announcements');
export const defaultClient = buildApolloClient('default');

export const apiRequest = (query, variables = {}) => {
    return defaultClient.query({ query, variables });
};

export const apiMutate = (mutation, variables = {}) => {
    return defaultClient.mutate({ mutation, variables });
};

export const apiAuthRequest = (query, variables = {}) => {
    return authClient.query({ query, variables });
};

export const apiAuthMutate = (mutation, variables = {}) => {
    return authClient.mutate({ mutation, variables });
};

export const searchSuggestApiRequest = (query, variables = {}) => {
    return searchSuggestClient.query({ query, variables });
};
