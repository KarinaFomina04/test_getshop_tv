import s from './NumberBanner.module.scss'
import {InputPhone} from '../InputPhone/InputPhone.tsx'
import {FC, useState} from 'react'
import {CustomCheckbox} from '../Checkbox/Checkbox.tsx'
import {CustomButton} from '../CustomButton/CustomButton.tsx'
import axios from 'axios'

export const NumberBanner:FC<any> = ({validationResult, setValidationResult, digitRef, agreementRef, submitRef}) => {

    const [phoneNumber, setPhoneNumber] = useState('+7(___)___-__-__');
    const [isChecked, setChecked] = useState(false)

    const convertPhoneNumberToNumber= (phoneNumberString: string) => {
        const numericString = phoneNumberString.replace(/\D/g, '');
        return parseInt(numericString.substring(1), 10);
    }

    const onSubmit = async () => {
        try {
            const response = await axios.get(
                `http://apilayer.net/api/validate?access_key=${import.meta.env.VITE_REACT_APP_NUMVERIFY_API_KEY}&number=${convertPhoneNumberToNumber(phoneNumber)}&country_code=RU&format=1`
            );
            setValidationResult(response.data);
        } catch (error) {
            console.error('Error validating phone number:', error);
            setValidationResult(null);
        }
    };

    const hasValidationError = () => {
        return validationResult && (!validationResult.valid || !validationResult.success)
    }

    return (
        <div className={s.container}>
            <div className={s.inputNamber}>
                Введите ваш номер<br/>мобильного телефона
            </div>
            <InputPhone
                validationResult={validationResult}
                setValidationResult={setValidationResult}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                digitRef={digitRef}
            />
            {validationResult && !validationResult.valid ?
                <div style={{color:'red',padding: '33px 48px 13px'}}>
                    НЕВЕРНО ВВЕДЕН НОМЕР
                </div>
                : <div style={{display: 'flex', padding: '33px 48px 13px'}}>
                <div style={{padding: '6px 8px'}}>
                    <CustomCheckbox isChecked={isChecked} setChecked={setChecked} agreementRef={agreementRef}/>
                </div>
                <div style={{padding: '10px', color: '#565656', fontSize: 14}}>
                    Согласие на обработку<br/>персональных данных
                </div>
            </div>}
            <div style={{padding: '0 48px'}}>
                <CustomButton
                    width={284}
                    height={52}
                    onClick={onSubmit}
                    disabled={phoneNumber.includes('_') || !isChecked || hasValidationError()}
                    buttonRef={submitRef}
                >
                    ПОДТВЕРДИТЬ НОМЕР
                </CustomButton>
            </div>
        </div>
    )
}