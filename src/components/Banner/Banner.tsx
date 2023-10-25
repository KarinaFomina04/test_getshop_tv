import s from './Banner.module.scss'
import { QrCodeFierst } from '../../assets/qrCode/QrCodeFierst.tsx'
import { Button } from '../Button/Button.tsx'
import {FC} from "react";

export const Banner:FC<any> = ({ onClickOk }) => {
    return (
        <div className={s.container}>
            <div className={s.blue}>
                <div className={s.centeredContent}>
                    <div className={s.stringVolvo}>
                        ИСПОЛНИТЕ МЕЧТУ ВАШЕГО
                        <br />
                        МАЛЫША!
                        <br />
                        ПОДАРИТЕ ЕМУ VOLVO!
                    </div>
                    <QrCodeFierst />
                    <div className={s.stringQr}>
                        Сканируйте QR-код
                        <br />
                        или нажмите ОК
                    </div>
                    <div className={s.button}>
                        <Button
                            label="OK"
                            width="156px"
                            height="52px"
                            backgroundColor="black"
                            color="#86D3F4"
                            onClick={onClickOk}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
