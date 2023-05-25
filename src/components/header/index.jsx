import styles from './header.module.css';
import classNames from 'classnames';
import { ReactComponent as FavoriteIcon } from './images/ic-favorites.svg';
import { ReactComponent as CartIcon } from './images/ic-cart.svg';
import { ReactComponent as ProfileIcon } from './images/ic-profile.svg';
import { ReactComponent as LogoutIcon } from './images/ic-logout.svg';
import { ReactComponent as UserIcon } from './images/ic-user.svg';
import { Button } from '../button';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../storage/user/user-slice';

export function Header({ children }) {
  const currentUser = useSelector(state => state.user.data);
  const favorites = useSelector(state => state.products.favoriteProducts);
  const dispatch = useDispatch();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  console.log('currentUser', currentUser);

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;


  const handleEditBtnClick = () => {
    //onUserUpdate({ name: 'Андрей Кудряшов2', about: 'Веб-разработчик' })
  }

  const handleDropDownToggle = () => {
    if (isDropDownOpen) {
      setIsDropDownOpen(false);
    } else {
      setIsDropDownOpen(true);
    }
  }

  return (
    <header className={classNames(styles.section)}>
      <div className={classNames(styles.wrapper, 'container')}>
        {children}
        <div className={classNames(styles.icons)}>
          <Link to={{ pathname: '/favorite' }} className={classNames(styles.icon_link)}>
            <span className={classNames(styles.icon, 'header_icon__favorite')}><FavoriteIcon /></span>
            {favorites.length !== 0 &&
              <span className={classNames(styles.icon_bubble)}>{favorites.length}</span>
            }
          </Link>
          <span className={classNames(styles.icon, 'header_icon__cart')}><CartIcon /></span>
          <span className={classNames(styles.icon, 'header_icon__profile', 'dropdown-toggle')} onClick={handleDropDownToggle}>
            <ProfileIcon />
            <div className={classNames(styles.dropdown, { [styles.dropdown__open]: isDropDownOpen })}>
              {currentUser && <>
                <div><UserIcon/> {currentUser?.name}</div>
                <div>{currentUser?.about}</div>
                <div>{currentUser?.email}</div>
                <Button action={handleEditBtnClick}>
                  Изменить
                </Button>
                <Link to='/' className={styles.iconsMenuItem} onClick={() => dispatch(logout())}>
                  <LogoutIcon /> Выйти
                </Link>
              </>
              }
              {!currentUser &&
                <Link to='/login' replace state={{ backgroundLocation: location, initialPath: location.pathname }}>Войти</Link>
              }

            </div>
          </span>
        </div>

      </div>
    </header>
  )
}