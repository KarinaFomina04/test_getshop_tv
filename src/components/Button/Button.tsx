import React from 'react';
import './Button.module.scss';

interface ButtonProps {
    label: string;
    width?: string;
    height?: string;
    color?: string;
}

export const Button: React.FC<ButtonProps> = ({ label, width, height, color }) => {
    const buttonStyle: React.CSSProperties = {
        width: width || 'auto',
        height: height || 'auto',
        backgroundColor: color || 'blue',
    };

    return (
        <button style={buttonStyle}>
            {label}
        </button>
    );
};
