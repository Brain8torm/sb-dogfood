import s from "./spinner.module.css";

export function Spinner() {
    return (
        <>
            <div className={s.spinner}>
                <div className={s.inner}>
                    <div className={s.bar}></div>
                    <div className={s.bar}></div>
                    <div className={s.bar}></div>
                    <div className={s.bar}></div>
                    <div className={s.bar}></div>
                    <div className={s.bar}></div>
                    <div className={s.bar}></div>
                    <div className={s.bar}></div>
                    <div className={s.bar}></div>
                    <div className={s.bar}></div>
                    <div className={s.bar}></div>
                    <div className={s.bar}></div>
                </div>
            </div>
        </>
    );
}