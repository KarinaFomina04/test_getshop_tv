import s from './NumberBanner.module.scss'
import {InputPhone} from "../InputPhone/InputPhone.tsx";
import {FC, useRef, useState} from 'react'
import {CustomCheckbox} from "../Checkbox/Checkbox.tsx";
import {Button} from "../Button/Button.tsx";

export const NumberBanner:FC<any> = ({digitRef, agreementRef}) => {

    const [phoneNumber, setPhoneNumber] = useState('+7(___)___-__-__');
    const [isChecked, setChecked] = useState(false)
    const submitRef = useRef<HTMLInputElement| null>(null)
    const onSubmit = () => {
        console.log('test')
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
                Введите ваш номер
                <br/>
                мобильного телефона
            </div>
            <InputPhone phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} digitRef={digitRef}/>
            <div style={{display: 'flex', padding: '33px 48px 13px'}}>
                <div style={{padding: '6px 8px'}}>
                    <CustomCheckbox isChecked={isChecked} setChecked={setChecked} agreementRef={agreementRef}/>
                </div>
                <div style={{padding: '10px', color: '#565656', fontSize: 14}}>
                    Согласие на обработку<br/>персональных данных
                </div>
            </div>
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