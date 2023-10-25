import s from './Checkbox.module.scss'
import {FC} from "react";
type CustomCheckBoxProps = {
    isChecked: boolean;
    setChecked: (value: boolean) => void
    agreementRef: any
}
export const CustomCheckbox:FC<CustomCheckBoxProps> = ({
  isChecked,
  setChecked,
  agreementRef
}) => {
    return (
        <div className={s.formGroup}>
            <input type="checkbox" id="css" checked={isChecked}
                   onChange={(e) => setChecked(e.target.checked)} />
                <label ref={agreementRef} tabIndex={0} htmlFor="css"></label>
        </div>
    )
}


