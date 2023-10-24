import s from './NumberBanner.module.scss'
import {InputPhone} from "../InputPhone/InputPhone.tsx";

export  const NumberBanner = () => {
    return (
        <div className={s.container}>
            <div className={s.inputNamber}>
                Введите ваш номер
                <br />
                мобильного телефона
            </div>
            <InputPhone/>
        </div>
    )
}