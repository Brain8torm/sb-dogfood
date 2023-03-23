import styles from './header.module.css';
import classNames from 'classnames';

export function Header({ children, user, onUserUpdate }) {

  const handleEditBtnClick = () => {
    onUserUpdate({ name: 'Андрей Кудряшов', about: 'Веб-разработчик' })
  }

  return (
    <header className={classNames(styles.section)}>
      <div className={classNames(styles.wrapper, 'container')}>
        {children}
        {/*<span>{user?.name}: {user?.about}</span>
        <span>{user?.email}</span>
        <button onClick={handleEditBtnClick}>
          Изменить
  </button>*/}
      </div>
    </header>
  )
}