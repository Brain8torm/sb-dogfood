import classNames from 'classnames';
import styles from './button.module.css';

export const Button = ({ type, children, extraClass, htmlType = 'button', action }) => {
    return (
        <button type={htmlType} className={classNames(styles.button, {
            [styles[`button_type_${type}`]]: !!styles[`button_type_${type}`],
            [extraClass]: !!extraClass
        })} onClick={action}>{children}</button>
    )
}