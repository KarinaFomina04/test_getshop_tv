import s from './Banner.module.scss'
import { QrCodeFierst } from '../../assets/qrCode/QrCodeFierst.tsx'
import { Button } from '../Button/Button.tsx'

export const Banner = () => {
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
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
