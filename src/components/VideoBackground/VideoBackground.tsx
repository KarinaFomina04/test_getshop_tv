import { useEffect, useState } from 'react'
import videoBg from '../../assets/video/videoBg.mp4'
import s from './VideoBackground.module.scss'
import { QrCode } from '../QrCode'

export const VideoBackground = () => {
    const [showQrCode, setShowQrCode] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowQrCode(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={s.videoBackground}>
            <video src={videoBg} autoPlay loop muted />
            <div className={s.content}>
                {showQrCode && <QrCode />}
            </div>
        </div>
    );
};
