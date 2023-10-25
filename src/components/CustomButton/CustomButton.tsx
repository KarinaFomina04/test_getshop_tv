import React, {ButtonHTMLAttributes} from 'react';
import s from './CustomButton.module.scss'

type CustomButtonProps = {
    width?: number
    height?: number
    backgroundColor?: string
    color?: string
    border?: string
    buttonRef?: any
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CustomButton: React.FC<CustomButtonProps> = ({
  width,
  height,
  backgroundColor,
  color,
  border,
  buttonRef,
  ...props
}) => {
    const buttonStyles = {
        width,
        height,
        backgroundColor,
        color,
        border,
    };

    return (
        <button ref={buttonRef} style={buttonStyles} {...props} className={`${s.customButton} ${props.className}` }>
            {props.children}
        </button>
    );
};

