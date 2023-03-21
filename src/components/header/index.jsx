import styles from './header.module.css';
import classNames from 'classnames';

export function Header({ children, user, onUserUpdate }) {
  return (
    <header className={classNames(styles.section)}>
      <div className={classNames(styles.wrapper, 'container')}>
        {children}
        <span>{user?.name}: {user?.about}</span>
        <span>{user?.email}</span>
      </div>
    </header>
  )
}