import styles from './header.module.css';
import classNames from 'classnames';
import { ReactComponent as FavoriteIcon } from './images/ic-favorites.svg';
import { ReactComponent as CartIcon } from './images/ic-cart.svg';
import { ReactComponent as ProfileIcon } from './images/ic-profile.svg';
import { Button } from '../button';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';

export function Header({ children }) {
  const { currentUser, onUserUpdate } = useContext(UserContext);
  const handleEditBtnClick = () => {
    onUserUpdate({ name: 'Андрей Кудряшов', about: 'Веб-разработчик' })
  }

  return (
    <header className={classNames(styles.section)}>
      <div className={classNames(styles.wrapper, 'container')}>
        {children}
        <div className={classNames(styles.icons)}>
          <span className={classNames(styles.icon, 'header_icon__favorite')}><FavoriteIcon /></span>
          <span className={classNames(styles.icon, 'header_icon__cart')}><CartIcon /></span>
          <span className={classNames(styles.icon, 'header_icon__profile', 'dropdown-toggle')}>
            <ProfileIcon />
            <div className={classNames(styles.dropdown, 'dropdown')}>
              <div>{currentUser?.name}</div>
              <div>{currentUser?.about}</div>
              <div>{currentUser?.email}</div>
              <Button action={handleEditBtnClick}>
                Изменить
              </Button>
            </div>
          </span>
        </div>

      </div>
    </header>
  )
}