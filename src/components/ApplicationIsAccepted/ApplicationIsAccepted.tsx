import s from  './ApplicationIsAccepted.module.scss'
export const ApplicationIsAccepted = () => {
    return (
        <div className={s.applicationIsAccepted}>
            <div className={s.stringOne}>ЗАЯВКА<br/>ПРИНЯТА</div>
            <div className={s.stringTwo}>Держите телефон под рукой.<br/>Скоро с Вами свяжется наш менеджер.</div>
        </div>
    );
};

