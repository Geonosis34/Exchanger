import React from 'react';

interface SelectProps {
    options: { label: string, value: string }[];
    selectedValue: string;
    onSelectChange: (value: string) => void;
}

const SelectComponent: React.FC<SelectProps> = ({ options, selectedValue, onSelectChange }) => {
    return (
        <select value={selectedValue} onChange={(e) => onSelectChange(e.target.value)}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SelectComponent;