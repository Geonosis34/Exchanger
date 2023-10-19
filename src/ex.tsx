import React, { useState, useEffect } from 'react';
import './dropdown.css';
import Dropdown, {  renderDropdown } from './Components/Dropdown';
import CurrencyConverterInput from './Components/CurrencyInput';
import ConversionResult from './Components/Result';
import currencyService, { CurrencyData } from './Components/CurrencyService';

interface ExProps {
  initialCurrency?: string;
}

const ExFirst: React.FC<ExProps> = ({ initialCurrency = 'USD' }) => { 
  const [fromCurrency, setFromCurrency] = useState<string>(initialCurrency);
  const [toCurrency, setToCurrency] = useState<string>('RUB');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<Record<string, CurrencyData>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await currencyService.fetchCurrencies();
        setCurrencies(response.data);
      } catch (error) {
        console.error("Ошибка при получении информации о валютах:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const calculateConversion = async () => {
    try {
      const response = await currencyService.convertCurrency(fromCurrency, toCurrency);
        
      if (response.data && response.data[toCurrency]) {
        const exchangeRate = response.data[toCurrency];
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
  
      {renderDropdown(fromCurrency, (value) => setFromCurrency(value), currencies)}
      {renderDropdown(toCurrency, (value) => setToCurrency(value), currencies)}
  
      <button onClick={calculateConversion}>Рассчитать</button>
  
      {convertedAmount !== null && 
        <ConversionResult amount={convertedAmount} currencyCode={toCurrency} />
      }
    </div>
  );
}

export default ExFirst;