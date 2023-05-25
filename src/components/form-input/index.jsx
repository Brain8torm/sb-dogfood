import classNames from 'classnames';
import styles from './form-input.module.css';
import { forwardRef } from 'react';


export const FormInput = forwardRef(({ typeTag, ...props }, ref) => {
    return (
        typeTag === 'textarea'
            ? <textarea ref={ref} className={classNames(styles.input, styles.textarea)} {...props} />
            : <input ref={ref} className={styles.input} {...props} />
    );
});