import { useRef, useState } from 'react';
import { useElementSize } from '../../hooks';
import styles from './accordion.module.css';
import classNames from 'classnames';

function Accordion({ title, children }) {
    const [selected, setSelected] = useState(false);
    const [contentRef, { width, height }] = useElementSize();

    function toggleAccordionState() {
        setSelected(!selected);
    }

    return (
        <div className={classNames('accordion', styles.item, { [styles.active]: selected })}>
            <button className={classNames(styles.button)} onClick={toggleAccordionState}>
                <p className={classNames(styles.title)}>{title}</p>
            </button>
            <div className={classNames(styles.content)} style={{ height: selected ? height : 0 }}>
                <p ref={contentRef} className={classNames(styles.text)}>{children}</p>
            </div>
        </div>
    );
}

export default Accordion;