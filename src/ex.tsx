import React, { useState, useEffect } from 'react';
import './dropdown.css';
import Dropdown from './Components/Dropdown';
import CurrencyConverterInput from './Components/CurrencyInput';
import ConversionResult from './Components/Result';
import { fetchCurrencies, convertCurrency } from './Components/CurrencyService';

interface ExProps {
  initialCurrency?: string;
}

interface CurrencyDetail {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

interface Currencies {
  [currencyCode: string]: CurrencyDetail;
}

const ExFirst: React.FC<ExProps> = ({ initialCurrency = 'USD' }) => { 
  const [fromCurrency, setFromCurrency] = useState<string>(initialCurrency);
  const [toCurrency, setToCurrency] = useState<string>('RUB');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<Currencies>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCurrencies();
        setCurrencies(response.data.data);
      } catch (error) {
        console.error("Ошибка при получении информации о валютах:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const calculateConversion = async () => {
    try {
      const response = await convertCurrency(fromCurrency, toCurrency);
        
      if (response.data && response.data.data && response.data.data[toCurrency]) {
        const exchangeRate = response.data.data[toCurrency];
        setConvertedAmount(amount * exchangeRate);
      }
    } catch (error) {
      console.error("Ошибка при конвертации:", error);
    }
  };

  return (
    <div className="currency-converter">
      <CurrencyConverterInput 
        value={amount}
        onChange={(value) => setAmount(value)}
        className="dropdown-input"
      />

      <Dropdown
        options={Object.keys(currencies).map(currencyCode => ({
          value: currencyCode,
          label: `${currencies[currencyCode].name} (${currencyCode})`
        }))}
        selectedValue={fromCurrency}
        onSelect={(value) => setFromCurrency(value)}
        className="dropdown"
      />

      <Dropdown
        options={Object.keys(currencies).map(currencyCode => ({
          value: currencyCode,
          label: `${currencies[currencyCode].name} (${currencyCode})`
        }))}
        selectedValue={toCurrency}
        onSelect={(value) => setToCurrency(value)}
        className="dropdown"
      />

      <button onClick={calculateConversion}>Рассчитать</button>

      {convertedAmount !== null && 
        <ConversionResult amount={convertedAmount} currencyCode={toCurrency} />
      }
    </div>
  );
}

export default ExFirst;