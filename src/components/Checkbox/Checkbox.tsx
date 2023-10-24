import s from './Checkbox.module.scss'
import {FC} from "react";
export  const CustomCheckbox:FC<any> = ({isChecked, setChecked, agreementRef}) => {
    return (
        <div className={s.formGroup}>
            <input type="checkbox" id="css" checked={isChecked}
                   onChange={(e) => setChecked(e.target.checked)} />
                <label ref={agreementRef} tabIndex={0} htmlFor="css"></label>
        </div>
    )
}


