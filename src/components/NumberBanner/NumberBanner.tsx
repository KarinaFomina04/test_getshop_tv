import s from './NumberBanner.module.scss'
import {InputPhone} from '../InputPhone/InputPhone.tsx'
import {FC, useState} from 'react'
import {CustomCheckbox} from '../Checkbox/Checkbox.tsx'
import {CustomButton} from '../CustomButton/CustomButton.tsx'
import axios from 'axios'

type NumberBannerProps = {
    validationResult: {success: boolean, valid: boolean} | null;
    setValidationResult: (value: {success: boolean, valid: boolean} | null) => void;
    digitRef: any;
    agreementRef: any;
    submitRef: any;
}

export const NumberBanner:FC<NumberBannerProps> = ({
  validationResult,
  setValidationResult,
  digitRef,
  agreementRef,
  submitRef
}) => {

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
        return !!validationResult && (!validationResult.valid || !validationResult.success)
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
                <div className={s.invalidNumber}>
                    НЕВЕРНО ВВЕДЕН НОМЕР
                </div>
                : <div className={s.additionalInvalidNumber} >
                <div className={s.customCheckbox} >
                    <CustomCheckbox isChecked={isChecked} setChecked={setChecked} agreementRef={agreementRef}/>
                </div>
                <div className={s.consent} >
                    Согласие на обработку<br/>персональных данных
                </div>
            </div>}
            <div className={s.customButton} >
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