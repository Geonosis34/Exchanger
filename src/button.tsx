import React from 'react';

interface ButtonProps {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    );
}

export default ButtonComponent;