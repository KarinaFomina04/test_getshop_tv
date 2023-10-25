import {FC} from 'react';
import s from './InputPhone.module.scss';
import {CustomButton} from "../CustomButton/CustomButton.tsx";

export const InputPhone: FC<any> = ({validationResult, setValidationResult, phoneNumber, setPhoneNumber, digitRef}) => {

    const handleDigitClick = (digit: string) => {
        setPhoneNumber(phoneNumber.replace('_', digit))
    }

    const handleClear = () => {
        const match = phoneNumber.match(/\d(?=\D*$)/)
        if (match) {
            const lastDigitIndex = phoneNumber.lastIndexOf(match[0]);
            if (lastDigitIndex !== 1) {
                setPhoneNumber(phoneNumber.slice(0, lastDigitIndex) + "_" + phoneNumber.slice(lastDigitIndex + 1));
            }
        }
        setValidationResult(null);
    }

    const detectKeyDown = (e: any) => {
        if ('0123456789'.includes(e.key)) {
            handleDigitClick(e.key)
        }
        if (e.key === 'Backspace') {
            handleClear()
        }
    }

    return (
        <div className={s.inputPhone} onKeyDown={detectKeyDown}>
            <div style={validationResult && !validationResult.valid ? {color: "red"} : {}} className={s.phone}>
                {phoneNumber}
            </div>
            <div className={s.stringManager}>
                и с Вами свяжется наш менеджер для<br/>дальнейшей консультации
            </div>
            <div className={s.buttonContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                    <CustomButton
                        key={digit}
                        width={88}
                        height={52}
                        className={s.button}
                        autoFocus={digit === 5}
                        onClick={() => handleDigitClick(digit.toString())}
                    >
                        {digit}
                    </CustomButton>
                ))}
                <CustomButton
                    className={s.clearButton}
                    onClick={() => handleClear()}
                    height={52}
                    width={186}
                >
                    СТЕРЕТЬ
                </CustomButton>
                <CustomButton
                    key={0}
                    buttonRef={digitRef}
                    className={s.button}
                    onClick={() => handleDigitClick('0')}
                    height={52}
                    width={88}>
                    {0}
                </CustomButton>
            </div>
        </div>
    )
}


