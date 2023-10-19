import axios from 'axios';

interface CurrencyData {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

interface CurrenciesResponse {
  data: {
    [currencyCode: string]: CurrencyData;
  };
}

interface ConversionResponse {
  data: {
    [currencyCode: string]: number;
  };
}

class CurrencyService {
  private API_KEY = 'fca_live_1ixQs5heSqJV1ByfDpwUGXbdJNd8KnaslxVmnSq6';
  private BASE_URL = 'https://api.freecurrencyapi.com/v1';

  public async fetchCurrencies(): Promise<CurrenciesResponse> {
    return axios.get(`${this.BASE_URL}/currencies`, {
      headers: {
        'apikey': this.API_KEY
      }
    });
  }

  public async convertCurrency(fromCurrency: string, toCurrency: string): Promise<ConversionResponse> {
    return axios.get(`${this.BASE_URL}/latest`, {
      params: {
        from: fromCurrency,
        to: toCurrency
      },
      headers: {
        'apikey': this.API_KEY
      }
    });
  }
}

export default new CurrencyService();

export type {
  CurrencyData,
  CurrenciesResponse,
  ConversionResponse
};