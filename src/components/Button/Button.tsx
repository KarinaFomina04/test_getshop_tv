import React from 'react';
import './Button.module.scss';

type ButtonProps = {
    label: string;
    width?: string;
    height?: string;
    backgroundColor?: string;
    color?: string;
    onClick?: () => void;
    disabled?: boolean
    buttonRef?: any
}

export const Button: React.FC<ButtonProps> = ({
                                                  label,
                                                  width,
                                                  height,
                                                  backgroundColor,
                                                  color,
    onClick,
    disabled,
                                                  buttonRef
}) => {
    const buttonStyle: React.CSSProperties = {
        width: width || 'auto',
        height: height || 'auto',
        backgroundColor: backgroundColor || 'blue',
        color: color || 'blue',
    };

    return (
        <button ref={buttonRef} disabled={disabled} autoFocus style={buttonStyle} onClick={onClick}>
            {label}
        </button>
    );
};
