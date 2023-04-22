import { useState } from 'react';
import styles from "./form.module.css";

export function Form({ handleFormSubmit, title, children }) {
    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            {title &&
                <h2 className={styles.title}>{title}</h2>
            }
            {children}
        </form>
    );
}
