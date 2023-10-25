import { QrCodeSecond } from '../../assets/qrCode/QrCodeSecond.tsx'
import s from './QrAdditionalInformation.module.scss'

export const QrAdditionalInformation = () => {
    return (
        <div className={s.container}>
            <div className={s.scanQr}>СКАНИPУЙТЕ QR-КОД<br/>ДЛЯ ПОЛУЧЕНИЯ<br/>ДОПОЛНИТЕЛЬНОЙ<br/>ИНФОРМАЦИИ</div>
            <QrCodeSecond/>
        </div>
    )
}

