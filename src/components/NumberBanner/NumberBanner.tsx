import s from './NumberBanner.module.scss'
import {InputPhone} from "../InputPhone/InputPhone.tsx";
import {FC, useRef, useState} from 'react'
import {CustomCheckbox} from "../Checkbox/Checkbox.tsx";
import {Button} from "../Button/Button.tsx";
import axios from "axios";

export const NumberBanner:FC<any> = ({digitRef, agreementRef}) => {

    const [phoneNumber, setPhoneNumber] = useState('+7(___)___-__-__');
    const [isChecked, setChecked] = useState(false)
    const submitRef = useRef<HTMLInputElement| null>(null)
    const [validationResult, setValidationResult] = useState<{valid: boolean} | null>(null);

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
    const detectKeyDown = (e: any) => {
        if (e.key === 'ArrowDown' && agreementRef.current === document.activeElement) {
            submitRef.current?.focus()
        }
        if (e.key === 'ArrowUp') {
            const elem = document.activeElement
            if (submitRef.current === elem) {
                agreementRef.current?.focus()
            } else if(agreementRef.current === elem) {
                digitRef.current?.focus()
            } else if(digitRef.current === elem){
                (elem?.previousElementSibling?.previousElementSibling as HTMLButtonElement)?.focus()
            } else {
                (elem?.previousElementSibling?.previousElementSibling?.previousElementSibling as HTMLButtonElement)?.focus()
            }
        }


    };
    return (
        <div className={s.container} onKeyDown={detectKeyDown}>
            <div className={s.inputNamber}>
                Введите ваш номер<br/>мобильного телефона
            </div>
            <InputPhone validationResult={validationResult} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} digitRef={digitRef}/>
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
                <Button
                    label={'ПОДТВЕРДИТЬ НОМЕР'}
                    width="284px"
                    height="52px"
                    backgroundColor="black"
                    color="#86D3F4"
                    onClick={onSubmit}
                    disabled={phoneNumber.includes('_') || !isChecked}
                    buttonRef={submitRef}
                />
            </div>
        </div>
    )
}