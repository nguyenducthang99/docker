import { API_ENDPOINT } from 'constants/commons.js'

const ENV = 'DEV';

export const getApiEndpointUrl = () => {
    return `${API_ENDPOINT}/graphql`
};

const getApiKey = () => {
    switch (ENV) {
        case 'DEV':
            return process.env.API_KEY_DEV;
        case 'STG':
            return process.env.API_KEY_STG;
        case 'PROD':
            return process.env.API_KEY_PROD;
        default:
            return process.env.API_ENDPOINT_PROD;
    }
};

export const buildClientUri = (type) => {
    return getApiEndpointUrl();
};

export const buildClientHeaders = (type) => {
    return { 'X-API-KEY': getApiKey() };
};
