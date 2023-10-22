import {useEffect, useRef, useState} from 'react'
import videoBg from '../../assets/video/videoBg.mp4'
import s from './VideoBackground.module.scss'
import { Banner } from '../Banner'


export const VideoBackground = () => {
    const [showQrCode, setShowQrCode] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)
    const videoRef = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowQrCode(true)
        }, 5000)

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
    return (
        <div onClick={toggleVideo} className={s.videoBackground}>
            <video ref={videoRef} src={videoBg} autoPlay loop muted />
            <div className={s.content}>
                {showQrCode && <Banner />}
            </div>
        </div>
    )
}
