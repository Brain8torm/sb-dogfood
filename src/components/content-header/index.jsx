import classNames from 'classnames';
import styles from './content-header.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as LeftArrowIcon } from './images/ic-left-arrow.svg';

export function ContentHeader({ title, children, to, textButton }) {
    return ( 
        <>
            <Link className={classNames(styles.button_back)} to={to || -1}>
                <LeftArrowIcon /> {textButton}
            </Link>
            <h1 className={classNames(styles.title)}>{title}</h1>
            {children}
        </>
     );
}

