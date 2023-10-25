import s from './Banner.module.scss'
import { QrCodeFierst } from '../../assets/qrCode/QrCodeFierst.tsx'
import { FC } from "react";
import { CustomButton } from '../CustomButton/CustomButton.tsx'

type BannerProps = {
    onClickOk: ()=>void
}

export const Banner:FC<BannerProps> = ({ onClickOk }) => {
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
                            <CustomButton
                                tabIndex={0}
                                autoFocus
                                width={156}
                                height={52}
                                onClick={onClickOk}
                            >
                                OK
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
    )
}
