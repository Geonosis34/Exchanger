import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dropdown.css';
// импортируем хуки из React и библиотеку Axios для запросов HTTP и CSS для списка

interface ExProps {
  initialCurrency?: string;
}
// объявляем интерфейс ожидаемых свойств объекта
interface DropdownProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
}
// интерфейс списка валют
const Dropdown: React.FC<DropdownProps> = ({ options, selectedValue, onSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={className ? className : ''}>
      <button onClick={() => setIsOpen(!isOpen)}>{selectedValue}</button> 
      {isOpen && (
        <ul>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
// при клике на выпадающий список открывется и закрывается
const ExFirst: React.FC<ExProps> = ({ initialCurrency = 'USD' }) => { // добавляем компонент ExFirst с определенным типом свойств ExProps, по умолчанию ставим на USD
  const [fromCurrency, setFromCurrency] = useState<string>(initialCurrency); // выбранная валюта изначально устанавливается равным свойству компонента, который приходит
  const [toCurrency, setToCurrency] = useState<string>('RUB'); // состояние которое хранит выбранную валюьу, следующая для обновления состояния
  const [amount, setAmount] = useState(1); // сумма для конвертации по умолчанию и для обновления состояния
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null); // результат конвертации либо null (если не выполнен и ошибка) и обновление состояния
  const [currencies, setCurrencies] = useState<any>({}); // здесь хранятся курсы от API и обновление состояния
  // каждый вызов useState возвращает текущее состояние и функцию для его обновления
  // прописываем переменные состояний зависимостей
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://api.freecurrencyapi.com/v1/currencies', {
          headers: {
            'apikey': 'fca_live_1ixQs5heSqJV1ByfDpwUGXbdJNd8KnaslxVmnSq6'
          }
        });
        setCurrencies(response.data.data);
      } catch (error) {
        console.error("Ошибка при получении информации о валютах:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const calculateConversion = async () => {
    try {
        const response = await axios.get('https://api.freecurrencyapi.com/v1/latest', {
            params: {
                from: fromCurrency,
                to: toCurrency
            },
            headers: {
                'apikey': 'fca_live_1ixQs5heSqJV1ByfDpwUGXbdJNd8KnaslxVmnSq6'
            }
        });
        
        if(response.data && response.data.data && response.data.data[toCurrency]) {
            const exchangeRate = response.data.data[toCurrency];
            setConvertedAmount(amount * exchangeRate);
        }
    } catch (error) {
        console.error("Ошибка при конвертации:", error);
    }
};

  return (
    <div className="currency-converter">
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(+e.target.value)} 
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
        <div className="dropdown-result">
          Результат: {convertedAmount.toFixed(2)} {toCurrency}
        </div>
      }
    </div>
  );
}

export default ExFirst;