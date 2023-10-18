import axios from 'axios';

const API_KEY = 'fca_live_1ixQs5heSqJV1ByfDpwUGXbdJNd8KnaslxVmnSq6';
const BASE_URL = 'https://api.freecurrencyapi.com/v1';

export const fetchCurrencies = async () => {
  return axios.get(`${BASE_URL}/currencies`, {
    headers: {
      'apikey': API_KEY
    }
  });
};

export const convertCurrency = async (fromCurrency: string, toCurrency: string) => {
  return axios.get(`${BASE_URL}/latest`, {
    params: {
      from: fromCurrency,
      to: toCurrency
    },
    headers: {
      'apikey': API_KEY
    }
  });
};