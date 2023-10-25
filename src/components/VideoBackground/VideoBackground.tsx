import {useEffect, useRef, useState} from 'react'
import videoBg from '../../assets/video/videoBg.mp4'
import s from './VideoBackground.module.scss'
import { Banner } from '../Banner'
import {NumberBanner} from "../NumberBanner/NumberBanner.tsx";
import {CustomButton} from "../CustomButton/CustomButton.tsx";
import {QrAdditionalInformation} from "../QrAdditionalInformation/QrAdditionalInformation.tsx";
import {SuccessBanner} from "../SuccessBanner/SuccessBanner.tsx";


export const VideoBackground = () => {
    const [showQrCode, setShowQrCode] = useState(false)
    const [isPlaying, setPlaying] = useState(true)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const closeRef = useRef<HTMLButtonElement | null>(null)
    const digitRef = useRef<HTMLButtonElement | null>(null)
    const agreementRef = useRef<HTMLInputElement| null>(null)
    const submitRef = useRef<HTMLButtonElement| null>(null)
    const [validationResult, setValidationResult] = useState<{valid: boolean, success: boolean} | null>(null);

    const checkForInactivity = () => {
        const expireTime = localStorage.getItem('expireTime')
        if (Number(expireTime) < Date.now()) {
            setPlaying(true)
            toggleVideo()
        }
    }

    const updateExpireTime = () => {
        const expireTime = Date.now() + 10000
        localStorage.setItem('expireTime', expireTime.toString())
    }

    useEffect(() => {
        if (!isPlaying) {
            const interval = setInterval(() => {
                checkForInactivity()
            }, 10000)
            return () => {clearInterval(interval)}
        }
    }, [isPlaying]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowQrCode(true)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (validationResult) {
            if (validationResult.valid) {
                closeRef.current?.focus()
            } else {
                digitRef.current?.focus()
            }
        }
    }, [validationResult]);

    const onClickOk = () => {
        toggleVideo()
    }

    const toggleVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setPlaying(!isPlaying)
        }
    }

    const detectKeyDown = (e: any) => {
        if (e.key === 'ArrowRight') {
            const elem = document.activeElement
            if (elem?.textContent && ['3', '6', '9', '0'].includes(elem?.textContent)) {
                closeRef.current?.focus()
            } else {
                (document.activeElement?.nextElementSibling as HTMLButtonElement)?.focus()
            }
        }
        if (e.key === 'ArrowLeft') {
            const elem = document.activeElement
            if (elem === closeRef.current) {
                digitRef.current?.focus()
            } else {
                (document.activeElement?.previousElementSibling as HTMLButtonElement)?.focus()
            }
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
        if (e.key === 'ArrowDown') {
            const elem = document.activeElement
            if (elem?.textContent === '8' || elem?.textContent === '9') {
                (elem?.nextElementSibling?.nextElementSibling as HTMLButtonElement)?.focus()
            } else if(elem?.textContent === '0') {
              agreementRef.current?.focus()
            } else if(agreementRef.current === elem) {
                submitRef.current?.focus()
            }
            else {
                (elem?.nextElementSibling?.nextElementSibling?.nextElementSibling as HTMLButtonElement)?.focus()
            }
        }
        if (e.key === 'Enter' && document.activeElement === agreementRef.current) {
            agreementRef.current?.click()
        }
    };
    return (
        <div className={s.videoBackground} onKeyDown={(event) => {
            detectKeyDown(event);
            updateExpireTime()
        }} onMouseMove={updateExpireTime}>
            <video ref={videoRef} src={videoBg} autoPlay loop muted />
            {!isPlaying &&
                <div className={s.numberContent}>
                    {validationResult && validationResult.valid ? <SuccessBanner/>
                        :
                    <NumberBanner
                        validationResult={validationResult}
                        setValidationResult={setValidationResult}
                        agreementRef={agreementRef}
                        digitRef={digitRef}
                        submitRef={submitRef}
                        closeRef={closeRef}
                    /> }
                </div>
            }
            <div className={s.content}>
                {showQrCode && isPlaying && <Banner onClickOk={onClickOk} />}
            </div>
            <div>
                {!isPlaying && <QrAdditionalInformation/>}
            </div>
            <div>
                {!isPlaying && <CustomButton backgroundColor={'white'} buttonRef={closeRef} onClick={toggleVideo} className={s.buttonWithCross}/>}
            </div>
        </div>
    )
}
