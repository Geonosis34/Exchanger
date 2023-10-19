import React, { useState } from 'react';

interface DropdownProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
}

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

export default Dropdown;

export const renderDropdown = (
  selectedValue: string, 
  onSelect: (value: string) => void,
  currencies: Record<string, { name: string }>
) => {
  const options = Object.keys(currencies).map(currencyCode => ({
    value: currencyCode,
    label: `${currencies[currencyCode].name} (${currencyCode})`
  }));

  return (
    <Dropdown
      options={options}
      selectedValue={selectedValue}
      onSelect={onSelect}
      className="dropdown"
    />
  );
};