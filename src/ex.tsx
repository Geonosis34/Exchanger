import React, { useState, useEffect } from 'react';
import axios from 'axios';
// импортируем хуки из React и библиотеку Axios для запросов HTTP

interface ExProps {
  initialCurrency?: 'USD' | 'EUR' | 'RUB';
}
// объявляем интерфейс ожидаемых свойств объекта

const ExFirst: React.FC<ExProps> = ({ initialCurrency = 'USD' }) => {  // добавляем компонент ExFirst с определенным типом свойств ExProps, по умолчанию ставим на USD
  const [fromCurrency, setFromCurrency] = useState(initialCurrency); // выбранная валюта изначально устанавливается равным свойству компонента, который приходит
  const [toCurrency, setToCurrency] = useState('RUB'); // состояние которое хранит выбранную валюьу, следующая для обновления состояния
  const [amount, setAmount] = useState(1); // сумма для конвертации по умолчанию и для обновления состояния
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null); // результат конвертации либо null (если не выполнен и ошибка) и обновление состояния
  const [rates, setRates] = useState<any>({}); // здесь хранятся курсы от API и обновление состояния
  // каждый вызов useState возвращает текущее состояние и функцию для его обновления
  // прописываем переменные состояний зависимостей
  useEffect(() => { // используем useEffect, который используется при изменении зависимостей
    const fetchRates = async () => { // асинхронная функция с запросом к API
      try {
        const response = await axios.get('https://api.freecurrencyapi.com/v1/latest', {
          params: {
            to: toCurrency,
            from: fromCurrency,
            amount: amount
          },
          headers: {
            'apikey': 'fca_live_1ixQs5heSqJV1ByfDpwUGXbdJNd8KnaslxVmnSq6'
          }
        });
        setRates(response.data.data); // после успешного запроса устанавливаем новое значение
      } catch (error) {
        console.error("Ошибка при получении курсов валют:", error);
      }
    };

    fetchRates();
}, [fromCurrency, toCurrency, amount]); // если одна из переменных изменится, то хук useEffect запустится снова


const handleConversion = () => { // функция при нажатии кнопки конверт
  if (rates.hasOwnProperty(fromCurrency) && rates.hasOwnProperty(toCurrency)) {
    const rate = rates[toCurrency] / rates[fromCurrency];
    setConvertedAmount(amount * rate);
} else {
      console.error("Ошибка: объект rates или одно из его свойств не определено");
  }
};

  return (
    <div>
      <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} /> 
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value as 'USD' | 'EUR' | 'RUB')}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value as 'USD' | 'EUR' | 'RUB')}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
      <button onClick={handleConversion}>Конвертировать</button>
      {convertedAmount !== null && <div>Результат: {convertedAmount.toFixed(2)} {toCurrency}</div>}
    </div>
  ); // 63-если convertedAmount не равно null, то выводится результат. округляем до 2-х знаков
}

export default ExFirst; // експорт по умолчанию