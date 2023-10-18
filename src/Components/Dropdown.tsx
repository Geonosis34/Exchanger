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