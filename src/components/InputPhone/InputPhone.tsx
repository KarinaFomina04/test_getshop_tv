import {useState} from 'react';
import s from './InputPhone.module.scss';

export const InputPhone = () => {
    const [phoneNumber, setPhoneNumber] = useState('+7(___)___-__-__');


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

    }

    const detectKeyDown = (e: any) => {
        if (+e.key) {
            handleDigitClick(e.key)
        }
        if (e.key === 'Backspace') {
            handleClear()
        }
    }

    return (
            <div className={s.inputPhone}>
                <div className={s.phone}>
                    {phoneNumber}
                </div>
                <div>
                    и с Вами свяжется наш менеджер для
                    <br />
                    дальнейшей консультации
                </div>
                <div onKeyDown={detectKeyDown} className={s.buttonContainer}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                        <button
                            key={digit}
                            className={s.button}
                            onClick={() => handleDigitClick(digit.toString())}
                        >
                            {digit}
                        </button>
                    ))}
                    <button
                        className={s.clearButton}
                        onClick={() => handleClear()}
                    >
                        Стереть
                    </button>
                    <button
                        autoFocus
                        key={0}
                        className={s.button}
                        onClick={() => handleDigitClick('0')}
                    >
                        {0}
                    </button>
                </div>
            </div>
    )
}


