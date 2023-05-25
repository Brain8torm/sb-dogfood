import classNames from 'classnames';
import styles from './modal.module.css';
import { useState } from 'react';
import { createPortal } from 'react-dom';


export function Modal({ children, isOpen, onClose }) {

    const [active, setActive] = useState(false);

    const renderContent = () => {
        if (!isOpen) return null;
        return (
            <div className={classNames('modal', styles.wrapper, { [styles.active]: isOpen })} onMouseDown={onClose}>
                <div className={classNames(styles.content, { [styles.content_active]: isOpen })} onMouseDown={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        );
    }

    return createPortal(renderContent(), document.getElementById('app-modal'));
}
