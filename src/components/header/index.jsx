import styles from './header.module.css';
import classNames from 'classnames';

export function Header({ children }) {
  return (
    <header className={classNames(styles.section)}>
      <div className={classNames(styles.wrapper, 'container')}>
        {children}
      </div>
    </header>
  )
}