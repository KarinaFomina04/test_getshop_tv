import s from './SuccessBanner.module.scss'
import {ApplicationIsAccepted} from "../ApplicationIsAccepted/ApplicationIsAccepted.tsx";

export const SuccessBanner = () => {
    return (
        <div className={s.successBanner}>
            <ApplicationIsAccepted/>
        </div>
    );
};