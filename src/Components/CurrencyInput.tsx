import React from 'react';

interface CurrencyConverterInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const CurrencyConverterInput: React.FC<CurrencyConverterInputProps> = ({ value, onChange, className }) => {
  return (
    <input 
      type="number" 
      value={value}
      onChange={(e) => onChange(+e.target.value)} 
      className={className}
    />
  );
}

export default CurrencyConverterInput;