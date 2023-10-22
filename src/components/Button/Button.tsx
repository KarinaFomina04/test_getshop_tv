import React from 'react';
import './Button.module.scss';

type ButtonProps = {
    label: string;
    width?: string;
    height?: string;
    backgroundColor?: string;
    color?: string;
}

export const Button: React.FC<ButtonProps> = ({
                                                  label,
                                                  width,
                                                  height,
                                                  backgroundColor,
                                                  color
}) => {
    const buttonStyle: React.CSSProperties = {
        width: width || 'auto',
        height: height || 'auto',
        backgroundColor: backgroundColor || 'blue',
        color: color || 'blue',
    };

    return (
        <button style={buttonStyle}>
            {label}
        </button>
    );
};
