import React from 'react';

interface ConversionResultProps {
  amount: number;
  currencyCode: string;
}

const ConversionResult: React.FC<ConversionResultProps> = ({ amount, currencyCode }) => {
  return (
    <div className="dropdown-result">
      Результат: {amount.toFixed(2)} {currencyCode}
    </div>
  );
}

export default ConversionResult;