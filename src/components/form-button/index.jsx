import classNames from 'classnames';
import styles from './form-button.module.css';

export function FormButton({children, color, ...props}) {
    return (
        <button {...props} className={classNames(styles.btn, styles[color])}>
            {children}
        </button>
    );
}