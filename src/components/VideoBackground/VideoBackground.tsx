import {useEffect, useRef, useState} from 'react'
import videoBg from '../../assets/video/videoBg.mp4'
import s from './VideoBackground.module.scss'
import { Banner } from '../Banner'
import {NumberBanner} from "../NumberBanner/NumberBanner.tsx";


export const VideoBackground = () => {
    const [showQrCode, setShowQrCode] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const closeRef = useRef<HTMLButtonElement | null>(null)
    const digitRef = useRef<HTMLButtonElement | null>(null)
    const agreementRef = useRef<HTMLInputElement| null>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowQrCode(true)
        }, 5)

        return () => clearTimeout(timer)
    }, [])

    const toggleVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
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
        if (e.key === 'ArrowDown') {
            const elem = document.activeElement
            if (elem?.textContent === '8' || elem?.textContent === '9') {
                (elem?.nextElementSibling?.nextElementSibling as HTMLButtonElement)?.focus()
            } else if(elem?.textContent === '0') {
              agreementRef.current?.focus()
            } else {
                (elem?.nextElementSibling?.nextElementSibling?.nextElementSibling as HTMLButtonElement)?.focus()
            }
        }
        if (e.key === 'Enter' && document.activeElement === agreementRef.current) {
            agreementRef.current?.click()
        }
    };
    return (
        <div className={s.videoBackground} onKeyDown={detectKeyDown}>
            <video ref={videoRef} src={videoBg} autoPlay loop muted />
            <div className={s.numberContent}>
                {!isPlaying && <NumberBanner agreementRef={agreementRef} digitRef={digitRef}/>}
            </div>
            <div className={s.content}>
                {showQrCode && isPlaying && <Banner onClickOk={toggleVideo} />}
            </div>
            <div>
                {!isPlaying && <button ref={closeRef} onClick={toggleVideo} className={s.buttonWithCross}></button>}
            </div>
        </div>
    )
}
